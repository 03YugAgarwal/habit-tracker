import { db } from "@/db";
import { users, habits, habitLogs } from "@/db/schema";
import { sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const getCachedStats = unstable_cache(
  async () => {
    const [{ count: userCount }] = await db
      .select({ count: sql`count(*)` })
      .from(users);

    const [{ count: habitCount }] = await db
      .select({ count: sql`count(*)` })
      .from(habits);

    const [{ count: logCount }] = await db
      .select({ count: sql`count(*)` })
      .from(habitLogs);

    return {
      userCount,
      habitCount,
      logCount,
    };
  },
  ["habit-footer-stats"],
  { revalidate: 60 * 60 * 24, tags: ["habit-footer-stats"] }
);

export default async function Footer() {
  const { userCount, habitCount, logCount } = await getCachedStats();

  return (
    <footer className="border-t border-[#30363d] mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#8b949e]">
        <div className="flex flex-wrap gap-3">
          <span>
            <strong className="text-[#c9d1d9]">{userCount}</strong> users
          </span>
          <span>·</span>
          <span>
            <strong className="text-[#c9d1d9]">{habitCount}</strong> habits
          </span>
          <span>·</span>
          <span>
            <strong className="text-[#c9d1d9]">{logCount}</strong> entries
          </span>
        </div>

        <a
          href="https://github.com/03YugAgarwal/habit-tracker/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#f0f6fc] transition"
        >
          Report issues - Github
        </a>
      </div>
    </footer>
  );
}
