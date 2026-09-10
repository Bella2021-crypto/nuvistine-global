
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const categories = [
  "All",
  "Fashion",
  "Shoes",
  "Bags & Accessories",
  "Beauty",
];

function formatPrice(price: number) {
  return `₦${price.toLocaleString("en-NG")}`;
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products || []);
        setProductsLoading(false);
      })
      .catch(() => {
        setProductsLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, search]);

  function toggleWishlist(id: number) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#201C17]">
      {/* Announcement */}
      <div className="bg-[#201C17] px-4 py-2 text-center text-[10px] tracking-[0.2em] text-[#F8F3E7]">
        FREE DELIVERY ON ORDERS OVER ₦100,000
      </div>

      {/* Header */}
      <header className="border-b border-[#C9A227]/20 bg-[#F8F3E7]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a
            href="/"
            className="font-serif text-xl tracking-[0.18em] lg:text-2xl"
          >
            NUVISTINE
            <span className="ml-2 text-[8px] tracking-[0.35em] text-[#A98216]">
              GLOBAL
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-xs tracking-[0.12em] lg:flex">
            <a href="/" className="hover:text-[#A98216]">
              HOME
            </a>
            <a href="/shop" className="text-[#A98216]">
              SHOP
            </a>
            <a href="/#collections" className="hover:text-[#A98216]">
              COLLECTIONS
            </a>
            <a href="/#beauty" className="hover:text-[#A98216]">
              BEAUTY
            </a>
            <a href="/#about" className="hover:text-[#A98216]">
              ABOUT
            </a>
          </nav>

          <div className="flex items-center gap-4 text-lg">
            <button aria-label="Wishlist">♡</button>
            <button aria-label="Account">♙</button>
            <button aria-label="Shopping bag">♧</button>
          </div>
        </div>
      </header>

      {/* Page heading */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-20 text-center lg:px-10">
        <p className="mb-4 text-xs tracking-[0.4em] text-[#A98216]">
          THE COLLECTION
        </p>

        <h1 className="font-serif text-5xl sm:text-6xl">
          Shop Nuvistine
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#766D61]">
          Discover carefully curated fashion, beauty and accessories designed
          to bring effortless elegance into your everyday.
        </p>
      </section>

      {/* Search */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-10 max-w-xl">
          <div className="flex items-center border-b border-[#201C17]/30 py-3">
            <span className="mr-3 text-lg">⌕</span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#9A9184]"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-[#766D61]"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex gap-3 overflow-x-auto pb-6 lg:justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap border px-5 py-3 text-[10px] tracking-[0.15em] transition ${
                selectedCategory === category
                  ? "border-[#201C17] bg-[#201C17] text-white"
                  : "border-[#C9A227]/40 hover:border-[#201C17]"
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-10">
        <div className="mb-8 flex items-center justify-between border-b border-[#201C17]/10 pb-5">
          <p className="text-xs tracking-[0.1em] text-[#766D61]">
            {productsLoading ? "LOADING" : filteredProducts.length}{" "}
            {!productsLoading &&
              (filteredProducts.length === 1 ? "PRODUCT" : "PRODUCTS")}
          </p>

          <button className="text-xs tracking-[0.1em] hover:text-[#A98216]">
            SORT BY ▾
          </button>
        </div>

        {productsLoading ? (
          <div className="py-24 text-center">
            <p className="text-sm tracking-widest text-[#766D61]">
              LOADING PRODUCTS...
            </p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#EFE5D0]">
                  {/* Clickable Product */}
                  <Link
                    href={`/product/${product.id}`}
                    className="block h-full w-full"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`${
                      wishlist.includes(product.id)
                        ? "Remove from"
                        : "Add to"
                    } wishlist`}
                    className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg transition ${
                      wishlist.includes(product.id)
                        ? "text-[#A98216]"
                        : "text-[#201C17]"
                    }`}
                  >
                    {wishlist.includes(product.id) ? "♥" : "♡"}
                  </button>

                  {/* View Product */}
                  <Link
                    href={`/product/${product.id}`}
                    className="absolute bottom-0 left-0 right-0 z-10 translate-y-full bg-[#201C17] py-4 text-center text-[10px] tracking-[0.2em] text-white transition-transform duration-300 group-hover:translate-y-0"
                  >
                    VIEW PRODUCT
                  </Link>
                </div>

                {/* Product Information */}
                <Link
                  href={`/product/${product.id}`}
                  className="block pt-4"
                >
                  <p className="text-[9px] tracking-[0.15em] text-[#8B806E]">
                    {product.category.toUpperCase()}
                  </p>

                  <h2 className="mt-1 font-serif text-lg">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm">
                    {formatPrice(product.price)}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h2 className="font-serif text-3xl">
              No products found
            </h2>

            <p className="mt-3 text-sm text-[#766D61]">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-7 bg-[#201C17] px-7 py-4 text-xs tracking-[0.15em] text-white"
            >
              VIEW ALL PRODUCTS
            </button>
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
                Curated fashion, beauty and lifestyle essentials for the
                modern woman.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-xs tracking-[0.2em]">SHOP</h3>

              <div className="space-y-3 text-sm text-white/60">
                <a href="/shop" className="block hover:text-white">
                  All Products
                </a>

                <a href="/shop" className="block hover:text-white">
                  Fashion
                </a>

                <a href="/shop" className="block hover:text-white">
                  Shoes
                </a>

                <a href="/shop" className="block hover:text-white">
                  Beauty
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs tracking-[0.2em]">HELP</h3>

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
              <h3 className="mb-4 text-xs tracking-[0.2em]">FOLLOW</h3>

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