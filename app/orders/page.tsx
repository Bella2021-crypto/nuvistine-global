"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const customerEmail = sessionStorage.getItem(
  "nuvistine-customer-email",
);

const ordersUrl = customerEmail
  ? `/api/orders?email=${encodeURIComponent(customerEmail)}`
  : "/api/orders";

fetch(ordersUrl)
    .then((response) => response.json())
    .then((data) => {
      setOrders(data.orders || []);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
}, []);
  return (
    <main className="min-h-screen bg-[#F8F3E7] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/shop"
          className="text-sm tracking-wide text-[#A98216] hover:underline"
        >
          ← Continue Shopping
        </Link>

        <h1 className="mt-8 font-serif text-4xl text-[#201C17]">
          My Orders
        </h1>

        <p className="mt-3 text-[#6B6258]">
          View your Nuvistine Global purchases and order status.
        </p>

        {loading ? (
  <div className="mt-10 border border-[#D8CDB9] bg-white p-10 text-center">
    <p className="text-[#6B6258]">Loading your orders...</p>
  </div>
) : orders.length === 0 ? (
  <div className="mt-10 border border-[#D8CDB9] bg-white p-10 text-center">
    <p className="text-[#6B6258]">You haven't placed any orders yet.</p>

    <Link
      href="/shop"
      className="mt-6 inline-block bg-[#201C17] px-8 py-3 text-sm tracking-widest text-white"
    >
      SHOP NOW
    </Link>
  </div>
) : (
  <div className="mt-10 space-y-6">
    {orders.map((order) => (
      <div
        key={order.id}
        className="border border-[#D8CDB9] bg-white p-6"
      >
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
        </div>

        <div className="mt-6 border-t border-[#E5DCCB] pt-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B6258]">
              Order Total
            </span>

            <span className="font-serif text-xl text-[#201C17]">
              ₦{Number(order.amount).toLocaleString()}
            </span>
          </div>
        </div>
        <Link
  href={`/orders/${order.id}`}
  className="mt-5 inline-block border border-[#201C17] px-6 py-3 text-xs tracking-widest text-[#201C17] hover:bg-[#201C17] hover:text-white"
>
  VIEW ORDER
</Link>
      </div>
    ))}
  </div>
)}
      </div>
    </main>
  );
}