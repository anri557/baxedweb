import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { readOrders } from "@/lib/order-store";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Sign in to view customer orders." }, { status: 401 });
  }

  try {
    const orders = await readOrders();
    return NextResponse.json(orders, {
      headers: { "Cache-Control": "no-store, private" },
    });
  } catch {
    return NextResponse.json({ error: "Could not load customer orders." }, { status: 500 });
  }
}
