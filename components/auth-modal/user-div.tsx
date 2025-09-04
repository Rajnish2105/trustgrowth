"use client";

import Link from "next/link";
import { Bell, X, Volume2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNotificationSound } from "@/hooks/useNotificationSound";
import { useWebSocketContext } from "@/contexts/WebSocketContext";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export default function UserDiv({
  username,
  email,
  plan,
  svgCode,
}: {
  username: string;
  email: string;
  plan: string;
  svgCode: string;
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const previousUnreadCountRef = useRef(0);
  const { playNotificationSound } = useNotificationSound();
  const { isConnected, on, off } = useWebSocketContext();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Listen for real-time notifications to update the UI (sound is handled globally)
  useEffect(() => {
    if (!isConnected) return;

    const handleNewNotification = (data: any) => {
      // Add new notification to the local list for UI updates
      const newNotification: Notification = {
        id: data.id || Date.now().toString(),
        title: data.title || "New Notification",
        message: data.message || data.text || "You have a new notification",
        time: data.createdAt || new Date().toISOString(),
        isRead: false,
      };

      setNotifications((prev) => [newNotification, ...prev]);
      
      // Note: Sound is now handled globally by GlobalNotificationManager
      // No need to play sound here to avoid duplicate sounds
    };

    // Listen for new notifications
    on("notification", handleNewNotification);

    return () => {
      off("notification", handleNewNotification);
    };
  }, [isConnected, on, off]);

  // Removed: Sound playing for initial load - only real-time notifications should play sounds
  // The sound is now handled globally by GlobalNotificationManager for real-time notifications only

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/notifications");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mark all notifications as read
  const handleMarkAllRead = async () => {
    try {
      const response = await fetch("/api/notifications/mark-all-seen", {
        method: "POST",
      });
      if (response.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      }
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      fetchNotifications();
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-4">
        <button
          onClick={handleBellClick}
          className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute top-full right-4 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Loading notifications...
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b border-gray-50 hover:bg-gray-50 ${
                      !notification.isRead ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.time).toLocaleString()}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No notifications
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    handleMarkAllRead();
                    setShowNotifications(false);
                  }}
                  className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="text-right">
            <h2 className="text-sm font-medium text-gray-900">{username}</h2>
            <p className="text-xs text-gray-500">{email}</p>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
              {plan}
            </p>
          </div>

          <Link href={`/${username}`}>
            <span
              className="rounded-full overflow-hidden w-10 h-10 hover:w-11 hover:h-11 transition-all duration-300 ease-in-out cursor-pointer border-2 border-gray-200 hover:border-blue-400"
              style={{
                display: "inline-block",
                boxShadow: `
                  0 2px 8px rgba(0, 0, 0, 0.1),
                  0 0 0 0 rgba(59, 130, 246, 0.4)
                `,
              }}
              dangerouslySetInnerHTML={{ __html: svgCode }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
