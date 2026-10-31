import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { hasAdminSession, isSameOriginRequest } from "@/lib/admin-auth";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const UPLOAD_DIRECTORY = path.join(process.cwd(), "public", "product-uploads");

const IMAGE_FORMATS = [
  {
    mime: "image/jpeg",
    extension: "jpg",
    matches: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  },
  {
    mime: "image/png",
    extension: "png",
    matches: (bytes) => bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  },
  {
    mime: "image/webp",
    extension: "webp",
    matches: (bytes) => bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP",
  },
];

export async function POST(request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Sign in to upload product images." }, { status: 401 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Choose an image file to upload." }, { status: 400 });
  }

  const file = formData.get("image");
  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ error: "Choose an image file to upload." }, { status: 400 });
  }
  if (file.size < 1 || file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "Image must be smaller than 8 MB." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const imageFormat = IMAGE_FORMATS.find((format) => format.mime === file.type && format.matches(bytes));
  if (!imageFormat) {
    return NextResponse.json({ error: "Use a valid JPEG, PNG, or WebP image." }, { status: 400 });
  }

  const fileName = `${randomUUID()}.${imageFormat.extension}`;
  try {
    await mkdir(UPLOAD_DIRECTORY, { recursive: true });
    await writeFile(path.join(UPLOAD_DIRECTORY, fileName), bytes, { flag: "wx" });
  } catch {
    return NextResponse.json({ error: "Could not save this image on the server." }, { status: 500 });
  }

  return NextResponse.json({ image: `/product-uploads/${fileName}` }, { status: 201 });
}
