import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { error: "Transaction reference is required." },
        { status: 400 },
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Paystack secret key is not configured." },
        { status: 500 },
      );
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        { error: data.message || "Unable to verify transaction." },
        { status: response.status || 500 },
      );
    }

    const orders = await db.orm.public.Order.all();

const order = orders.find(
  (item) => item.reference === data.data.reference,
);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found for this transaction." },
        { status: 404 },
      );
    }

    const paystackAmount = Number(data.data.amount);
    const orderAmount = Number(order.amount) * 100;

    if (paystackAmount !== orderAmount) {
      return NextResponse.json(
        { error: "Payment amount does not match the order amount." },
        { status: 400 },
      );
    }

    if (data.data.status === "success") {
  await db.orm.public.Order
    .where({
      reference: data.data.reference,
    })
    .update({
      status: "paid",
    });
}

    return NextResponse.json({
      status: data.data.status,
      reference: data.data.reference,
      amount: data.data.amount,
      currency: data.data.currency,
      customer: data.data.customer,
      orderStatus:
        data.data.status === "success" ? "paid" : order.status,
    });
  } catch (error) {
    console.error("PAYSTACK VERIFY ERROR:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while verifying payment.",
      },
      { status: 500 },
    );
  }
}