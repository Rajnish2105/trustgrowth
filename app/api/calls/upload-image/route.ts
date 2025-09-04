import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const filename: string | undefined = body?.filename;
    const contentType: string | undefined = body?.contentType;

    if (!filename || !contentType) {
      return NextResponse.json(
        {
          error: "Invalid request body: filename and contentType are required",
        },
        { status: 400 }
      );
    }

    const region = process.env.AWS_REGION;
    const bucket = process.env.S3_BUCKET_NAME;
    if (!region || !bucket) {
      return NextResponse.json(
        {
          error:
            "Server misconfiguration: missing AWS_REGION or S3_BUCKET_NAME",
        },
        { status: 500 }
      );
    }

    const s3 = new S3Client({ region });

    const key = `${Date.now()}-${filename.replace(/\s+/g, "_")}`;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

    const fileUrl = `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(
      key
    )}`;

    return NextResponse.json({ uploadUrl, fileUrl, key });
  } catch (error) {
    console.error("Error creating S3 upload URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
