import clientPromise from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Body", body);
  const { email, password } = body;

  const client = await clientPromise;
  const db = client.db("ecommerce_db");

  // ✅ Only check by email
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return new Response(
      JSON.stringify({ message: "User not found. Please register." }),
      {
        status: 404, // ✅ FIXED
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (user.password !== password) {
    return new Response(JSON.stringify({ message: "Invalid password!" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ✅ Login success
  return new Response(JSON.stringify({ message: "Login successful!" }), {
    status: 200, // ✅ FIXED
    headers: { "Content-Type": "application/json" },
  });
}
