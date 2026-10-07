import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { registerRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const forwardedFor = request.headers.get("x-forwarded-for");
const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

const { success } = await registerRateLimit.limit(ip);

if (!success) {
  return NextResponse.json(
    {
      error: "Too many registration attempts. Please try again later.",
    },
    { status: 429 },
  );
}

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Name, email, and password are required.",
        },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error: "Password must be at least 8 characters.",
        },
        { status: 400 },
      );
    }

    const customers = await db.orm.public.Customer.all();

    const existingCustomer = customers.find(
      (customer) => customer.email === email,
    );

    if (existingCustomer) {
      return NextResponse.json(
        {
          error: "An account with this email already exists.",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const customer = await db.orm.public.Customer.create({
  name,
  email,
  password: hashedPassword,
});

await createSession(customer.id);

return NextResponse.json(
      {
        success: true,
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTRATION ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to create account.",
      },
      { status: 500 },
    );
  }
}