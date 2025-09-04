import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { invalidateCache } from "@/lib/cache-utils";
import { createNotificationForAllUsers } from "@/app/actions/create-notification";

type ActionType = "BUY" | "SELL" | "WATCH" | "HOLD";

// GET /api/calls - Get all calls
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      // Still enforce auth, but don't throw 500s
      return NextResponse.json({ calls: [] }, { status: 200 });
    }

    const calls = await db.calls.findMany({
      orderBy: { createdAt: "desc" },
    });

    const response = NextResponse.json({ calls: calls ?? [] });

    // Prevent caching for calls data
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Error fetching calls:", error);
    // If anything goes wrong (e.g., table amissing during fresh setup), return empty list
    return NextResponse.json({ calls: [] }, { status: 200 });
  }
}

// POST /api/calls - Create a new call
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const symbol = formData.get("symbol") as string;
    const entry = formData.get("entry") as string;
    const stoploss = formData.get("stoploss") as string;
    const minTarget = formData.get("minTarget") as string;
    const stock = formData.get("stock") as string;
    const action = formData.get("action") as ActionType;
    const description = (formData.get("description") as string) || "";
    const image = formData.get("image") as File | null;

    if (
      !symbol ||
      !entry ||
      !stoploss ||
      !minTarget ||
      !stock ||
      !action ||
      !description ||
      !image
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload image to S3
    const region = process.env.AWS_REGION as string | undefined;
    const bucket = process.env.S3_BUCKET_NAME as string | undefined;
    if (!region || !bucket) {
      return NextResponse.json(
        { error: "Server misconfigured for S3" },
        { status: 500 }
      );
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const safeName = image.name.replace(/\s+/g, "_");
    const key = `${Date.now()}-${safeName}`;

    const s3 = new (await import("@aws-sdk/client-s3")).S3Client({ region });
    const { PutObjectCommand } = await import("@aws-sdk/client-s3");
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: image.type || "application/octet-stream",
      })
    );

    const imageUrl = `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(
      key
    )}`;

    const numericEntry = parseFloat(entry);
    const numericStoploss = parseFloat(stoploss);
    const numericMinTarget = parseInt(minTarget);

    const initialUpdate =
      action === "BUY"
        ? `${stock} has been bought at ${numericEntry}`
        : action === "SELL"
        ? `${stock} has been sold at ${numericEntry}`
        : `${stock} call created: action ${action} at ${numericEntry}`;

    const call = await db.calls.create({
      data: {
        symbol,
        entry: numericEntry,
        stoploss: numericStoploss,
        minTarget: numericMinTarget,
        stock,
        action: action,
        description,
        imageUrl,
        allUpdates: [initialUpdate],
      },
    });

    // Create notification for all users with the latest update
    const latestUpdate = initialUpdate;
    const notificationText = `📈 New ${action} call for ${stock} (${symbol}) - ${latestUpdate}`;
    
    try {
      await createNotificationForAllUsers(notificationText);
      console.log("Notification sent to all users for new call:", call.id);
    } catch (notificationError) {
      console.error("Failed to send notification for new call:", notificationError);
      // Don't fail the call creation if notification fails
    }

    invalidateCache.calls();
    return NextResponse.json({ call }, { status: 201 });
  } catch (error) {
    console.error("Error creating call:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
