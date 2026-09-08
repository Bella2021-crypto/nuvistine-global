"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

type PaymentStatus = "loading" | "success" | "failed";

export default function PaymentSuccessPage() {
  const { clearCart } = useCart();

  const [status, setStatus] =
    useState<PaymentStatus>("loading");

  const [message, setMessage] = useState(
    "Verifying your payment...",
  );

  const [reference, setReference] = useState("");

  useEffect(() => {
    async function verifyPayment() {
      const params = new URLSearchParams(window.location.search);
      const paymentReference = params.get("reference");

      if (!paymentReference) {
        setStatus("failed");
        setMessage(
          "We could not find your payment reference.",
        );
        return;
      }

      setReference(paymentReference);

      try {
        const response = await fetch(
          `/api/paystack/verify?reference=${encodeURIComponent(
            paymentReference,
          )}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to verify payment.",
          );
        }

        if (data.status === "success") {
          setStatus("success");
          setMessage(
            "Your payment was successful and your order has been confirmed.",
          );

          clearCart();
          sessionStorage.removeItem("nuvistine-checkout");
        } else {
          setStatus("failed");
          setMessage(
            `Payment status: ${data.status}. Your order has not been confirmed.`,
          );
        }
      } catch (error) {
        setStatus("failed");
        setMessage(
          error instanceof Error
            ? error.message
            : "We could not verify your payment.",
        );
      }
    }

    verifyPayment();
  }, [clearCart]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F3E7] text-[#201C17]">
        <div className="text-center">
          <p className="text-xs tracking-[0.2em] text-[#A98216]">
            PAYMENT
          </p>

          <h1 className="mt-4 font-serif text-3xl">
            Verifying your payment
          </h1>

          <p className="mt-4 text-sm text-[#766D61]">
            Please wait while we confirm your transaction.
          </p>
        </div>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="min-h-screen bg-[#F8F3E7] text-[#201C17]">
        <header className="border-b border-[#201C17]/10 px-6 py-6">
          <Link
            href="/"
            className="font-serif text-2xl tracking-[0.08em]"
          >
            NUVISTINE GLOBAL
          </Link>
        </header>

        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-700/30 text-3xl text-red-700">
            ×
          </div>

          <p className="mt-8 text-xs tracking-[0.2em] text-red-700">
            PAYMENT NOT CONFIRMED
          </p>

          <h1 className="mt-3 font-serif text-4xl">
            We couldn't confirm your payment
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#766D61]">
            {message}
          </p>

          {reference && (
            <p className="mt-5 text-xs text-[#766D61]">
              Reference: {reference}
            </p>
          )}

          <Link
            href="/cart"
            className="mt-9 inline-block bg-[#201C17] px-9 py-4 text-xs tracking-[0.2em] text-white transition hover:bg-[#A98216]"
          >
            RETURN TO BAG
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#201C17]">
      <header className="border-b border-[#201C17]/10 px-6 py-6">
        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.08em]"
        >
          NUVISTINE GLOBAL
        </Link>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C9A227]/50 text-3xl text-[#A98216]">
          ✓
        </div>

        <p className="mt-8 text-xs tracking-[0.2em] text-[#A98216]">
          ORDER CONFIRMED
        </p>

        <h1 className="mt-3 font-serif text-4xl lg:text-5xl">
          Thank You For Your Order
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#766D61]">
          {message}
        </p>

        {reference && (
          <div className="mt-7 border border-[#201C17]/10 p-5">
            <p className="text-[10px] tracking-[0.15em] text-[#766D61]">
              PAYMENT REFERENCE
            </p>

            <p className="mt-2 text-sm">
              {reference}
            </p>
          </div>
        )}

        <Link
          href="/shop"
          className="mt-9 inline-block bg-[#201C17] px-9 py-4 text-xs tracking-[0.2em] text-white transition hover:bg-[#A98216]"
        >
          CONTINUE SHOPPING
        </Link>
      </section>
    </main>
  );
}