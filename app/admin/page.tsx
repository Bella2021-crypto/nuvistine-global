"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const paidOrders = orders.filter(
    (order) => order.status === "paid",
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  );

  const revenue = paidOrders.reduce(
    (total, order) => total + Number(order.amount),
    0,
  );

  return (
    <main className="min-h-screen bg-[#F8F3E7] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-widest text-[#A98216]">
          NUVISTINE GLOBAL
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#201C17]">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-[#6B6258]">
          Overview of your store activity.
        </p>

        {loading ? (
          <div className="mt-10 border border-[#D8CDB9] bg-white p-8 text-center">
            <p className="text-[#6B6258]">
              Loading dashboard...
            </p>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-5 md:grid-cols-4">
              <div className="border border-[#D8CDB9] bg-white p-6">
                <p className="text-xs tracking-widest text-[#A98216]">
                  TOTAL ORDERS
                </p>
                <p className="mt-3 font-serif text-3xl text-[#201C17]">
                  {orders.length}
                </p>
              </div>

              <div className="border border-[#D8CDB9] bg-white p-6">
                <p className="text-xs tracking-widest text-[#A98216]">
                  PAID ORDERS
                </p>
                <p className="mt-3 font-serif text-3xl text-[#201C17]">
                  {paidOrders.length}
                </p>
              </div>

              <div className="border border-[#D8CDB9] bg-white p-6">
                <p className="text-xs tracking-widest text-[#A98216]">
                  PENDING ORDERS
                </p>
                <p className="mt-3 font-serif text-3xl text-[#201C17]">
                  {pendingOrders.length}
                </p>
              </div>

              <div className="border border-[#D8CDB9] bg-white p-6">
                <p className="text-xs tracking-widest text-[#A98216]">
                  REVENUE
                </p>
                <p className="mt-3 font-serif text-2xl text-[#201C17]">
                  ₦{revenue.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/admin/orders"
                className="bg-[#201C17] px-8 py-4 text-center text-xs tracking-widest text-white hover:bg-[#A98216]"
              >
                MANAGE ORDERS
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}