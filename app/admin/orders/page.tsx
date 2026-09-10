"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
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

  return (
    <main className="min-h-screen bg-[#F8F3E7] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-widest text-[#A98216]">
          NUVISTINE GLOBAL
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#201C17]">
          Order Management
        </h1>

        <p className="mt-3 text-[#6B6258]">
          View and manage customer orders.
        </p>

        {loading ? (
          <div className="mt-10 border border-[#D8CDB9] bg-white p-8 text-center">
            <p className="text-[#6B6258]">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-10 border border-[#D8CDB9] bg-white p-8 text-center">
            <p className="text-[#6B6258]">No orders found.</p>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto border border-[#D8CDB9] bg-white">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-[#E5DCCB] text-left">
                  <th className="px-6 py-4 text-xs tracking-widest text-[#A98216]">
                    ORDER
                  </th>
                  <th className="px-6 py-4 text-xs tracking-widest text-[#A98216]">
                    CUSTOMER
                  </th>
                  <th className="px-6 py-4 text-xs tracking-widest text-[#A98216]">
                    TOTAL
                  </th>
                  <th className="px-6 py-4 text-xs tracking-widest text-[#A98216]">
                    PAYMENT
                  </th>
                  <th className="px-6 py-4 text-xs tracking-widest text-[#A98216]">
                    DELIVERY
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#E5DCCB] last:border-b-0"
                  >
                    <td className="px-6 py-5 text-sm text-[#201C17]">
                      #{order.id}
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm text-[#201C17]">
                        {order.fullName}
                      </p>

                      <p className="mt-1 text-xs text-[#6B6258]">
                        {order.email}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#201C17]">
                      ₦{Number(order.amount).toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-xs tracking-widest text-[#6B6258]">
                        {String(order.status).toUpperCase()}
                      </span>
                    </td>

                    <td className="px-6 py-5">
  <select
    value={order.deliveryStatus || "processing"}
    onChange={async (event) => {
      const newStatus = event.target.value;

      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          deliveryStatus: newStatus,
        }),
      });

      if (response.ok) {
        setOrders((currentOrders) =>
          currentOrders.map((currentOrder) =>
            currentOrder.id === order.id
              ? {
                  ...currentOrder,
                  deliveryStatus: newStatus,
                }
              : currentOrder,
          ),
        );
      }
    }}
    className="border border-[#D8CDB9] bg-[#F8F3E7] px-3 py-2 text-xs tracking-wide text-[#201C17]"
  >
    <option value="processing">Processing</option>
    <option value="shipped">Shipped</option>
    <option value="out_for_delivery">
      Out for Delivery
    </option>
    <option value="delivered">Delivered</option>
  </select>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}