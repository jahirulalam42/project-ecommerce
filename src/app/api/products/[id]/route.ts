import clientPromise from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const client = await clientPromise;
    const db = client.db("ecommerce_db");
    const products = await db
      .collection("products")
      .findOne({ id: parseInt(id, 10) });

    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
