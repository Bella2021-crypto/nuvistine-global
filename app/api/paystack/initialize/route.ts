import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

   const { email, items } = body;

    if (!email || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          error: "Email and items are required.",
        },
        { status: 400 },
      );
    }

    const productIds = items.map((item: { id: number }) => Number(item.id));

const products = await db.orm.public.Product
  .where((product) => product.id.in(productIds))
  .where((product) => product.isActive.eq(true))
  .all();

if (products.length !== productIds.length) {
  return NextResponse.json(
    {
      error: "One or more products are unavailable.",
    },
    { status: 400 },
  );
}

let calculatedAmount = 0;

for (const item of items) {
  const product = products.find(
  (product: (typeof products)[number]) =>
    product.id === Number(item.id),
);

  if (!product) {
    return NextResponse.json(
      {
        error: "One or more products could not be found.",
      },
      { status: 400 },
    );
  }

  const quantity = Number(item.quantity);

  if (!Number.isInteger(quantity) || quantity < 1) {
    return NextResponse.json(
      {
        error: "Invalid product quantity.",
      },
      { status: 400 },
    );
  }

  if (quantity > product.stock) {
    return NextResponse.json(
      {
        error: `${product.name} does not have enough stock.`,
      },
      { status: 400 },
    );
  }
if (product.sizes) {
  const allowedSizes = product.sizes
    .split(",")
    .map((size) => size.trim());

  if (item.size && !allowedSizes.includes(item.size)) {
    return NextResponse.json(
      {
        error: `Invalid size selected for ${product.name}.`,
      },
      { status: 400 },
    );
  }
}

  calculatedAmount += product.price * quantity;
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
  amount: Math.round(calculatedAmount * 100),
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

const order = await db.orm.public.Order.create({
  reference,
  email,
  fullName: body.customer?.fullName || "",
  phone: body.customer?.phone || "",
  address: body.customer?.address || "",
  city: body.customer?.city || "",
  state: body.customer?.state || "",
  amount: Math.round(calculatedAmount),
  status: "pending",
  deliveryStatus: "processing",
});

for (const item of items) {
  const product = products.find(
    (product) => product.id === Number(item.id),
  );

  if (!product) {
    continue;
  }

  await db.orm.public.OrderItem.create({
    orderId: order.id,
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity: Number(item.quantity),
    size: item.size || null,
  });
}

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