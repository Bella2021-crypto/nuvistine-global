"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

const products = [
  {
    id: 1,
    name: "The Classic Edit",
    category: "Fashion",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
    description:
      "A timeless wardrobe essential designed for effortless elegance. The Classic Edit combines sophisticated style with everyday versatility.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Silk Evening Dress",
    category: "Fashion",
    price: 68000,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
    description:
      "An elegant evening silhouette crafted for special occasions. Refined, feminine and effortlessly sophisticated.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Signature Shoulder Bag",
    category: "Bags & Accessories",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
    description:
      "A polished everyday shoulder bag that adds a refined finishing touch to any outfit.",
    sizes: [],
  },
  {
    id: 4,
    name: "Classic Leather Bag",
    category: "Bags & Accessories",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85",
    description:
      "A structured classic designed for women who appreciate understated luxury and timeless accessories.",
    sizes: [],
  },
  {
    id: 5,
    name: "The Golden Heel",
    category: "Shoes",
    price: 52000,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85",
    description:
      "A statement heel designed to elevate your occasionwear with a touch of modern glamour.",
    sizes: ["36", "37", "38", "39", "40", "41"],
  },
  {
    id: 6,
    name: "Everyday Sandals",
    category: "Shoes",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=1200&q=85",
    description:
      "Comfortable, versatile sandals made for effortless everyday styling.",
    sizes: ["36", "37", "38", "39", "40", "41"],
  },
  {
    id: 7,
    name: "Beauty Essentials",
    category: "Beauty",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1200&q=85",
    description:
      "A carefully selected collection of beauty essentials designed to simplify your daily routine.",
    sizes: [],
  },
  {
    id: 8,
    name: "Radiance Skincare Set",
    category: "Beauty",
    price: 42000,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=85",
    description:
      "A nourishing skincare collection created to leave your skin feeling fresh, hydrated and radiant.",
    sizes: [],
  },
  {
    id: 9,
    name: "Elegant Mini Dress",
    category: "Fashion",
    price: 51000,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    description:
      "A sophisticated mini dress with a flattering silhouette, perfect for dinner dates and special occasions.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 10,
    name: "Gold Statement Earrings",
    category: "Bags & Accessories",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85",
    description:
      "Elegant statement earrings designed to bring a subtle touch of glamour to your look.",
    sizes: [],
  },
  {
    id: 11,
    name: "Luxury Heels",
    category: "Shoes",
    price: 62000,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
    description:
      "Sophisticated heels designed to make an unforgettable impression.",
    sizes: ["36", "37", "38", "39", "40", "41"],
  },
  {
    id: 12,
    name: "Self-Care Collection",
    category: "Beauty",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85",
    description:
      "A thoughtful self-care collection for creating moments of calm, comfort and indulgence.",
    sizes: [],
  },
];

const formatPrice = (price: number) =>
  `₦${price.toLocaleString("en-NG")}`;

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
      const { addToCart, cartCount } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useState(() => {
    params.then((value) => {
      setProductId(Number(value.id));
    });
  });

  const product = products.find((item) => item.id === productId);

  if (!productId) {
    return (
      <main className="min-h-screen bg-[#F8F3E7] flex items-center justify-center">
        <p className="text-[#201C17]">Loading...</p>
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

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

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
            <Link href="/" className="hover:text-[#A98216] transition">
              HOME
            </Link>
            <Link href="/shop" className="text-[#A98216]">
              SHOP
            </Link>
            <Link href="/#collections" className="hover:text-[#A98216] transition">
              COLLECTIONS
            </Link>
            <Link href="/#beauty" className="hover:text-[#A98216] transition">
              BEAUTY
            </Link>
            <Link href="/#about" className="hover:text-[#A98216] transition">
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
              {formatPrice(product.price)}
            </p>

            <div className="w-full h-px bg-[#C9A227]/20 mb-8" />

            <p className="text-gray-600 leading-8 max-w-xl mb-10">
              {product.description}
            </p>

            {/* Size */}
            {product.sizes.length > 0 && (
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
                  {product.sizes.map((size) => (
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
              <p className="text-xs tracking-[0.18em] uppercase mb-4">
                Quantity
              </p>

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
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size before adding this item to your bag.");
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
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
  className="flex-1 bg-[#C9A227] hover:bg-[#A98216] text-white py-5 text-xs tracking-[0.2em] uppercase transition"
>
  {addedToCart ? "ADDED TO BAG ✓" : "ADD TO BAG"}
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