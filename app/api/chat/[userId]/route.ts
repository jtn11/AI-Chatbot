import { getAdminDb } from "@/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userid: string }> }, // params is async in new nextjs version
) {
  try {
    const { userid } = await context.params; // ✅

    if (!userid) {
      return NextResponse.json({ error: "Missing UserId" }, { status: 400 });
    }

    const db = getAdminDb();

    const snapshot = await db
      .collection("users")
      .doc(userid)
      .collection("chats")
      .get();

    const chats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ chats });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 },
    );
  }
}
