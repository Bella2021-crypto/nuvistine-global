import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/auth";

export async function GET() {
  try {
    const customer = await getCurrentCustomer();

    if (!customer) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      },
    });
  } catch (error) {
    console.error("AUTH CHECK ERROR:", error);

    return NextResponse.json(
      { error: "Unable to verify authentication." },
      { status: 500 },
    );
  }
}