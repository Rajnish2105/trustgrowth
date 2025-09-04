import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Utility functions for cache invalidation in Next.js
 */

export const invalidateCache = {
  // Invalidate all calls-related data
  calls: () => {
    revalidatePath("/api/calls");
    revalidatePath("/stockMarket/call");
    revalidatePath("/stockMarket/past_result");
    revalidateTag("calls");
  },

  // Invalidate all notifications-related data
  notifications: () => {
    revalidatePath("/api/notifications");
    revalidateTag("notifications");
  },

  // Invalidate user-specific data
  user: (userId: string) => {
    revalidatePath(`/api/notifications`);
    revalidatePath(`/${userId}`);
    revalidateTag(`user-${userId}`);
  },

  // Invalidate all data
  all: () => {
    revalidatePath("/api/calls");
    revalidatePath("/api/notifications");
    revalidatePath("/stockMarket/call");
    revalidatePath("/stockMarket/past_result");
    revalidateTag("calls");
    revalidateTag("notifications");
  },
};

/**
 * Add cache tags to API responses for better cache management
 */
export const addCacheTags = (response: Response, tags: string[]) => {
  tags.forEach((tag) => {
    response.headers.set("x-cache-tag", tag);
  });
  return response;
};

/**
 * Create a response with proper cache headers
 */
export const createNoCacheResponse = (data: any, status: number = 200) => {
  const response = new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  return response;
};
