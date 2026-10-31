import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "baxed_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return typeof secret === "string" && secret.length >= 32 ? secret : null;
}

function digest(value, secret) {
  return createHmac("sha256", secret).update(value).digest();
}

function equalConstantTime(left, right, secret) {
  return timingSafeEqual(digest(left, secret), digest(right, secret));
}

export function isAdminConfigured() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  return Boolean(
    email &&
    email.toLowerCase() !== "owner@example.com" &&
    password &&
    password !== "replace-with-a-long-unique-password" &&
    secret &&
    secret !== "replace-with-a-random-secret-at-least-32-characters" &&
    getSessionSecret()
  );
}

export function verifyAdminCredentials(email, password) {
  if (!isAdminConfigured()) return false;

  const secret = getSessionSecret();
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!secret || !expectedEmail || !expectedPassword) return false;

  const suppliedEmail = String(email || "").trim().toLowerCase();
  const suppliedPassword = String(password || "");
  return (
    equalConstantTime(suppliedEmail, expectedEmail, secret) &&
    equalConstantTime(suppliedPassword, expectedPassword, secret)
  );
}

function sign(payload, secret) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createAdminSession(email) {
  const secret = getSessionSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters.");

  const payload = Buffer.from(JSON.stringify({
    email: String(email).trim().toLowerCase(),
    expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
  })).toString("base64url");

  return `${payload}.${sign(payload, secret)}`;
}

export function verifyAdminSession(token) {
  const secret = getSessionSecret();
  if (!secret || typeof token !== "string") return false;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return false;

  const expectedSignature = sign(payload, secret);
  const validSignature = equalConstantTime(signature, expectedSignature, secret);
  if (!validSignature) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    return session.email === configuredEmail && Number(session.expiresAt) > Date.now();
  } catch {
    return false;
  }
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  };
}

export function isSameOriginRequest(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
