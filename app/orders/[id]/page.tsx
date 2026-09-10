"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    params.then((value) => {
      setOrderId(value.id);
    });
  }, [params]);
  const [order, setOrder] = useState<any>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!orderId) return;

  fetch(`/api/orders?id=${orderId}`)
    .then((response) => response.json())
    .then((data) => {
      setOrder(data.orders?.[0] || null);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
}, [orderId]);
  return (
    <main className="min-h-screen bg-[#F8F3E7] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/orders"
          className="text-sm tracking-wide text-[#A98216] hover:underline"
        >
          ← Back to Orders
        </Link>

        <h1 className="mt-8 font-serif text-4xl text-[#201C17]">
          Order Details
        </h1>

        {loading ? (
  <div className="mt-10 border border-[#D8CDB9] bg-white p-8 text-center">
    <p className="text-[#6B6258]">Loading order details...</p>
  </div>
) : !order ? (
  <div className="mt-10 border border-[#D8CDB9] bg-white p-8 text-center">
    <p className="text-[#6B6258]">Order not found.</p>
  </div>
) : (
  <div className="mt-10 space-y-6">
    <div className="border border-[#D8CDB9] bg-white p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <p className="text-xs tracking-widest text-[#A98216]">
            ORDER #{order.id}
          </p>

          <p className="mt-2 text-sm text-[#6B6258]">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`w-fit px-4 py-2 text-xs tracking-widest ${
            order.status === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {order.status.toUpperCase()}
        </span>
        
        <div className="w-full md:w-auto">
  <p className="mb-2 text-xs tracking-widest text-[#A98216]">
    DELIVERY STATUS
  </p>

  <span className="inline-block bg-[#EFE5D0] px-4 py-2 text-xs tracking-widest text-[#A98216]">
    {String(order.deliveryStatus || "processing")
      .replaceAll("_", " ")
      .toUpperCase()}
  </span>
</div>
      </div>

      <div className="mt-8 grid gap-6 border-t border-[#E5DCCB] pt-6 md:grid-cols-2">
        <div>
          <p className="text-xs tracking-widest text-[#A98216]">
            CUSTOMER
          </p>
          <p className="mt-2 text-[#201C17]">{order.fullName}</p>
        </div>

        <div>
          <p className="text-xs tracking-widest text-[#A98216]">
            DELIVERY ADDRESS
          </p>
          <p className="mt-2 text-[#201C17]">
            {order.address}, {order.city}, {order.state}
          </p>
        </div>
      </div>
      <div className="mt-8 border-t border-[#E5DCCB] pt-6">
  <p className="text-xs tracking-widest text-[#A98216]">
    ORDER PROGRESS
  </p>

  <div className="mt-6 grid grid-cols-4 gap-2">
    {[
      { key: "processing", label: "Processing" },
      { key: "shipped", label: "Shipped" },
      { key: "out_for_delivery", label: "Out for Delivery" },
      { key: "delivered", label: "Delivered" },
    ].map((step) => {
      const statuses = [
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
      ];

      const currentIndex = statuses.indexOf(
        String(order.deliveryStatus || "processing"),
      );

      const stepIndex = statuses.indexOf(step.key);
      const completed = stepIndex <= currentIndex;

      return (
        <div key={step.key} className="text-center">
          <div
            className={`mx-auto h-3 w-3 rounded-full ${
              completed ? "bg-[#C9A227]" : "bg-[#D8CDB9]"
            }`}
          />

          <p
            className={`mt-3 text-[10px] tracking-wide ${
              completed ? "text-[#201C17]" : "text-[#9A9186]"
            }`}
          >
            {step.label}
          </p>
        </div>
      );
    })}
  </div>
</div>

      <div className="mt-8 border-t border-[#E5DCCB] pt-6">
  <p className="text-xs tracking-widest text-[#A98216]">
    ITEMS ORDERED
  </p>

  <div className="mt-5 space-y-4">
    {order.items?.map((item: any) => (
      <div
        key={item.id}
        className="flex items-center justify-between border-b border-[#E5DCCB] pb-4"
      >
        <div>
          <p className="text-[#201C17]">{item.name}</p>

          <p className="mt-1 text-sm text-[#6B6258]">
            Quantity: {item.quantity}
            {item.size ? ` • Size: ${item.size}` : ""}
          </p>
        </div>

        <p className="font-medium text-[#201C17]">
          ₦{Number(item.price).toLocaleString()}
        </p>
      </div>
    ))}
  </div>

  <div className="mt-6 flex items-center justify-between">
    <span className="text-sm text-[#6B6258]">
      Order Total
    </span>

    <span className="font-serif text-2xl text-[#201C17]">
      ₦{Number(order.amount).toLocaleString()}
    </span>
  </div>
</div>
    </div>
  </div>
)}
      </div>
    </main>
  );
}