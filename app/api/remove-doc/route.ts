import { getAdminDb } from "@/firebase/firebase-admin";
import { serverTimestamp } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req : NextRequest){

    const db = getAdminDb();
    
    const {userid , currentChatId} = await req.json(); 
    await db
    .collection("users")
    .doc(userid)
    .collection("chats")
    .doc(currentChatId)
    .update({
        activeDocumentName : null , 
        storedFileName : null , 
        isRagActive : null , 
        updatedAt : serverTimestamp()
    })

    return NextResponse.json({success : true , message : "Removed file successfully"})
}