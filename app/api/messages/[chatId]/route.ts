import { useAuth } from "@/app/context/authcontext";
import { getAdminDb } from "@/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest , {params} : {params:{chatId:string}}) {

    const {chatId} = params ; 
    const {userid} = useAuth();
    const db = getAdminDb(); 

    if (!chatId || !userid) {
    return new Response("Unauthorized", { status: 401 });
  }

    const messagesSnapshot = await db
    .collection("users")
    .doc(userid)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .orderBy("createdAt", "asc")
    .get();

    const messages = messagesSnapshot.docs.map((doc)=>({
        id : doc.id, 
        ...doc.data(),
    }))

    return NextResponse.json({messages})

} 