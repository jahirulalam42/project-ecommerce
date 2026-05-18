import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { message: "Search query is required." },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("ecommerce_db");

    // Case‑insensitive regex search on product name
    const regex = new RegExp(query.trim(), "i");

    // For dropdown suggestions we only need a few fields
    const products = await db
      .collection("products")
      .find(
        { name: { $regex: regex } },
        {
          projection: {
            _id: 1,
            id: 1,
            name: 1,
            images: { $slice: 1 },
          },
        }
      )
      .limit(5)
      .toArray();

    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
