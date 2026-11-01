import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createAdminSession,
  isAdminConfigured,
  isSameOriginRequest,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

const attemptsByAddress = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function getAttemptRecord(address) {
  const now = Date.now();
  const current = attemptsByAddress.get(address);
  if (!current || now - current.startedAt > WINDOW_MS) {
    const next = { startedAt: now, count: 0 };
    attemptsByAddress.set(address, next);
    return next;
  }
  return current;
}

export async function POST(request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin sign-in is not configured on the server." }, { status: 503 });
  }

  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const attempts = getAttemptRecord(address);
  const isDev = process.env.NODE_ENV !== "production";
  if (!isDev && attempts.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many sign-in attempts. Try again later." }, { status: 429 });
  }

  let credentials;
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }

  if (!verifyAdminCredentials(credentials.email, credentials.password)) {
    attempts.count += 1;
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  }

  attemptsByAddress.delete(address);
  const cookieStore = await cookies();
  cookieStore.set(
    ADMIN_COOKIE_NAME,
    createAdminSession(credentials.email),
    adminCookieOptions()
  );
  return NextResponse.json({ authenticated: true });
}
