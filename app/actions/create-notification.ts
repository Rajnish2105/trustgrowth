"use server";

import { db } from "@/lib/db";
import { invalidateCache } from "@/lib/cache-utils";

export async function createNotification(userId: string, text: string) {
  try {
    const notification = await db.notification.create({
      data: {
        userId,
        text,
      },
    });

    // Invalidate cache after creating a notification
    invalidateCache.notifications();
    invalidateCache.user(userId);

    return { success: true, notification };
  } catch (error) {
    console.error("Error creating notification:", error);
    return { success: false, error: "Failed to create notification" };
  }
}

export async function createNotificationForAllUsers(text: string) {
  try {
    // Get all users
    const users = await db.user.findMany({
      select: { id: true },
    });

    // Create notifications for all users
    const notifications = await Promise.all(
      users.map((user) =>
        db.notification.create({
          data: {
            userId: user.id,
            text,
          },
        })
      )
    );

    // Invalidate cache for all users
    invalidateCache.notifications();
    users.forEach((user) => invalidateCache.user(user.id));

    // Broadcast notification via WebSocket if available
    try {
      const notificationData = {
        text,
        createdAt: new Date().toISOString(),
        title: "New Call Notification",
      };

      // Use fetch to send notification to WebSocket server via HTTP endpoint
      // We'll create a simple HTTP bridge to WebSocket
      try {
        // Try to broadcast via WebSocket server's HTTP endpoint if it exists
        const broadcastUrl = process.env.WEBSOCKET_BROADCAST_URL || "http://localhost:4000/broadcast";
        await fetch(broadcastUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "notification",
            data: notificationData,
          }),
        }).catch(() => {
          // Silently fail if WebSocket server is not running
          console.log("WebSocket server not available for broadcasting");
        });
      } catch (broadcastError) {
        console.log("WebSocket broadcast skipped:", broadcastError);
        // This is not critical - notifications still work without real-time updates
      }
    } catch (wsError) {
      console.log("WebSocket broadcast skipped:", wsError);
      // This is not critical - notifications still work without real-time updates
    }

    return { success: true, notifications };
  } catch (error) {
    console.error("Error creating notifications for all users:", error);
    return { success: false, error: "Failed to create notifications" };
  }
}
