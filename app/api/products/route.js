import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { hasAdminSession, isSameOriginRequest } from "@/lib/admin-auth";
import { createProductRecord, prepareProductUpdate, readProducts, updateProducts } from "@/lib/product-store";

export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Could not load products." }, { status: 500 });
  }
}

export async function POST(request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Sign in to manage products." }, { status: 401 });
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid product data." }, { status: 400 });
  }

  try {
    const createdProduct = createProductRecord(input, randomUUID());
    const result = await updateProducts((products) => {
      if (products.length >= 200) throw new Error("This no-database catalog supports up to 200 products.");
      if (products.some((product) => product.slug === createdProduct.slug)) {
        throw new Error("That product URL slug is already in use.");
      }
      return { products: [...products, createdProduct], product: createdProduct };
    });

    return NextResponse.json(result.product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Could not save product." }, { status: 400 });
  }
}

export async function PUT(request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Sign in to manage products." }, { status: 401 });
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid product data." }, { status: 400 });
  }

  const { id } = input || {};
  if (!id) {
    return NextResponse.json({ error: "Product ID is required for updating." }, { status: 400 });
  }

  try {
    const result = await updateProducts((products) => {
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error("Product not found.");
      }
      const existingProduct = products[index];
      const updatedProduct = prepareProductUpdate(input, existingProduct);

      if (products.some((product) => product.id !== id && product.slug === updatedProduct.slug)) {
        throw new Error("That product URL slug is already in use by another product.");
      }

      const nextProducts = [...products];
      nextProducts[index] = updatedProduct;
      return { products: nextProducts, product: updatedProduct };
    });

    return NextResponse.json(result.product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Could not update product." }, { status: 400 });
  }
}

export async function DELETE(request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Sign in to manage products." }, { status: 401 });
  }

  const productId = new URL(request.url).searchParams.get("id");
  if (!productId) {
    return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
  }

  try {
    const result = await updateProducts((products) => {
      const remaining = products.filter((product) => product.id !== productId);
      if (remaining.length === products.length) throw new Error("Product not found.");
      return { products: remaining };
    });
    return NextResponse.json({ deleted: true, count: result.products.length });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Could not delete product." }, { status: 404 });
  }
}
