"use client";

import Link from "next/link";
import { useCart } from "./context/CartContext";

const categories = [
  {
    name: "Fashion",
    description: "Timeless pieces for every occasion",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Shoes",
    description: "Step into effortless elegance",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Bags & Accessories",
    description: "The details that complete your look",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Beauty",
    description: "Beauty, care and self-expression",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
  },
];

const products = [
  {
    name: "The Classic Edit",
    category: "Fashion",
    price: "₦45,000",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Signature Shoulder Bag",
    category: "Bags & Accessories",
    price: "₦38,000",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "The Golden Heel",
    category: "Shoes",
    price: "₦52,000",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Beauty Essentials",
    category: "Beauty",
    price: "₦28,000",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Home() {
  const { cartCount } = useCart();
  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#201C17]">
      {/* Announcement Bar */}
      <div className="bg-[#201C17] px-4 py-2 text-center text-[11px] tracking-[0.2em] text-[#F8F3E7]">
        FREE DELIVERY ON ORDERS OVER ₦100,000
      </div>

      {/* Navigation */}
      <header className="border-b border-[#C9A227]/20 bg-[#F8F3E7]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Mobile Menu */}
          <button className="text-xl lg:hidden" aria-label="Open menu">
            ☰
          </button>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <a
              href="#"
              className="font-serif text-xl tracking-[0.18em] lg:text-2xl"
            >
              NUVISTINE
            </a>
            <div className="text-center text-[8px] tracking-[0.55em] text-[#A98216]">
              GLOBAL
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 text-xs tracking-[0.12em] lg:flex">
            <a href="#" className="transition hover:text-[#A98216]">
              HOME
            </a>
            <a href="/shop" className="transition hover:text-[#A98216]">
              SHOP
            </a>
            <a href="#collections" className="transition hover:text-[#A98216]">
              COLLECTIONS
            </a>
            <a href="#beauty" className="transition hover:text-[#A98216]">
              BEAUTY
            </a>
            <a href="#about" className="transition hover:text-[#A98216]">
              ABOUT
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 text-lg">
            <button aria-label="Search" className="hidden sm:block">
              ⌕
            </button>
           <Link
  href="/account"
  aria-label="Account"
  className="hidden sm:block transition hover:text-[#A98216]"
>
  ♡
</Link>
            <Link
  href="/cart"
  aria-label="Shopping bag"
  className="transition hover:text-[#A98216]"
>
  ♧
  {cartCount > 0 && (
    <span className="ml-1 text-xs align-top">
      ({cartCount})
    </span>
  )}
</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[680px] overflow-hidden bg-[#E8DDCA]">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90"
          alt="Nuvistine Global fashion collection"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 flex min-h-[680px] items-center justify-center px-6 text-center text-white">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs tracking-[0.5em]">
              NUVISTINE GLOBAL
            </p>

            <h1 className="font-serif text-5xl leading-tight sm:text-6xl lg:text-8xl">
              Elevate Your
              <br />
              Everyday
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 tracking-wide text-white/90 sm:text-base">
              Curated fashion, beauty and accessories for the modern woman.
            </p>

            <a
              href="#shop"
              className="mt-9 inline-block border border-[#E7C65B] bg-[#C9A227] px-9 py-4 text-xs font-medium tracking-[0.2em] text-white transition hover:bg-[#A98216]"
            >
              SHOP THE COLLECTION
            </a>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section id="collections" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs tracking-[0.35em] text-[#A98216]">
            DISCOVER
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl">
            Shop by Category
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <a
              href="#shop"
              key={category.name}
              className="group relative h-[470px] overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />

              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <h3 className="font-serif text-3xl">{category.name}</h3>
                <p className="mt-2 text-xs tracking-wide text-white/85">
                  {category.description}
                </p>
                <span className="mt-5 inline-block border-b border-[#E7C65B] pb-1 text-[10px] tracking-[0.2em]">
                  EXPLORE
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section id="shop" className="bg-[#EFE5D0] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 text-xs tracking-[0.35em] text-[#A98216]">
                JUST IN
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl">
                New Arrivals
              </h2>
            </div>

            <a
              href="#"
              className="hidden border-b border-[#C9A227] pb-1 text-xs tracking-[0.15em] sm:block"
            >
              VIEW ALL
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-6">
            {products.map((product, index) => (
  <article key={product.name} className="group">
    <div className="relative aspect-[3/4] overflow-hidden bg-white">
      
      {/* Clickable Product Image */}
      <a
        href={`/product/${index === 0 ? 1 : index === 1 ? 3 : index === 2 ? 5 : 7}`}
        className="block h-full w-full"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </a>

      {/* Wishlist */}
      <button
        aria-label={`Add ${product.name} to wishlist`}
        className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg"
      >
        ♡
      </button>

      {/* View Product */}
      <a
        href={`/product/${index === 0 ? 1 : index === 1 ? 3 : index === 2 ? 5 : 7}`}
        className="absolute bottom-0 left-0 right-0 z-10 translate-y-full bg-[#201C17] py-4 text-center text-[10px] tracking-[0.2em] text-white transition-transform duration-300 group-hover:translate-y-0"
      >
        VIEW PRODUCT
      </a>
    </div>

    {/* Product Information */}
    <a
      href={`/product/${index === 0 ? 1 : index === 1 ? 3 : index === 2 ? 5 : 7}`}
      className="block pt-4"
    >
      <p className="text-[10px] tracking-[0.15em] text-[#8B806E]">
        {product.category.toUpperCase()}
      </p>

      <h3 className="mt-1 font-serif text-lg">
        {product.name}
      </h3>

      <p className="mt-2 text-sm">
        {product.price}
      </p>
    </a>
  </article>
))}
          </div>
        </div>
      </section>

      {/* Nuvistine Edit */}
      <section className="mx-auto grid max-w-7xl items-center gap-0 px-6 py-24 lg:grid-cols-2 lg:px-10">
        <div className="h-[550px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1400&q=90"
            alt="The Nuvistine Edit"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex min-h-[550px] items-center bg-[#201C17] px-8 py-16 text-[#F8F3E7] sm:px-16">
          <div className="max-w-md">
            <p className="mb-5 text-xs tracking-[0.4em] text-[#D6B343]">
              THE NUVISTINE EDIT
            </p>

            <h2 className="font-serif text-5xl leading-tight sm:text-6xl">
              Timeless.
              <br />
              Refined.
              <br />
              Yours.
            </h2>

            <p className="mt-7 text-sm leading-7 text-white/70">
              Discover our carefully curated selection of pieces designed to
              bring effortless elegance into your everyday wardrobe and
              lifestyle.
            </p>

            <a
              href="#shop"
              className="mt-9 inline-block border border-[#C9A227] px-8 py-4 text-xs tracking-[0.2em] text-[#F8F3E7] transition hover:bg-[#C9A227]"
            >
              EXPLORE THE EDIT
            </a>
          </div>
        </div>
      </section>

      {/* Beauty */}
      <section id="beauty" className="relative min-h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=2200&q=90"
          alt="Beauty collection"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 flex min-h-[600px] items-center justify-center px-6 text-center text-white">
          <div>
            <p className="mb-5 text-xs tracking-[0.45em]">BEAUTY & SELF-CARE</p>

            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl">
              Your Beauty,
              <br />
              Your Ritual
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/90">
              Beauty essentials chosen to make every self-care moment feel
              special.
            </p>

            <a
              href="/shop"
              className="mt-8 inline-block bg-[#F8F3E7] px-9 py-4 text-xs tracking-[0.2em] text-[#201C17] transition hover:bg-[#C9A227] hover:text-white"
            >
              SHOP BEAUTY
            </a>
          </div>
        </div>
      </section>

      {/* Why Nuvistine */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs tracking-[0.35em] text-[#A98216]">
            THE NUVISTINE PROMISE
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl">
            Why Shop With Us
          </h2>
        </div>

        <div className="grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "CURATED QUALITY",
              text: "Thoughtfully selected pieces made to elevate your lifestyle.",
            },
            {
              title: "SECURE SHOPPING",
              text: "A simple and secure shopping experience from start to finish.",
            },
            {
              title: "RELIABLE DELIVERY",
              text: "Convenient delivery options designed around you.",
            },
            {
              title: "CUSTOMER CARE",
              text: "Dedicated support whenever you need assistance.",
            },
          ].map((item) => (
            <div key={item.title}>
              <div className="mx-auto mb-5 h-px w-10 bg-[#C9A227]" />
              <h3 className="text-xs tracking-[0.18em]">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[#766D61]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#EFE5D0] px-6 py-24 text-center">
        <p className="mb-4 text-xs tracking-[0.4em] text-[#A98216]">
          STAY CONNECTED
        </p>

        <h2 className="font-serif text-4xl sm:text-5xl">
          Join the Nuvistine World
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-[#766D61]">
          Be the first to discover new collections, exclusive offers and
          special releases.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 border border-[#C9A227]/40 bg-[#F8F3E7] px-5 py-4 text-sm outline-none placeholder:text-[#9A9184] focus:border-[#C9A227]"
          />
          <button className="bg-[#201C17] px-7 py-4 text-xs tracking-[0.2em] text-white transition hover:bg-[#A98216]">
            JOIN
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#201C17] px-6 py-16 text-[#F8F3E7] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="font-serif text-2xl tracking-[0.18em]">
                NUVISTINE
              </div>
              <div className="mt-1 text-[8px] tracking-[0.55em] text-[#D6B343]">
                GLOBAL
              </div>

              <p className="mt-6 max-w-xs text-sm leading-6 text-white/60">
                Curated fashion, beauty and lifestyle essentials for the modern
                woman.
              </p>
            </div>

            <div>
              <h3 className="mb-5 text-xs tracking-[0.2em]">SHOP</h3>
              <div className="space-y-3 text-sm text-white/60">
                <a href="#shop" className="block hover:text-white">
                  New Arrivals
                </a>
                <a href="/shop" className="block hover:text-white">
                  Fashion
                </a>
                <a href="/shop" className="block hover:text-white">
                  Shoes
                </a>
                <a href="#beauty" className="block hover:text-white">
                  Beauty
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-xs tracking-[0.2em]">HELP</h3>
              <div className="space-y-3 text-sm text-white/60">
                <a href="#" className="block hover:text-white">
                  Contact Us
                </a>
                <a href="#" className="block hover:text-white">
                  Shipping & Delivery
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
              <h3 className="mb-5 text-xs tracking-[0.2em]">FOLLOW</h3>
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

          <div className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-white/40">
            © 2026 Nuvistine Global. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}