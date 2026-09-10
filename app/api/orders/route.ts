import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
const email = searchParams.get("email");
const id = searchParams.get("id");
    const orders = await db.orm.public.Order.all();
    const orderItems = await db.orm.public.OrderItem.all();
    const filteredOrders = id
  ? orders
      .filter((order) => order.id === Number(id))
      .map((order) => ({
        ...order,
        items: orderItems.filter((item) => item.orderId === order.id),
      }))
  : email
    ? orders.map((order) => ({
        ...order,
        items: orderItems.filter((item) => item.orderId === order.id),
      })).filter((order) => order.email === email)
    : orders.map((order) => ({
        ...order,
        items: orderItems.filter((item) => item.orderId === order.id),
      }));

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