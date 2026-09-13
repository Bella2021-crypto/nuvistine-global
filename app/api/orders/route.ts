import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/auth";

import { db } from "@/lib/db";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
const customer = await getCurrentCustomer();

if (!customer) {
  return NextResponse.json(
    { error: "Not authenticated." },
    { status: 401 },
  );
}

const email = customer.email.toLowerCase();
const id = searchParams.get("id");

if (id && !/^\d+$/.test(id)) {
  return NextResponse.json(
    {
      error: "Invalid order ID.",
    },
    { status: 400 },
  );
}
    const orders = await db.orm.public.Order.all();
    const orderItems = await db.orm.public.OrderItem.all();

const filteredOrders = id
  ? orders
      .filter(
        (order) =>
          order.id === Number(id) &&
          order.email === email,
      )
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