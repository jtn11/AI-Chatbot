import { getAdminAuth, getAdminDb } from "@/firebase/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { idToken, username } = await req.json();
    if (!idToken) {
      return NextResponse.json({ message: "No token" }, { status: 400 });
    }

    const adminAuth = getAdminAuth();
    const adminDb = getAdminDb();

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const email = decoded.email;

    await adminDb.collection("users").doc(uid).set(
      {
        uid: decoded.uid,
        email: decoded.email,
        username: username,
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    return NextResponse.json({
      success: true,
      uid: uid,
      email: email,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Signup failed" },
      { status: 500 },
    );
  }
}
