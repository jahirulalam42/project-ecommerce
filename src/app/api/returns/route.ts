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
    const db = client.db();

    const body = await req.json();
    const { orderId, items, type, reason, notes } = body;

    // 2. Basic validation
    // if (
    //   !orderId ||
    //   !items ||
    //   !Array.isArray(items) ||
    //   items.length === 0 ||
    //   !type ||
    //   !reason
    // ) {
    //   return NextResponse.json(
    //     {
    //       message:
    //         "Missing required fields. Order ID, items, type, and reason are required.",
    //     },
    //     { status: 400 }
    //   );
    // }

    if (!["refund", "exchange"].includes(type)) {
      return NextResponse.json(
        { message: "Invalid return type. Must be 'refund' or 'exchange'." },
        { status: 400 }
      );
    }

    // 3. Convert orderId to ObjectId
    // let orderObjectId: ObjectId;
    // try {
    //   orderObjectId = new ObjectId(orderId);
    // } catch {
    //   return NextResponse.json(
    //     { message: "Invalid order ID format." },
    //     { status: 400 }
    //   );
    // }

    const ordersCollection = db.collection("orders");

    // 4. Find the order and verify ownership
    const order = await ordersCollection.findOne({
      orderId: orderId,
      //   userId: session.user.id, // string comparison – ensure userId is stored as string
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    if (order.status !== "delivered") {
      return NextResponse.json(
        { message: "Returns can only be requested for delivered orders." },
        { status: 400 }
      );
    }

    // 5. Verify all requested items exist in the order
    const orderItemIds = order.items.map((item: any) => item._id.toString());
    const invalidItems = items.filter(
      (itemId: string) => !orderItemIds.includes(itemId)
    );

    if (invalidItems.length > 0) {
      return NextResponse.json(
        { message: "One or more items do not belong to this order." },
        { status: 400 }
      );
    }

    // 6. Build the return document
    // const returnItems = items.map((itemId: string) => {
    //   const orderItem = order.items.find(
    //     (i: any) => i._id.toString() === itemId
    //   );
    //   return {
    //     productId: orderItem.productId,
    //     name: orderItem.name,
    //     price: orderItem.discountPrice || orderItem.price,
    //     reason,
    //     itemId: orderItem._id,
    //   };
    // });

    const returnDoc = {
      userId: session.user.id,
      orderId: orderId,
      items: "test",
      type,
      reason,
      notes: notes || "",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 7. Insert into `returns` collection
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
