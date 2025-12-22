import { db } from "@/db";
import { habits } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getUser } from "@/lib/auth";

export async function PUT(req, { params }) {
  const user = await getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const habitId = Number(id);
  const { name, icon, color } = await req.json();

  await db
    .update(habits)
    .set({ name, icon, color })
    .where(and(eq(habits.id, habitId), eq(habits.userId, user.userId)));

  return Response.json({ ok: true });
}

export async function DELETE(req, { params }) {
  const user = await getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const habitId = Number(id);

  await db
    .delete(habits)
    .where(and(eq(habits.id, habitId), eq(habits.userId, user.userId)));

  return Response.json({ ok: true });
}
