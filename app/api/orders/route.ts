import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
const email = searchParams.get("email")?.trim().toLowerCase();
const id = searchParams.get("id");

if (id && !/^\d+$/.test(id)) {
  return NextResponse.json(
    {
      error: "Invalid order ID.",
    },
    { status: 400 },
  );
}

if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  return NextResponse.json(
    {
      error: "Invalid email address.",
    },
    { status: 400 },
  );
}
    const orders = await db.orm.public.Order.all();
    const orderItems = await db.orm.public.OrderItem.all();
    if (!email && !id) {
  return NextResponse.json(
    {
      error: "Email or order ID is required.",
    },
    { status: 400 },
  );
}

const filteredOrders = id
  ? orders
      .filter((order) => order.id === Number(id))
      .map((order) => ({
        ...order,
        items: orderItems.filter((item) => item.orderId === order.id),
      }))
  : orders
      .map((order) => ({
        ...order,
        items: orderItems.filter((item) => item.orderId === order.id),
      }))
      .filter((order) => order.email === email);

    return NextResponse.json({
  success: true,
  orders: filteredOrders,
});

  } catch (error) {
    console.error("ORDERS API ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to load orders.",
      },
      { status: 500 },
    );
  }
}