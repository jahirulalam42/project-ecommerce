import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ecommerce_db");
    const orders = await db.collection("orders").find({}).toArray();

    return NextResponse.json(orders);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();

  const client = await clientPromise;
  const db = client.db("ecommerce_db");

  await db.collection("orders").insertOne(body);

  return new Response(
    JSON.stringify({ message: "You have successfully entered the orders" }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
