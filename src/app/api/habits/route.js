import { db } from "@/db";
import { habits } from "@/db/schema";
import { getUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { name, icon, color } = await req.json();

  if (!name || !icon || !color) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const [habit] = await db
    .insert(habits)
    .values({
      userId: user.userId,
      name,
      icon,
      color,
    })
    .returning();

  return NextResponse.json(habit);
}
