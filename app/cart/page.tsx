"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
 const {
  cart,
  removeFromCart,
  updateQuantity,
  cartTotal,
} = useCart();
    return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#201C17]">
      {/* Announcement */}
      <div className="bg-[#201C17] px-4 py-2 text-center text-[10px] tracking-[0.2em] text-[#F8F3E7]">
        FREE DELIVERY ON ORDERS OVER ₦100,000
      </div>

      {/* Header */}
      <header className="border-b border-[#C9A227]/20 bg-[#F8F3E7]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            className="font-serif text-xl tracking-[0.18em] lg:text-2xl"
          >
            NUVISTINE
            <span className="ml-2 text-[8px] tracking-[0.35em] text-[#A98216]">
              GLOBAL
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs tracking-[0.12em] lg:flex">
            <Link href="/" className="hover:text-[#A98216]">
              HOME
            </Link>

            <Link href="/shop" className="hover:text-[#A98216]">
              SHOP
            </Link>

            <Link href="/#collections" className="hover:text-[#A98216]">
              COLLECTIONS
            </Link>

            <Link href="/#beauty" className="hover:text-[#A98216]">
              BEAUTY
            </Link>

            <Link href="/#about" className="hover:text-[#A98216]">
              ABOUT
            </Link>
          </nav>

          <div className="flex items-center gap-4 text-lg">
            <button aria-label="Wishlist">♡</button>

            <button aria-label="Account">♙</button>

            <Link href="/cart" aria-label="Shopping bag">
              ♧
            </Link>
          </div>
        </div>
      </header>

      {/* Cart */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-12">
          <p className="mb-4 text-xs tracking-[0.4em] text-[#A98216]">
            YOUR SELECTION
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl">
            Shopping Bag
          </h1>
        </div>

        {/* Cart Contents */}
{cart.length === 0 ? (
  <div className="border-t border-[#201C17]/15 py-24 text-center">
    <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#C9A227]/40 text-3xl">
      ♧
    </div>

    <h2 className="font-serif text-3xl">
      Your bag is empty
    </h2>

    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#766D61]">
      Discover something beautiful and add it to your collection.
    </p>

    <Link
      href="/shop"
      className="mt-8 inline-block bg-[#201C17] px-9 py-4 text-xs tracking-[0.2em] text-white transition hover:bg-[#A98216]"
    >
      CONTINUE SHOPPING
    </Link>
  </div>
) : (
  <div className="border-t border-[#201C17]/15 py-12">
    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
      
      {/* Items */}
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={`${item.id}-${item.size || "default"}`}
            className="flex gap-5 border-b border-[#201C17]/10 pb-6"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-32 w-24 object-cover"
            />

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#766D61]">
                  {item.category}
                </p>

                <h3 className="mt-2 font-serif text-xl">
                  {item.name}
                </h3>

                {item.size && (
                  <p className="mt-2 text-sm text-[#766D61]">
                    Size: {item.size}
                  </p>
                )}

                <p className="mt-2 text-sm">
                  ₦{item.price.toLocaleString()}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-5">
                <div className="flex items-center border border-[#201C17]/20">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1,
                        item.size,
                      )
                    }
                    className="px-3 py-2"
                  >
                    −
                  </button>

                  <span className="px-3 text-sm">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1,
                        item.size,
                      )
                    }
                    className="px-3 py-2"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id, item.size)
                  }
                  className="text-xs tracking-[0.15em] text-[#766D61] underline underline-offset-4 hover:text-[#A98216]"
                >
                  REMOVE
                </button>
              </div>
            </div>

            <p className="text-sm font-medium">
              ₦{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="h-fit border border-[#201C17]/10 p-7">
        <h2 className="font-serif text-2xl">
          Order Summary
        </h2>

        <div className="mt-7 space-y-4 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₦{cartTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>
              {cartTotal >= 100000 ? "FREE" : "Calculated at checkout"}
            </span>
          </div>

          <div className="border-t border-[#201C17]/10 pt-5">
            <div className="flex justify-between text-base font-medium">
              <span>Total</span>
              <span>₦{cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <button
          className="mt-8 w-full bg-[#C9A227] py-5 text-xs tracking-[0.2em] text-white transition hover:bg-[#A98216]"
        >
          PROCEED TO CHECKOUT
        </button>

        <Link
          href="/shop"
          className="mt-5 block text-center text-xs tracking-[0.15em] underline underline-offset-4"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  </div>
)}
</section>
      {/* Newsletter */}
      <section className="bg-[#EFE5D0] px-6 py-20 text-center">
        <p className="mb-4 text-xs tracking-[0.4em] text-[#A98216]">
          STAY CONNECTED
        </p>

        <h2 className="font-serif text-4xl">
          Join the Nuvistine World
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm text-[#766D61]">
          Get updates on new collections, exclusive offers and special
          releases.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 border border-[#C9A227]/40 bg-[#F8F3E7] px-5 py-4 text-sm outline-none"
          />

          <button className="bg-[#201C17] px-7 py-4 text-xs tracking-[0.2em] text-white hover:bg-[#A98216]">
            JOIN
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#201C17] px-6 py-14 text-[#F8F3E7] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="font-serif text-2xl tracking-[0.18em]">
                NUVISTINE
              </div>

              <div className="mt-1 text-[8px] tracking-[0.55em] text-[#D6B343]">
                GLOBAL
              </div>

              <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
                Curated fashion, beauty and lifestyle essentials for the modern
                woman.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-xs tracking-[0.2em]">
                SHOP
              </h3>

              <div className="space-y-3 text-sm text-white/60">
                <Link href="/shop" className="block hover:text-white">
                  All Products
                </Link>

                <Link href="/shop" className="block hover:text-white">
                  Fashion
                </Link>

                <Link href="/shop" className="block hover:text-white">
                  Shoes
                </Link>

                <Link href="/shop" className="block hover:text-white">
                  Beauty
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs tracking-[0.2em]">
                HELP
              </h3>

              <div className="space-y-3 text-sm text-white/60">
                <a href="#" className="block hover:text-white">
                  Contact
                </a>

                <a href="#" className="block hover:text-white">
                  Shipping
                </a>

                <a href="#" className="block hover:text-white">
                  Returns
                </a>

                <a href="#" className="block hover:text-white">
                  FAQ
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs tracking-[0.2em]">
                FOLLOW
              </h3>

              <div className="space-y-3 text-sm text-white/60">
                <a href="#" className="block hover:text-white">
                  Instagram
                </a>

                <a href="#" className="block hover:text-white">
                  TikTok
                </a>

                <a href="#" className="block hover:text-white">
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/40">
            © 2026 Nuvistine Global. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}