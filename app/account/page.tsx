"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Customer = {
  id: number;
  name: string;
  email: string;
};

export default function AccountPage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCustomer = localStorage.getItem("nuvistine-customer");

    if (savedCustomer) {
      try {
        setCustomer(JSON.parse(savedCustomer));
      } catch {
        localStorage.removeItem("nuvistine-customer");
      }
    }

    setLoading(false);
  }, []);

  function handleLogout() {
    localStorage.removeItem("nuvistine-customer");
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F3E7] px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm tracking-widest text-[#6B6258]">
            LOADING ACCOUNT...
          </p>
        </div>
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="min-h-screen bg-[#F8F3E7] px-6 py-16">
        <div className="mx-auto max-w-md text-center">
          <p className="text-xs tracking-[0.3em] text-[#A98216]">
            NUVISTINE GLOBAL
          </p>

          <h1 className="mt-4 font-serif text-4xl text-[#201C17]">
            Sign In Required
          </h1>

          <p className="mt-4 text-sm text-[#6B6258]">
            Please sign in to access your account.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-block bg-[#201C17] px-8 py-4 text-xs tracking-widest text-white hover:bg-[#A98216]"
          >
            SIGN IN
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F3E7] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-6 border-b border-[#D8CDB9] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#A98216]">
              NUVISTINE GLOBAL
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#201C17]">
              My Account
            </h1>

            <p className="mt-3 text-sm text-[#6B6258]">
              Welcome back, {customer.name}.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="border border-[#201C17] px-6 py-3 text-xs tracking-widest text-[#201C17] hover:bg-[#201C17] hover:text-white"
          >
            SIGN OUT
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="border border-[#D8CDB9] bg-white p-8">
            <p className="text-xs tracking-widest text-[#A98216]">
              ACCOUNT DETAILS
            </p>

            <div className="mt-6">
              <p className="text-xs tracking-widest text-[#6B6258]">
                NAME
              </p>

              <p className="mt-2 text-[#201C17]">
                {customer.name}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs tracking-widest text-[#6B6258]">
                EMAIL
              </p>

              <p className="mt-2 text-[#201C17]">
                {customer.email}
              </p>
            </div>
          </div>

          <div className="border border-[#D8CDB9] bg-white p-8">
            <p className="text-xs tracking-widest text-[#A98216]">
              ORDERS
            </p>

            <p className="mt-4 text-sm text-[#6B6258]">
              View your previous purchases and track your deliveries.
            </p>

            <Link
              href="/orders"
              className="mt-6 inline-block bg-[#201C17] px-6 py-3 text-xs tracking-widest text-white hover:bg-[#A98216]"
            >
              VIEW MY ORDERS
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/shop"
            className="text-xs tracking-widest text-[#6B6258] hover:text-[#A98216]"
          >
            ← CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </main>
  );
}