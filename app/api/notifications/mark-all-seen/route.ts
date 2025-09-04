import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { invalidateCache } from "@/lib/cache-utils";

// POST /api/notifications/mark-all-seen - mark all notifications as seen
export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.notification.updateMany({
      where: {
        userId: session.user.id,
        isSeen: false,
      },
      data: { isSeen: true },
    });

    // Invalidate cache after marking notifications as seen
    invalidateCache.notifications();
    invalidateCache.user(session.user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking notifications as seen:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
