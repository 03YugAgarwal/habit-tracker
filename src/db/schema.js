import { pgTable, serial, varchar, date, integer } from "drizzle-orm/pg-core";

/* USERS */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
});

/* HABITS */
// src/db/schema.js
export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: varchar("name", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 10 }).notNull(),
  color: varchar("color", { length: 20 }).notNull(),
});


/* HABIT LOGS (heatmap source) */
export const habitLogs = pgTable("habit_logs", {
  id: serial("id").primaryKey(),
  habitId: integer("habit_id")
    .notNull()
    .references(() => habits.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
});

