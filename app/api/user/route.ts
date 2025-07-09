import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      username: name,
      // add other fields as needed
    },
  });

  // Optionally, do not return the password hash
  return NextResponse.json(
    { user: { id: user.id, email: user.email, username: user.username } },
    { status: 201 }
  );
}
