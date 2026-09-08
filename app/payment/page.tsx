"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function PaymentPage() {
 const { cart, cartTotal, isCartLoaded } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
const [paymentError, setPaymentError] = useState("");

if (!isCartLoaded) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F3E7] text-[#201C17]">
      <p className="text-xs tracking-[0.2em]">
        LOADING...
      </p>
    </main>
  );
}

  if (cart.length === 0) {
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

        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="font-serif text-4xl">
            Your bag is empty
          </h1>

          <p className="mt-4 text-sm text-[#766D61]">
            Add an item to your bag before making a payment.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block bg-[#201C17] px-9 py-4 text-xs tracking-[0.2em] text-white transition hover:bg-[#A98216]"
          >
            SHOP NOW
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#201C17]">
      {/* Header */}
      <header className="border-b border-[#201C17]/10 px-6 py-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="font-serif text-2xl tracking-[0.08em]"
          >
            NUVISTINE GLOBAL
          </Link>

          <Link
            href="/checkout"
            className="text-xs tracking-[0.15em] underline underline-offset-4"
          >
            BACK TO CHECKOUT
          </Link>
        </div>
      </header>

      {/* Payment */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-12">
          <p className="text-xs tracking-[0.2em] text-[#A98216]">
            PAYMENT
          </p>

          <h1 className="mt-3 font-serif text-4xl lg:text-5xl">
            Complete Your Payment
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#766D61]">
            Your order is almost complete. Choose your preferred payment
            method below.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Payment Methods */}
          <div>
            <h2 className="font-serif text-2xl">
              Payment Method
            </h2>

            <div className="mt-7 space-y-4">
              <label className="flex cursor-pointer items-start gap-4 border border-[#C9A227] bg-white/30 p-5">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                  className="mt-1 accent-[#C9A227]"
                />

                <div>
                  <p className="text-sm font-medium">
                    Pay Online
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#766D61]">
                    Pay securely with your card, bank transfer, USSD or
                    other available payment options.
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-4 border border-[#201C17]/15 p-5">
                <input
                  type="radio"
                  name="payment"
                  className="mt-1 accent-[#C9A227]"
                />

                <div>
                  <p className="text-sm font-medium">
                    Pay on Delivery
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#766D61]">
                    Available delivery options will be confirmed before
                    your order is processed.
                  </p>
                </div>
              </label>
            </div>

            <div className="mt-10 border border-[#201C17]/10 p-6">
              <h3 className="font-serif text-xl">
                Secure Payment
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#766D61]">
                Your payment will be processed securely. We never store
                your card details on the Nuvistine Global website.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <aside className="h-fit border border-[#201C17]/10 p-7">
            <h2 className="font-serif text-2xl">
              Order Summary
            </h2>

            <div className="mt-7 space-y-5">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size || "default"}`}
                  className="flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-serif text-lg">
                      {item.name}
                    </p>

                    {item.size && (
                      <p className="mt-1 text-xs text-[#766D61]">
                        Size: {item.size}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-[#766D61]">
                      Qty: {item.quantity}
                    </p>

                    <p className="mt-2 text-sm">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-[#201C17]/10 pt-5">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>

              <div className="mt-4 flex justify-between text-sm">
                <span>Delivery</span>
                <span>
                  {cartTotal >= 100000
                    ? "FREE"
                    : "Calculated at checkout"}
                </span>
              </div>

              <div className="mt-5 border-t border-[#201C17]/10 pt-5">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>₦{cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
  type="button"
  disabled={isProcessing}
  onClick={async () => {
    setIsProcessing(true);
    setPaymentError("");

    try {
      const checkoutData = sessionStorage.getItem(
        "nuvistine-checkout",
      );

      if (!checkoutData) {
        throw new Error(
          "Checkout information is missing. Please return to checkout.",
        );
      }

      const customer = JSON.parse(checkoutData);

      const response = await fetch("/api/paystack/initialize", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  email: customer.email,
  amount: cartTotal,
  customer: {
    fullName: customer.fullName,
    phone: customer.phone,
    address: customer.address,
    city: customer.city,
    state: customer.state,
  },
  items: cart,
}),
});

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to initialize payment.",
        );
      }

      window.location.href = data.authorization_url;
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );

      setIsProcessing(false);
    }
  }}
  className="mt-8 w-full bg-[#C9A227] py-5 text-xs tracking-[0.2em] text-white transition hover:bg-[#A98216] disabled:cursor-not-allowed disabled:opacity-60"
>
  {isProcessing
    ? "REDIRECTING TO PAYMENT..."
    : `PAY ₦${cartTotal.toLocaleString()}`}
</button>

{paymentError && (
  <p className="mt-4 text-center text-xs text-red-700">
    {paymentError}
  </p>
)}

            <p className="mt-4 text-center text-[11px] leading-5 text-[#766D61]">
              You will be redirected to a secure payment page when
              payment processing is enabled.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}