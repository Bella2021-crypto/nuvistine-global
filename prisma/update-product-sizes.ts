import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import contractJson from "./contract.json" with { type: "json" };

const db = postgres({
  contractJson,
  url: process.env.DATABASE_URL!,
});

async function main() {
  await db.orm.public.Product
    .where({ id: 1 })
    .update({ sizes: "XS,S,M,L,XL" });

  await db.orm.public.Product
    .where({ id: 2 })
    .update({ sizes: "XS,S,M,L,XL" });

  await db.orm.public.Product
    .where({ id: 5 })
    .update({ sizes: "36,37,38,39,40,41" });

  await db.orm.public.Product
    .where({ id: 6 })
    .update({ sizes: "36,37,38,39,40,41" });

  await db.orm.public.Product
    .where({ id: 9 })
    .update({ sizes: "XS,S,M,L,XL" });

  await db.orm.public.Product
    .where({ id: 11 })
    .update({ sizes: "36,37,38,39,40,41" });

  console.log("Product sizes updated successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });