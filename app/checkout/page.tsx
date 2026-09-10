"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();

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
            Add something beautiful to your bag before checking out.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block bg-[#201C17] px-9 py-4 text-xs tracking-[0.2em] text-white hover:bg-[#A98216]"
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
            href="/cart"
            className="text-xs tracking-[0.15em] underline underline-offset-4"
          >
            BACK TO BAG
          </Link>
        </div>
      </header>

      {/* Checkout */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-12">
          <p className="text-xs tracking-[0.2em] text-[#A98216]">
            CHECKOUT
          </p>

          <h1 className="mt-3 font-serif text-4xl lg:text-5xl">
            Complete Your Order
          </h1>
        </div>

        <form
          onSubmit={(event) => {
  event.preventDefault();

  const form = event.currentTarget;

  const formData = new FormData(form);

  const checkoutData = {
  fullName: formData.get("fullName"),
  email: formData.get("email"),
  phone: formData.get("phone"),
  address: formData.get("address"),
  city: formData.get("city"),
  state: formData.get("state"),
};

sessionStorage.setItem(
  "nuvistine-checkout",
  JSON.stringify(checkoutData),
);

sessionStorage.setItem(
  "nuvistine-customer-email",
  String(checkoutData.email),
);

window.location.href = "/payment";
}}
          className="grid gap-12 lg:grid-cols-[1fr_400px]"
        >
          {/* Customer Information */}
          <div>
            <h2 className="font-serif text-2xl">
              Customer Information
            </h2>

            <div className="mt-7 grid gap-5">
              <div>
                <label className="mb-2 block text-xs tracking-[0.12em]">
                  FULL NAME
                </label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  required
                  minLength={2}
                  className="w-full border border-[#201C17]/20 bg-transparent px-4 py-4 text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs tracking-[0.12em]">
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full border border-[#201C17]/20 bg-transparent px-4 py-4 text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs tracking-[0.12em]">
                  PHONE NUMBER
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="0800 000 0000"
                  required
                  minLength={7}
                  className="w-full border border-[#201C17]/20 bg-transparent px-4 py-4 text-sm outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>

            {/* Delivery */}
            <h2 className="mt-12 font-serif text-2xl">
              Delivery Information
            </h2>

            <div className="mt-7 grid gap-5">
              <div>
                <label className="mb-2 block text-xs tracking-[0.12em]">
                  DELIVERY ADDRESS
                </label>

                <input
                  type="text"
                  name="address"
                  placeholder="Street address"
                  required
                  minLength={5}
                  className="w-full border border-[#201C17]/20 bg-transparent px-4 py-4 text-sm outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs tracking-[0.12em]">
                    CITY
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="Lagos"
                    required
                    className="w-full border border-[#201C17]/20 bg-transparent px-4 py-4 text-sm outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs tracking-[0.12em]">
                    STATE
                  </label>

                  <input
                    type="text"
                    name="state"
                    placeholder="Lagos State"
                    required
                    className="w-full border border-[#201C17]/20 bg-transparent px-4 py-4 text-sm outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <aside className="h-fit border border-[#201C17]/10 p-7">
            <h2 className="font-serif text-2xl">
              Your Order
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
              type="submit"
              className="mt-8 w-full bg-[#C9A227] py-5 text-xs tracking-[0.2em] text-white transition hover:bg-[#A98216]"
            >
              CONTINUE TO PAYMENT
            </button>

            <p className="mt-4 text-center text-[11px] leading-5 text-[#766D61]">
              Your information is required to process and deliver your
              order.
            </p>
          </aside>
        </form>
      </section>
    </main>
  );
}