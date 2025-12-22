import { db } from "@/db";
import { habitLogs, habits } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getUser } from "@/lib/auth";

export async function POST(req, { params }) {
  const user = await getUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const habitId = Number(id);

  if (Number.isNaN(habitId)) {
    return Response.json({ error: "Invalid habit id" }, { status: 400 });
  }

  const { date } = await req.json();
  if (!date) {
    return Response.json({ error: "Date required" }, { status: 400 });
  }

  // Normalize dates (UTC-safe)
  const today = new Date().toISOString().slice(0, 10);

  if (date > today) {
    return Response.json(
      { error: "Cannot add entries in the future" },
      { status: 400 }
    );
  }

  // Ensure habit belongs to user
  const ownsHabit = await db
    .select()
    .from(habits)
    .where(and(eq(habits.id, habitId), eq(habits.userId, user.userId)));

  if (ownsHabit.length === 0) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  // Check if entry exists
  const existing = await db
    .select()
    .from(habitLogs)
    .where(
      and(
        eq(habitLogs.habitId, habitId),
        eq(habitLogs.date, date)
      )
    );

  if (existing.length > 0) {
    // 🔁 Toggle OFF
    await db
      .delete(habitLogs)
      .where(eq(habitLogs.id, existing[0].id));

    return Response.json({ done: false });
  }

  // ✅ Toggle ON
  await db.insert(habitLogs).values({
    habitId,
    date,
  });

  return Response.json({ done: true });
}
