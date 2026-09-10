import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const orderId = Number(body.orderId);
    const deliveryStatus = body.deliveryStatus;

    const allowedStatuses = [
      "processing",
      "shipped",
      "out_for_delivery",
      "delivered",
    ];

    if (!orderId || !allowedStatuses.includes(deliveryStatus)) {
      return NextResponse.json(
        { error: "Invalid order ID or delivery status." },
        { status: 400 },
      );
    }

    const orders = await db.orm.public.Order.all();

    const order = orders.find((item) => item.id === orderId);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 },
      );
    }

    await db.orm.public.Order
      .where({
        id: orderId,
      })
      .update({
        deliveryStatus,
      });

    return NextResponse.json({
      success: true,
      message: "Delivery status updated.",
    });
  } catch (error) {
    console.error("ORDER STATUS UPDATE ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to update delivery status.",
      },
      { status: 500 },
    );
  }
}