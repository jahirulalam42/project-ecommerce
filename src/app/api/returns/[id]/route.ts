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
    const returns = await db
      .collection("returns")
      .find({ orderId: id })
      .toArray();

    return NextResponse.json(returns);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch return" },
      { status: 500 }
    );
  }
}
