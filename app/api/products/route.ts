import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const products = await db.orm.public.Product.all();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("PRODUCTS API ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to load products.",
      },
      { status: 500 },
    );
  }
}