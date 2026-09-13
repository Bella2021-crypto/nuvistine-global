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

            <Link
  href="/account"
  aria-label="Account"
  className="transition hover:text-[#A98216]"
>
  ♙
</Link>

           <Link
  href="/cart"
  aria-label="Shopping bag"
  className="transition hover:text-[#A98216]"
>
  ♧
  {cart.length > 0 && (
    <span className="ml-1 text-xs align-top">
      ({cart.reduce((total, item) => total + item.quantity, 0)})
    </span>
  )}
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

<p className="mt-4 text-sm text-[#766D61]">
  {cart.reduce((total, item) => total + item.quantity, 0)}{" "}
  {cart.reduce((total, item) => total + item.quantity, 0) === 1
    ? "item"
    : "items"}{" "}
  in your bag
</p>
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
            className="flex flex-col gap-5 border-b border-[#201C17]/10 pb-6 sm:flex-row"
          >
            <div className="h-56 w-full shrink-0 overflow-hidden bg-[#EFE5D0] sm:h-48 sm:w-36">
  <img
    src={item.image}
    alt={item.name}
    className="h-full w-full object-cover transition duration-500 hover:scale-105"
  />
</div>

            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div>
  <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98216]">
    {item.category}
  </p>

  <h3 className="mt-2 font-serif text-2xl text-[#201C17]">
    {item.name}
  </h3>

  {item.size && (
    <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[#766D61]">
      Size: {item.size}
    </p>
  )}

  <p className="mt-3 text-xs tracking-[0.1em] text-[#766D61]">
  {item.stock === 0
    ? "SOLD OUT"
    : item.stock <= 3
      ? `ONLY ${item.stock} LEFT`
      : `${item.stock} AVAILABLE`}
</p>

  <p className="mt-4 text-sm text-[#201C17]">
    ₦{item.price.toLocaleString()}
  </p>
</div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex h-full w-11 items-center justify-center text-lg transition hover:bg-[#EFE5D0] disabled:cursor-not-allowed disabled:opacity-30">
  <button
 disabled={item.stock <= 0 || item.quantity >= item.stock}
  onClick={() => {
    if (item.quantity >= item.stock) {
      return;
    }

    updateQuantity(
      item.id,
      item.quantity + 1,
      item.size,
    );
  }}
    aria-label={`Decrease quantity of ${item.name}`}
    className="flex h-full w-11 items-center justify-center text-lg transition hover:bg-[#EFE5D0]"
  >
    −
  </button>

  <span className="flex h-full w-11 items-center justify-center border-x border-[#201C17]/10 text-sm">
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
    aria-label={`Increase quantity of ${item.name}`}
    className="flex h-full w-11 items-center justify-center text-lg transition hover:bg-[#EFE5D0]"
  >
    +
  </button>
</div>

{item.quantity >= item.stock && (
  <p className="text-[10px] tracking-[0.12em] text-[#A98216]">
    MAXIMUM AVAILABLE QUANTITY
  </p>
)}
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

            <div className="shrink-0 text-left sm:text-right">
  <p className="text-[10px] uppercase tracking-[0.15em] text-[#766D61]">
    Total
  </p>

  <p className="mt-2 text-sm font-medium text-[#201C17]">
    ₦{(item.price * item.quantity).toLocaleString()}
  </p>
</div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="h-fit border border-[#C9A227]/30 bg-white p-8 lg:sticky lg:top-8">
        <h2 className="font-serif text-2xl">
          Order Summary
        </h2>

        <div className="mt-7 space-y-4 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₦{cartTotal.toLocaleString()}</span>
          </div>

          <div className="flex items-start justify-between gap-6">
  <div>
    <p>Delivery</p>

    {cartTotal < 100000 && (
      <p className="mt-1 text-xs leading-5 text-[#766D61]">
        Free delivery on orders over ₦100,000
      </p>
    )}
  </div>

  <span className="shrink-0">
    {cartTotal >= 100000 ? "FREE" : "Calculated at checkout"}
  </span>
</div>

          <div className="border-t border-[#201C17]/10 pt-6">
  <div className="flex items-end justify-between">
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#766D61]">
        Order Total
      </p>

      <p className="mt-2 font-serif text-2xl text-[#201C17]">
        ₦{cartTotal.toLocaleString()}
      </p>
    </div>

    <span className="text-[10px] uppercase tracking-widest text-[#A98216]">
      NGN
    </span>
  </div>
</div>
        </div>

       <Link
  href="/checkout"
  className="mt-8 block w-full bg-[#201C17] py-5 text-center text-xs tracking-[0.2em] text-white transition hover:bg-[#A98216]"
>
  PROCEED TO CHECKOUT
</Link>

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