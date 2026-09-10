import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import contractJson from "./contract.json" with { type: "json" };

const db = postgres({
  contractJson,
  url: process.env.DATABASE_URL!,
});

const products = [
  {
    id: 1,
    name: "The Classic Edit",
    category: "Fashion",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Silk Evening Dress",
    category: "Fashion",
    price: 68000,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Signature Shoulder Bag",
    category: "Bags & Accessories",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Classic Leather Bag",
    category: "Bags & Accessories",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "The Golden Heel",
    category: "Shoes",
    price: 52000,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Everyday Sandals",
    category: "Shoes",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Beauty Essentials",
    category: "Beauty",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "Radiance Skincare Set",
    category: "Beauty",
    price: 42000,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 9,
    name: "Elegant Mini Dress",
    category: "Fashion",
    price: 51000,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 10,
    name: "Gold Statement Earrings",
    category: "Bags & Accessories",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 11,
    name: "Luxury Heels",
    category: "Shoes",
    price: 62000,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 12,
    name: "Self-Care Collection",
    category: "Beauty",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
  },
];

async function main() {
  for (const product of products) {
    await db.orm.public.Product.create({
      ...product,
      description: "A curated Nuvistine Global piece.",
      stock: 10,
      sizes: null,
      isActive: true,
    });
  }

  console.log("12 products added successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });