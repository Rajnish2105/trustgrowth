# Notification Sound System

This document explains how the notification sound system works in the Trust Growth application.

## Overview

The notification sound system plays an audio file (`notification.wav`) whenever a new notification is received. This provides immediate audio feedback to users when they receive real-time notifications.

## Components

### 1. Audio Hook (`hooks/useNotificationSound.ts`)

A custom React hook that manages audio playback:

- **Initialization**: Creates and configures the audio element
- **Playback**: Handles playing the notification sound with error handling
- **Browser Compatibility**: Includes fallbacks for different browser behaviors

### 2. Safe WebSocket Hook (`hooks/useWebSocketSafe.ts`)

A safe wrapper around WebSocket context that handles cases where the context is not available:

- **Graceful Degradation**: Works with or without WebSocket provider
- **Dynamic Import**: Safely imports WebSocket context when available
- **Fallback Behavior**: Continues working even when WebSocket is not available

### 3. UserDiv Component (`components/auth-modal/user-div.tsx`)

The main component that integrates notification sound:

- **Real-time Notifications**: Listens for WebSocket notifications and plays sound (when available)
- **Initial Load**: Plays sound when new notifications are loaded from API
- **Test Button**: Temporary button to test the sound (remove in production)

### 4. Cache Management (`lib/cache-utils.ts`)

Utility functions for managing Next.js cache invalidation:

- **Cache Invalidation**: Automatically invalidates cache when data changes
- **Route Revalidation**: Ensures fresh data is served from API routes
- **Tag-based Invalidation**: Uses cache tags for granular cache control

## How It Works

### 1. Audio Initialization

```typescript
// Audio is initialized when the UserDiv component mounts
useEffect(() => {
  initializeAudio();
}, [initializeAudio]);
```

### 2. Safe WebSocket Integration

```typescript
// Safely use WebSocket context if available
const { isAvailable, on, off } = useWebSocketSafe();

useEffect(() => {
  if (!isAvailable) return; // Skip if WebSocket not available

  const handleNewNotification = (data: any) => {
    setNotifications((prev) => [newNotification, ...prev]);
    playNotificationSound();
  };

  on("notification", handleNewNotification);
}, [isAvailable, on, off, playNotificationSound]);
```

### 3. Initial Load Notifications

```typescript
// Check for new notifications when loaded from API
useEffect(() => {
  if (
    notifications.length > 0 &&
    unreadCount > previousUnreadCountRef.current
  ) {
    playNotificationSound();
  }
  previousUnreadCountRef.current = unreadCount;
}, [unreadCount, notifications.length, playNotificationSound]);
```

### 4. Cache Invalidation

```typescript
// Cache is automatically invalidated when data changes
export const invalidateCache = {
  calls: () => {
    revalidatePath("/api/calls");
    revalidatePath("/stockMarket/call");
    revalidatePath("/stockMarket/past_result");
    revalidateTag("calls");
  },
  notifications: () => {
    revalidatePath("/api/notifications");
    revalidateTag("notifications");
  },
};
```

## Audio File

- **Location**: `public/notification.wav`
- **Format**: WAV file (229KB)
- **Volume**: Set to 50% by default
- **Preload**: Auto-preloaded for instant playback

## Browser Compatibility

The system includes several fallbacks for browser compatibility:

1. **Audio Ready State Check**: Waits for audio to be ready before playing
2. **Error Handling**: Catches and logs audio loading/playback errors
3. **Fallback Playback**: Attempts non-async playback if async fails
4. **SSR Safety**: Only initializes audio on client-side
5. **WebSocket Safety**: Works with or without WebSocket context

## Cache Management

### Next.js Cache Strategy

The application uses a comprehensive cache management strategy:

1. **API Routes**: No-cache headers prevent caching of dynamic data
2. **Server Components**: Force dynamic rendering for real-time data
3. **Cache Invalidation**: Automatic invalidation when data changes
4. **Route Revalidation**: Fresh data served after cache invalidation

### Cache Invalidation Points

Cache is automatically invalidated when:

- **New calls are created**: Invalidates calls-related routes
- **Calls are updated**: Invalidates calls-related routes
- **Calls are deleted**: Invalidates calls-related routes
- **Notifications are created**: Invalidates notification routes
- **Notifications are marked as read**: Invalidates user-specific data

### Cache Headers

API routes include comprehensive no-cache headers:

```typescript
response.headers.set(
  "Cache-Control",
  "no-store, no-cache, must-revalidate, proxy-revalidate"
);
response.headers.set("Pragma", "no-cache");
response.headers.set("Expires", "0");
```

## WebSocket Integration

### With WebSocket Provider

- Real-time notifications trigger sound immediately
- WebSocket events are handled automatically
- Full real-time functionality available

### Without WebSocket Provider

- Notifications still work via API calls
- Sound plays when notifications are loaded
- Graceful degradation without errors

## Testing

### Manual Test

Click the volume icon (🔊) next to the notification bell to test the sound manually.

### Automatic Test

The sound will play automatically when:

- New notifications arrive via WebSocket (if available)
- Unread notification count increases after API fetch
- Real-time notifications are received

## Configuration

### Volume Control

```typescript
audioRef.current.volume = 0.5; // Adjust this value (0.0 to 1.0)
```

### Audio File Path

```typescript
audioRef.current = new Audio("/notification.wav"); // Change path here
```

## Troubleshooting

### Common Issues

1. **No Sound**: Check browser autoplay policies and user interaction requirements
2. **Audio Not Loading**: Verify the file path and network connectivity
3. **Multiple Sounds**: Ensure audio is reset to beginning before each play
4. **WebSocket Errors**: System will work without WebSocket, check console for availability messages
5. **Stale Data**: Check cache invalidation is working properly

### Debug Logs

Check browser console for error messages:

- "Audio loading error"
- "Failed to initialize audio"
- "Failed to play notification sound"
- "WebSocket context not available, notifications will work without real-time updates"

### Cache Debugging

To debug cache issues:

1. Check network tab for cache headers
2. Verify cache invalidation is triggered
3. Monitor server-side rendering behavior
4. Check for stale data in API responses

## Future Enhancements

1. **User Preferences**: Allow users to enable/disable sound notifications
2. **Sound Selection**: Multiple notification sounds to choose from
3. **Volume Control**: User-adjustable volume settings
4. **Mobile Optimization**: Optimize for mobile device audio policies
5. **WebSocket Provider**: Add WebSocket provider to main layout for full real-time functionality
6. **Advanced Caching**: Implement more sophisticated cache strategies
7. **Cache Analytics**: Monitor cache hit/miss rates for optimization
