import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

/* Validation regex */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export async function POST(req) {
  const { email, password } = await req.json();

  /* Required fields */
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  /* Email validation */
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  /* Strong password validation */
  if (!strongPasswordRegex.test(password)) {
    return NextResponse.json(
      {
        error:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
      },
      { status: 400 }
    );
  }

  /* Hash password */
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({ email, passwordHash });
  } catch (err) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 409 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
