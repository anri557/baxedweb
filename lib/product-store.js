import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIRECTORY = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIRECTORY, "products.json");
let writeQueue = Promise.resolve();

export async function readProducts() {
  try {
    const contents = await readFile(PRODUCTS_FILE, "utf8");
    const products = JSON.parse(contents);
    return Array.isArray(products) ? products : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function updateProducts(mutator) {
  const operation = writeQueue.then(async () => {
    const products = await readProducts();
    const result = await mutator(products);
    if (!Array.isArray(result.products)) {
      throw new Error("Product update must return a products array.");
    }

    await mkdir(DATA_DIRECTORY, { recursive: true });
    const temporaryFile = `${PRODUCTS_FILE}.${process.pid}.tmp`;
    await writeFile(temporaryFile, `${JSON.stringify(result.products, null, 2)}\n`, "utf8");
    await rename(temporaryFile, PRODUCTS_FILE);
    return result;
  });

  writeQueue = operation.then(() => undefined, () => undefined);
  return operation;
}

export function createProductRecord(input, id) {
  const name = String(input.name || "").trim();
  const slug = String(input.slug || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const category = String(input.category || "").trim().toLowerCase();
  const sub = String(input.sub || "All").trim();
  const description = String(input.description || "").trim();
  const price = Number(input.price);
  const image = String(input.image || "").trim();
  const tag = input.tag !== undefined ? String(input.tag).trim().slice(0, 30) : "NEW";
  const inStock = input.inStock !== false;

  if (!name || name.length > 100) throw new Error("Product name is required and must be 100 characters or fewer.");
  if (!slug || slug.length > 100) throw new Error("Enter a valid product URL slug.");
  if (!["tops", "bottoms", "outerwear"].includes(category)) throw new Error("Choose Tops, Bottoms, or Outerwear.");
  if (!sub || sub.length > 80) throw new Error("Enter a category or collection name (80 characters max).");
  if (!description || description.length > 2000) throw new Error("Description is required and must be 2,000 characters or fewer.");
  if (!Number.isFinite(price) || price < 0 || price > 100000) throw new Error("Enter a valid price.");
  if (!image.startsWith("/") || image.startsWith("//") || image.includes("..")) {
    throw new Error("Use an image path from the public folder, such as /product-photo.jpg.");
  }

  return {
    id,
    slug,
    name,
    sub,
    description,
    price: Number(price.toFixed(2)),
    rating: Number(input.rating) || 5,
    reviews: Number(input.reviews) || 0,
    tag: tag || "NEW",
    image,
    category,
    inStock,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function prepareProductUpdate(input, existingProduct) {
  const name = input.name !== undefined ? String(input.name).trim() : existingProduct.name;
  const slug = input.slug !== undefined
    ? String(input.slug).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : existingProduct.slug;
  const category = input.category !== undefined ? String(input.category).trim().toLowerCase() : existingProduct.category;
  const sub = input.sub !== undefined ? String(input.sub).trim() : existingProduct.sub;
  const description = input.description !== undefined ? String(input.description).trim() : existingProduct.description;
  const price = input.price !== undefined ? Number(input.price) : existingProduct.price;
  const image = input.image !== undefined ? String(input.image).trim() : existingProduct.image;
  const tag = input.tag !== undefined ? String(input.tag).trim().slice(0, 30) : (existingProduct.tag || "NEW");
  const inStock = input.inStock !== undefined ? Boolean(input.inStock) : (existingProduct.inStock !== false);

  if (!name || name.length > 100) throw new Error("Product name is required and must be 100 characters or fewer.");
  if (!slug || slug.length > 100) throw new Error("Enter a valid product URL slug.");
  if (!["tops", "bottoms", "outerwear"].includes(category)) throw new Error("Choose Tops, Bottoms, or Outerwear.");
  if (!sub || sub.length > 80) throw new Error("Enter a category or collection name (80 characters max).");
  if (!description || description.length > 2000) throw new Error("Description is required and must be 2,000 characters or fewer.");
  if (!Number.isFinite(price) || price < 0 || price > 100000) throw new Error("Enter a valid price.");
  if (!image.startsWith("/") || image.startsWith("//") || image.includes("..")) {
    throw new Error("Use an image path from the public folder, such as /product-photo.jpg.");
  }

  return {
    ...existingProduct,
    name,
    slug,
    category,
    sub,
    description,
    price: Number(price.toFixed(2)),
    tag,
    image,
    inStock,
    updatedAt: new Date().toISOString(),
  };
}
