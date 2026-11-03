import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIRECTORY = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIRECTORY, "orders.json");
let orderWriteQueue = Promise.resolve();

export async function readOrders() {
  try {
    const contents = await readFile(ORDERS_FILE, "utf8");
    const orders = JSON.parse(contents);
    return Array.isArray(orders) ? orders : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function addOrder(order) {
  const operation = orderWriteQueue.then(async () => {
    const orders = await readOrders();
    await mkdir(DATA_DIRECTORY, { recursive: true });
    const temporaryFile = `${ORDERS_FILE}.${process.pid}.tmp`;
    await writeFile(temporaryFile, `${JSON.stringify([order, ...orders], null, 2)}\n`, "utf8");
    await rename(temporaryFile, ORDERS_FILE);
    return order;
  });

  orderWriteQueue = operation.then(() => undefined, () => undefined);
  return operation;
}

function requiredText(value, label, maxLength) {
  const text = String(value || "").trim();
  if (!text || text.length > maxLength) {
    throw new Error(`${label} is required and must be ${maxLength} characters or fewer.`);
  }
  return text;
}

function optionalText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

export function createOrderRecord(input, id) {
  const orderInput = input && typeof input === "object" ? input : {};
  const customerInput = orderInput.customer && typeof orderInput.customer === "object"
    ? orderInput.customer
    : {};
  const firstName = requiredText(customerInput.firstName, "First name", 80);
  const lastName = requiredText(customerInput.lastName, "Last name", 80);
  const email = requiredText(customerInput.email, "Email", 254).toLowerCase();
  const phone = requiredText(customerInput.phone, "Phone number", 32);
  const address = requiredText(customerInput.address, "Address", 180);
  const city = requiredText(customerInput.city, "City", 80);
  const country = requiredText(customerInput.country, "Country", 80);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Enter a valid email address.");
  }
  if (phone.length < 7) throw new Error("Enter a valid phone number.");

  if (!Array.isArray(orderInput.items) || orderInput.items.length === 0 || orderInput.items.length > 50) {
    throw new Error("The order must contain between 1 and 50 items.");
  }

  const items = orderInput.items.map((item) => {
    const name = requiredText(item?.name, "Product name", 120);
    const price = Number(item?.price);
    const quantity = Number(item?.quantity);
    if (!Number.isFinite(price) || price < 0 || price > 100000) {
      throw new Error("An order item has an invalid price.");
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
      throw new Error("An order item has an invalid quantity.");
    }
    return {
      id: optionalText(item?.id, 100),
      name,
      subtitle: optionalText(item?.subtitle, 160),
      image: optionalText(item?.image, 500),
      price: Number(price.toFixed(2)),
      quantity,
    };
  });

  const subtotal = Number(items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
  const discountCode = optionalText(orderInput.discountCode, 32).toUpperCase();
  const discountRates = { TBILISI: 0.2, TBILISI20: 0.2, BAXED10: 0.1 };
  const discountRate = discountRates[discountCode] || 0;
  if (discountCode && !discountRate) throw new Error("The discount code is not valid.");
  const discount = Number((subtotal * discountRate).toFixed(2));
  const total = Number((subtotal - discount).toFixed(2));
  const paymentMethod = orderInput.paymentMethod === "cod" ? "Cash on Delivery" : "Credit card";
  const orderNumber = `BX-${id.slice(0, 8).toUpperCase()}`;

  return {
    id,
    orderNumber,
    createdAt: new Date().toISOString(),
    status: "Pending",
    paymentMethod,
    customer: {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      phone,
      address,
      apartment: optionalText(customerInput.apartment, 100),
      city,
      postalCode: optionalText(customerInput.postalCode, 24),
      country,
    },
    items,
    subtotal,
    discount,
    total,
    currency: "GEL",
  };
}
