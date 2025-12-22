import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("auth");

  if (!cookie) return null;

  try {
    return jwt.verify(cookie.value, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}