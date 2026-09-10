"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

function formatPrice(price: number) {
  return `₦${price.toLocaleString("en-NG")}`;
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { addToCart, cartCount } = useCart();

  const [product, setProduct] = useState<any | null>(null);
  const [productLoading, setProductLoading] = useState(true);
  const [productId, setProductId] = useState<number | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    params.then((value) => {
      setProductId(Number(value.id));
    });
  }, [params]);

  useEffect(() => {
    if (!productId) return;

    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = (data.products || []).find(
          (item: any) => item.id === productId,
        );

        setProduct(foundProduct || null);
        setProductLoading(false);
      })
      .catch(() => {
        setProductLoading(false);
      });
  }, [productId]);

  const productSizes =
    typeof product?.sizes === "string" && product.sizes.trim()
      ? product.sizes
          .split(",")
          .map((size: string) => size.trim())
          .filter(Boolean)
      : [];

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
  setQuantity((current) =>
    Math.min(Number(product?.stock || 0), current + 1),
  );
};

  if (productLoading || !productId) {
    return (
      <main className="min-h-screen bg-[#F8F3E7] flex items-center justify-center">
        <p className="text-[#201C17] tracking-[0.15em] text-sm">
          LOADING PRODUCT...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F8F3E7] flex flex-col items-center justify-center px-6">
        <p className="text-sm tracking-[0.2em] uppercase text-[#A98216] mb-4">
          Nuvistine Global
        </p>

        <h1 className="font-serif text-4xl text-[#201C17] mb-6">
          Product Not Found
        </h1>

        <Link
          href="/shop"
          className="bg-[#C9A227] text-white px-8 py-4 text-sm tracking-[0.15em] uppercase"
        >
          Back to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F3E7] text-[#201C17]">
      {/* Announcement Bar */}
      <div className="bg-[#201C17] text-white text-center text-xs tracking-[0.2em] py-3">
        FREE DELIVERY ON ORDERS OVER ₦100,000
      </div>

      {/* Header */}
      <header className="border-b border-[#C9A227]/20 bg-[#F8F3E7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl md:text-2xl tracking-[0.12em]"
          >
            NUVISTINE GLOBAL
          </Link>

          <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.18em]">
            <Link
              href="/"
              className="hover:text-[#A98216] transition"
            >
              HOME
            </Link>

            <Link href="/shop" className="text-[#A98216]">
              SHOP
            </Link>

            <Link
              href="/#collections"
              className="hover:text-[#A98216] transition"
            >
              COLLECTIONS
            </Link>

            <Link
              href="/#beauty"
              className="hover:text-[#A98216] transition"
            >
              BEAUTY
            </Link>

            <Link
              href="/#about"
              className="hover:text-[#A98216] transition"
            >
              ABOUT
            </Link>
          </nav>

          <div className="flex items-center gap-5">
            <button
              className="text-xl hover:text-[#A98216] transition"
              aria-label="Wishlist"
            >
              ♡
            </button>

            <Link
              href="/cart"
              aria-label="Shopping bag"
              className="relative text-xl hover:text-[#A98216] transition"
            >
              🛍

              {cartCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C9A227] px-1 text-[9px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <div className="text-xs tracking-[0.12em] text-gray-500">
          <Link href="/" className="hover:text-[#A98216]">
            HOME
          </Link>

          <span className="mx-3">/</span>

          <Link href="/shop" className="hover:text-[#A98216]">
            SHOP
          </Link>

          <span className="mx-3">/</span>

          <span>{product.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Product */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="bg-[#EFE5D0]">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.25em] uppercase text-[#A98216] mb-5">
              {product.category}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              {product.name}
            </h1>

            <p className="text-2xl mb-8">
              {formatPrice(Number(product.price))}
            </p>

            <div className="w-full h-px bg-[#C9A227]/20 mb-8" />

            <p className="text-gray-600 leading-8 max-w-xl mb-10">
              {product.description}
            </p>

            {/* Size */}
            {productSizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  <p className="text-xs tracking-[0.18em] uppercase">
                    Select Size
                  </p>

                  <button className="text-xs underline text-gray-500">
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {productSizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-12 border text-sm transition ${
                        selectedSize === size
                          ? "bg-[#201C17] text-white border-[#201C17]"
                          : "border-[#201C17]/20 hover:border-[#C9A227]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

         {/* Quantity */}
<div className="mb-8">
  <div className="mb-4 flex items-center justify-between gap-4">
    <p className="text-xs tracking-[0.18em] uppercase">
      Quantity
    </p>

    {Number(product.stock) === 0 ? (
      <span className="text-xs tracking-widest text-red-600">
        SOLD OUT
      </span>
    ) : Number(product.stock) <= 3 ? (
      <span className="text-xs tracking-widest text-[#A98216]">
        ONLY {product.stock} LEFT
      </span>
    ) : (
      <span className="text-xs tracking-widest text-[#6B6258]">
        {product.stock} IN STOCK
      </span>
    )}
  </div>

  <div className="flex items-center border border-[#201C17]/20 w-fit">
    <button
      onClick={decreaseQuantity}
      className="w-12 h-12 hover:bg-[#EFE5D0]"
    >
      −
    </button>

    <span className="w-12 text-center">{quantity}</span>

    <button
      onClick={increaseQuantity}
      className="w-12 h-12 hover:bg-[#EFE5D0]"
    >
      +
    </button>
  </div>
</div>

          {/* Buttons */}
<div className="flex gap-3">
 <button
  onClick={() => {
    if (Number(product.stock) === 0) {
      return;
    }

    if (quantity > Number(product.stock)) {
      alert("Sorry, there is not enough stock available.");
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        category: product.category,
        price: Number(product.price),
        image: product.image,
        size: selectedSize || undefined,
      },
      quantity,
    );

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  }}
  className={`flex-1 bg-[#C9A227] hover:bg-[#A98216] text-white py-5 text-xs tracking-[0.2em] uppercase transition ${
    Number(product.stock) === 0
      ? "cursor-not-allowed opacity-50"
      : ""
  }`}
>
  {Number(product.stock) === 0
    ? "SOLD OUT"
    : addedToCart
      ? "ADDED TO BAG ✓"
      : "ADD TO BAG"}
</button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-16 border transition text-xl ${
                  isWishlisted
                    ? "bg-[#201C17] text-white border-[#201C17]"
                    : "border-[#201C17]/20 hover:border-[#C9A227]"
                }`}
              >
                {isWishlisted ? "♥" : "♡"}
              </button>
            </div>

            {/* Product Info */}
            <div className="mt-10 border-t border-[#C9A227]/20">
              <div className="py-5 border-b border-[#C9A227]/20 flex justify-between">
                <span className="text-xs tracking-[0.15em] uppercase">
                  Delivery
                </span>

                <span className="text-sm text-gray-500">
                  Available nationwide
                </span>
              </div>

              <div className="py-5 border-b border-[#C9A227]/20 flex justify-between">
                <span className="text-xs tracking-[0.15em] uppercase">
                  Returns
                </span>

                <span className="text-sm text-gray-500">
                  Easy returns
                </span>
              </div>

              <div className="py-5 flex justify-between">
                <span className="text-xs tracking-[0.15em] uppercase">
                  Authenticity
                </span>

                <span className="text-sm text-gray-500">
                  Nuvistine quality guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#EFE5D0] py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#A98216] mb-4">
            Stay in the know
          </p>

          <h2 className="font-serif text-4xl mb-5">
            Join the Nuvistine List
          </h2>

          <p className="text-gray-600 mb-8">
            Be the first to discover new arrivals, exclusive edits and
            special offers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white px-5 py-4 outline-none border border-transparent focus:border-[#C9A227]"
            />

            <button className="bg-[#201C17] text-white px-8 py-4 text-xs tracking-[0.18em] uppercase">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#201C17] text-white px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-2xl tracking-[0.1em] mb-4">
              NUVISTINE GLOBAL
            </h3>

            <p className="text-white/60 text-sm leading-7">
              Curated fashion, beauty and accessories for the modern woman.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-5">
              Shop
            </h4>

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
            <h4 className="text-xs tracking-[0.2em] uppercase mb-5">
              Information
            </h4>

            <div className="space-y-3 text-sm text-white/60">
              <p>Delivery & Returns</p>
              <p>Contact Us</p>
              <p>Privacy Policy</p>
              <p>Terms & Conditions</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Nuvistine Global. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
