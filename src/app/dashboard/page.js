import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { db } from "@/db";
import { habits, habitLogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import Navbar from "@/components/Navbar";
import HabitSection from "@/components/HabitSection";
import Footer from "@/components/Footer";

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    redirect("/login?reason=auth");
  }

  // 1️⃣ Fetch user's habits
  const userHabits = await db
    .select()
    .from(habits)
    .where(eq(habits.userId, user.userId));

  // 2️⃣ Build UI with resolved async children
  const habitSections = await Promise.all(
    userHabits.map(async habit => {
      // Fetch logs for this habit
      const logs = await db
        .select()
        .from(habitLogs)
        .where(eq(habitLogs.habitId, habit.id));

      // Build date → count map
      const logMap = {};
      logs.forEach(l => {
        const key =
          typeof l.date === "string"
            ? l.date
            : l.date.toISOString().slice(0, 10);

        logMap[key] = (logMap[key] || 0) + 1;
      });

      // Generate last 365 days (always)
      const data = [];
      const today = new Date();

      for (let i = 364; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);

        const key = d.toISOString().slice(0, 10);

        data.push({
          date: key,
          count: logMap[key] || 0,
        });
      }

      return (
        <HabitSection
          key={habit.id}
          habit={habit}
          data={data}
        />
      );
    })
  );

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="text-lg font-semibold text-[#f0f6fc] mb-4">
          Your habits
        </h1>

        <div className="space-y-4">
          {habitSections}
        </div>
      </main>
      <Footer />
    </div>
  );
}
