import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isSameOriginRequest } from "@/lib/admin-auth";
import { addOrder, createOrderRecord } from "@/lib/order-store";

export async function POST(request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid order data." }, { status: 400 });
  }

  try {
    const order = createOrderRecord(input, randomUUID());
    await addOrder(order);
    return NextResponse.json({ orderNumber: order.orderNumber }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Could not save your order." }, { status: 400 });
  }
}
