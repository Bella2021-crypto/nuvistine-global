import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, amount } = body;

    if (!email || !amount) {
      return NextResponse.json(
        {
          error: "Email and amount are required.",
        },
        { status: 400 },
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        {
          error: "Paystack secret key is not configured.",
        },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
  email,
  amount: Math.round(Number(amount) * 100),
  currency: "NGN",
  callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
}),
      },
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        {
          error: data.message || "Unable to initialize payment.",
        },
        { status: response.status || 500 },
      );
    }

    const reference = data.data.reference;

await db.orm.public.Order.create({
  reference,
  email,
  fullName: body.customer?.fullName || "",
  phone: body.customer?.phone || "",
  address: body.customer?.address || "",
  city: body.customer?.city || "",
  state: body.customer?.state || "",
  amount: Math.round(Number(amount)),
  status: "pending",
});

return NextResponse.json({
  authorization_url: data.data.authorization_url,
  access_code: data.data.access_code,
  reference,
});
  } catch (error) {
  console.error("PAYSTACK INITIALIZE ERROR:", error);

  return NextResponse.json(
    { error: "Something went wrong while initializing payment." },
    { status: 500 },
  );
}
}