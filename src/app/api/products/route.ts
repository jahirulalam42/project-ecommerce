import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ecommerce_db");
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();

  const client = await clientPromise;
  const db = client.db("ecommerce_db");

  await db.collection("products").insertMany(body);

  return new Response(
    JSON.stringify({ message: "You have successfully entered the products" }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
