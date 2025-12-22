import "dotenv/config";
import { db } from "../db/index.js";
import { users, habits, habitLogs } from "../db/schema.js";

const user = await db.insert(users).values({
  email: "test@test.com",
  password: "hashed",
}).returning();

const habit = await db.insert(habits).values({
  userId: user[0].id,
  name: "Workout",
}).returning();

const today = new Date();

for (let i = 0; i < 10; i++) {
  const d = new Date(today);
  d.setDate(d.getDate() - i);

  await db.insert(habitLogs).values({
    habitId: habit[0].id,
    date: d.toISOString().slice(0, 10),
  });
}

console.log("Seeded");
process.exit(0);
