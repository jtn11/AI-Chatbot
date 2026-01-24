import fs from "fs";
import path from "path";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  const safeName = `${crypto.randomUUID()}.pdf`;
  const filePath = path.resolve(uploadDir, safeName);

  fs.writeFileSync(filePath, buffer);

  await fetch("http://localhost:8000/ingest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filePath }),
  });

  return NextResponse.json({ success: true });
}
