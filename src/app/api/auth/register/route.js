import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({ email, passwordHash });
  } catch {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 409 }
    );
  }

  return NextResponse.json({ success: true });
}
