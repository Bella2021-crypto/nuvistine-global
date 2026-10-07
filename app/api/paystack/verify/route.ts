import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { paymentVerifyRateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    const forwardedFor = request.headers.get("x-forwarded-for");
const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

const { success } = await paymentVerifyRateLimit.limit(ip);

if (!success) {
  return NextResponse.json(
    {
      error: "Too many verification attempts. Please try again later.",
    },
    { status: 429 },
  );
}

if (
  !reference ||
  reference.trim().length === 0 ||
  reference.length > 100
) {
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

    if (
  !response.ok ||
  !data.status ||
  data.data?.status !== "success"
) {
  return NextResponse.json(
    { error: "Payment was not successful." },
    { status: 400 },
  );
}

    const order = await db.orm.public.Order
  .where({
    reference: data.data.reference,
  })
  .first();
  
    if (!order) {
      return NextResponse.json(
        { error: "Order not found for this transaction." },
        { status: 404 },
      );
    }

    if (
  data.data.reference !== reference ||
  data.data.reference !== order.reference
) {
  return NextResponse.json(
    { error: "Payment reference does not match the order." },
    { status: 400 },
  );
}

const paystackEmail = data.data.customer?.email?.toLowerCase();
const orderEmail = order.email.toLowerCase();

if (!paystackEmail || paystackEmail !== orderEmail) {
  return NextResponse.json(
    { error: "Payment customer does not match the order." },
    { status: 400 },
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

if (order.status === "paid") {
  return NextResponse.json({
    status: "success",
    reference: data.data.reference,
    amount: data.data.amount,
    currency: data.data.currency,
    customer: data.data.customer,
    orderStatus: "paid",
  });
}

if (order.status !== "pending") {
  return NextResponse.json(
    { error: "This order is not available for payment verification." },
    { status: 400 },
  );
}

    if (data.data.status === "success" && order.status === "pending") {
  await db.transaction(async (tx) => {
 
  const orderItems = await tx.orm.public.OrderItem.all();

  const itemsForOrder = orderItems.filter(
    (item) => item.orderId === order.id,
  );

  const products = await tx.orm.public.Product.all();

for (const item of itemsForOrder) {
  const product = products.find(
    (product) => product.id === item.productId,
  );

    if (!product) {
  throw new Error(
    "A product in this order could not be found.",
  );
}

    if (Number(product.stock) < Number(item.quantity)) {
  throw new Error(
    `${product.name} does not have enough stock to fulfill this order.`,
  );
}

const newStock =
  Number(product.stock) - Number(item.quantity);

await tx.orm.public.Product
  .where({
    id: product.id,
  })
  .update({
    stock: newStock,
  });
  }

  await tx.orm.public.Order
    .where({
      reference: data.data.reference,
    })
    .update({
      status: "paid",
    });
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
  } 
 
  catch (error) {
  console.error("PAYSTACK VERIFY ERROR:", error);

  if (
    error instanceof Error &&
    (
      error.message.includes("does not have enough stock") ||
      error.message.includes("product in this order could not be found")
    )
  ) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      error: "Something went wrong while verifying payment.",
    },
    { status: 500 },
  );
}
}