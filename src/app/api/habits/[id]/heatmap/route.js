import { db } from "@/db";
import { habitLogs } from "@/db/schema";
import { getUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    const user = await getUser();
    if (!user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    const { id } = await context.params; // ✅ AWAIT params
    const habitId = Number(id);

    if (Number.isNaN(habitId)) {
        return NextResponse.json(
            { error: "Invalid habit id" },
            { status: 400 }
        );
    }

    const logs = await db
        .select()
        .from(habitLogs)
        .where(eq(habitLogs.habitId, habitId));

    const map = {};
    logs.forEach(l => {
        map[l.date] = (map[l.date] || 0) + 1;
    });

    const result = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);

        const key = d.toISOString().slice(0, 10);
        result.push({
            date: key,
            count: map[key] || 0,
        });
    }

    return NextResponse.json(result);
}
