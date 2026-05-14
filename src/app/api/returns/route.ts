import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ecommerce_db");

    const body = await req.json();
    const { orderId, items, type, reason, notes } = body;

    // 1. Basic validation (uncommented and improved)
    if (
      !orderId ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !type ||
      !reason
    ) {
      return NextResponse.json(
        {
          message:
            "Missing required fields. Order ID, items, type, and reason are required.",
        },
        { status: 400 }
      );
    }

    // 2. Validate return type
    if (!["refund", "exchange"].includes(type)) {
      return NextResponse.json(
        { message: "Invalid return type. Must be 'refund' or 'exchange'." },
        { status: 400 }
      );
    }

    const ordersCollection = db.collection("orders");

    // 3. Find the order using the string orderId field
    const order = await ordersCollection.findOne({
      orderId: orderId,
      userId: session.user.id,
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found or does not belong to you." },
        { status: 404 }
      );
    }

    // 4. Check order status
    if (order.status !== "delivered") {
      return NextResponse.json(
        { message: "Returns can only be requested for delivered orders." },
        { status: 400 }
      );
    }

    // 5. Verify all requested items exist in the order
    //    Order items have an `_id` field (string, e.g., "69f715d5d9edfbdc17690d42")
    const orderItemIds = order.items.map((item: any) => item._id);
    const invalidItems = items.filter(
      (itemId: string) => !orderItemIds.includes(itemId)
    );

    if (invalidItems.length > 0) {
      return NextResponse.json(
        { message: "One or more items do not belong to this order." },
        { status: 400 }
      );
    }

    // 6. Build the return items array with full product info
    const returnItems = items.map((itemId: string) => {
      const orderItem = order.items.find((i: any) => i._id === itemId);
      return {
        productId: orderItem.id, // your numeric product id (field "id")
        name: orderItem.name,
        price: orderItem.discountPrice || orderItem.price,
        reason: reason,
        itemId: orderItem._id, // original item _id from order
        quantity: orderItem.quantity, // optional, good to store
        size: orderItem.size, // if applicable
      };
    });

    // 7. Prepare the return document
    const returnDoc = {
      userId: session.user.id,
      orderId: orderId,
      items: returnItems, // now an array, not "test"
      type,
      reason,
      notes: notes || "",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 8. Insert into `returns` collection
    const returnsCollection = db.collection("returns");
    const result = await returnsCollection.insertOne(returnDoc);

    return NextResponse.json(
      {
        message: "Return request submitted successfully.",
        returnId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing return request:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
