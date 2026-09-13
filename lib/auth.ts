import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { Temporal } from "@js-temporal/polyfill";
import { db } from "@/lib/db";

const SESSION_COOKIE = "nuvistine-session";
const SESSION_DURATION_DAYS = 30;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(customerId: number) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);

 const expiresAt = Temporal.Instant.fromEpochMilliseconds(
  Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000,
);

const cookieExpiresAt = new Date(
  Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000,
);

  await db.orm.public.Session.create({
    customerId,
    tokenHash,
    expiresAt,
  });

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: cookieExpiresAt,
    path: "/",
  });
}

export async function getCurrentCustomer() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const tokenHash = hashToken(token);
  const sessions = await db.orm.public.Session.all();

  const session = sessions.find(
  (item) =>
    item.tokenHash === tokenHash &&
    Temporal.Instant.compare(
      item.expiresAt,
      Temporal.Now.instant(),
    ) > 0,
);

  if (!session) {
    return null;
  }

  const customers = await db.orm.public.Customer.all();

  return (
    customers.find((customer) => customer.id === session.customerId) || null
  );
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    const tokenHash = hashToken(token);

    await db.orm.public.Session
      .where({ tokenHash })
      .delete();
  }

  cookieStore.delete(SESSION_COOKIE);
}