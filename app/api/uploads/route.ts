import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const filePath = path.join(uploadDir, file.name);
  fs.writeFileSync(filePath, buffer);

  // await fetch("http://localhost:3000/ingest" , {
  //     method : "POST" ,
  //     headers : {"Content-Type" :  "application/json"} ,
  //     body : JSON.stringify({filePath})
  // })

  return NextResponse.json({ sucess: true });
}
