"use client";

import { useEffect } from "react";
import { useWebSocketContext } from "@/contexts/WebSocketContext";
import { useNotificationSound } from "@/hooks/useNotificationSound";

interface NotificationData {
  id?: string;
  title?: string;
  message?: string;
  text?: string;
  createdAt?: string;
}

/**
 * Global notification manager that handles real-time notifications
 * across the entire application, regardless of which components are mounted.
 * This ensures notifications are received and sounds are played even when
 * the notification modal is not open.
 */
export function GlobalNotificationManager() {
  const { isConnected, on, off } = useWebSocketContext();
  const { playNotificationSound, initializeAudio } = useNotificationSound();

  useEffect(() => {
    // Initialize audio as soon as the component mounts
    initializeAudio();
  }, [initializeAudio]);

  useEffect(() => {
    if (!isConnected) return;

    const handleNewNotification = (data: NotificationData) => {
      console.log("🔔 Global notification received:", data);
      
      // Play notification sound for all real-time notifications
      playNotificationSound();

      // You can add additional global notification handling here:
      // - Browser notifications (if permission granted)
      // - Toast notifications
      // - Update global notification count
      // - Store in global state
      
      // Example: Browser notification (optional)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(data.title || 'New Notification', {
          body: data.message || data.text || 'You have a new notification',
          icon: '/images/logo.png',
          tag: 'trust-growth-notification'
        });
      }
    };

    // Listen for new notifications globally
    on("notification", handleNewNotification);

    return () => {
      off("notification", handleNewNotification);
    };
  }, [isConnected, on, off, playNotificationSound]);

  // This component doesn't render anything visible
  return null;
}