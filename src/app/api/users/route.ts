import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ecommerce_db");
    const users = await db.collection("users").find({}).toArray();

    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { email, password } = body;

  // e.g. Insert new user into your DB
  const newUser = { email, password };

  const client = await clientPromise;
  const db = client.db("ecommerce_db");
  const checkUser = await db.collection("users").findOne({ email });
  if (checkUser) {
    return new Response(
      JSON.stringify({ message: "The user already exists!" }),
      {
        status: 409,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    await db.collection("users").insertOne(newUser);

    return new Response(
      JSON.stringify({ message: "You have successfully registered!" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
