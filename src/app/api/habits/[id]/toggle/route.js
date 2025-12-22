import { db } from "@/db";
import { habits, habitLogs } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getUser } from "@/lib/auth";

export async function POST(req, context) {
  const user = await getUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // params is async in App Router
  const { id } = await context.params;
  const habitId = Number(id);

  if (Number.isNaN(habitId)) {
    return Response.json(
      { error: "Invalid habit id" },
      { status: 400 }
    );
  }

  // ✅ OWNERSHIP CHECK FIRST
  const ownsHabit = await db
    .select()
    .from(habits)
    .where(
      and(
        eq(habits.id, habitId),
        eq(habits.userId, user.userId)
      )
    );

  if (ownsHabit.length === 0) {
    return Response.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  // Check if already logged today
  const existing = await db
    .select()
    .from(habitLogs)
    .where(
      and(
        eq(habitLogs.habitId, habitId),
        eq(habitLogs.date, today)
      )
    );

  if (existing.length > 0) {
    // Undo
    await db
      .delete(habitLogs)
      .where(eq(habitLogs.id, existing[0].id));

    return Response.json({ done: false });
  }

  // Log today
  await db.insert(habitLogs).values({
    habitId,
    date: today,
  });

  return Response.json({ done: true });
}
