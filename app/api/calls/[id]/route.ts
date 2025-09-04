import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { invalidateCache } from "@/lib/cache-utils";
import { createNotificationForAllUsers } from "@/app/actions/create-notification";

// GET /api/calls/[id] - Get a specific call
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: callId } = await params;

    const call = await db.calls.findUnique({
      where: { id: callId },
    });

    if (!call) {
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    return NextResponse.json({ call });
  } catch (error) {
    console.error("Error fetching call:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/calls/[id] - Update a call
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: callId } = await params;
    const updateData = await request.json();

    // Validate that the call exists
    const existingCall = await db.calls.findUnique({
      where: { id: callId },
    });

    if (!existingCall) {
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    // Prepare update data (only include fields that are provided)
    const dataToUpdate: any = {};
    if (updateData.symbol !== undefined)
      dataToUpdate.symbol = updateData.symbol;
    if (updateData.entry !== undefined)
      dataToUpdate.entry = parseFloat(updateData.entry);
    if (updateData.stoploss !== undefined)
      dataToUpdate.stoploss = parseFloat(updateData.stoploss);
    if (updateData.minTarget !== undefined)
      dataToUpdate.minTarget = parseInt(updateData.minTarget);
    if (updateData.stock !== undefined) dataToUpdate.stock = updateData.stock;
    if (updateData.action !== undefined)
      dataToUpdate.action = updateData.action;
    if (updateData.description !== undefined)
      dataToUpdate.description = updateData.description;
    if (updateData.exit !== undefined) dataToUpdate.exit = updateData.exit;
    if (updateData.return !== undefined)
      dataToUpdate.return = updateData.return;

    const note =
      typeof updateData.updateNote === "string"
        ? updateData.updateNote.trim()
        : "";

    const updatedCall = await db.calls.update({
      where: { id: callId },
      data: {
        ...dataToUpdate,
        ...(note ? { allUpdates: { push: note } } : {}),
      },
    });

    // Send notification if there's a new update added
    if (note) {
      const notificationText = `🔄 Update for ${existingCall.stock} (${existingCall.symbol}) - ${note}`;
      
      try {
        await createNotificationForAllUsers(notificationText);
        console.log("Notification sent to all users for call update:", callId);
      } catch (notificationError) {
        console.error("Failed to send notification for call update:", notificationError);
        // Don't fail the call update if notification fails
      }
    }

    // Invalidate cache after updating a call
    invalidateCache.calls();

    return NextResponse.json({ call: updatedCall });
  } catch (error) {
    console.error("Error updating call:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/calls/[id] - Delete a call
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: callId } = await params;

    // Validate that the call exists
    const existingCall = await db.calls.findUnique({
      where: { id: callId },
    });

    if (!existingCall) {
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    await db.calls.delete({
      where: { id: callId },
    });

    // Invalidate cache after deleting a call
    invalidateCache.calls();

    return NextResponse.json({ message: "Call deleted successfully" });
  } catch (error) {
    console.error("Error deleting call:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
