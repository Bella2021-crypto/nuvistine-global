import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
import {
  loginAccountRateLimit,
  loginRateLimit,
} from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    
    const body = await request.json();

    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required.",
        },
        { status: 400 },
      );
      const forwardedFor = request.headers.get("x-forwarded-for");
const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

const { success } = await loginRateLimit.limit(ip);

if (!success) {
  return NextResponse.json(
    {
      error: "Too many login attempts. Please try again later.",
    },
    { status: 429 },
  );
}

const { success: accountAllowed } =
  await loginAccountRateLimit.limit(email);

if (!accountAllowed) {
  return NextResponse.json(
    {
      error: "Too many login attempts. Please try again later.",
    },
    { status: 429 },
  );
}
    }

    const customer = await db.orm.public.Customer
  .where({
    email,
  })
  .first();

    if (!customer) {
      return NextResponse.json(
        {
          error: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    const passwordMatches = await bcrypt.compare(
      password,
      customer.password,
    );

    if (!passwordMatches) {
      return NextResponse.json(
        {
          error: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

   await createSession(customer.id);

return NextResponse.json({
  success: true,
  customer: {
    id: customer.id,
    name: customer.name,
    email: customer.email,
  },
});

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to log in.",
      },
      { status: 500 },
    );
  }
}