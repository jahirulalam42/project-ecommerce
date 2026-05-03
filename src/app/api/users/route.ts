import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Basic validation
  if (!email || !password || password.length < 8) {
    return NextResponse.json(
      { message: "Invalid input – password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("ecommerce_db");
  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  return NextResponse.json(
    { message: "Successfully registered!" },
    { status: 201 }
  );
}
