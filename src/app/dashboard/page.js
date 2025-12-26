import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { db } from "@/db";
import { habits, habitLogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import Navbar from "@/components/Navbar";
import DashboardClient from "./DashboardClient";
import Footer from "@/components/Footer";

import { inArray } from "drizzle-orm";

export default async function Dashboard() {
  const user = await getUser();

  if (!user) redirect("/login?reason=auth");

  const userHabits = await db
    .select()
    .from(habits)
    .where(eq(habits.userId, user.userId));




  const habitIds = userHabits.map(h => h.id);

  const logs =
    habitIds.length > 0
      ? await db
        .select()
        .from(habitLogs)
        .where(inArray(habitLogs.habitId, habitIds))
      : [];

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="text-lg font-semibold text-[#f0f6fc] mb-4">
          Your habits
        </h1>

        {/* ⬇️ move heavy work to client */}
        <DashboardClient habits={userHabits} logs={logs} />
      </main>

      <Footer />
    </div>
  );
}
