import { getAdminDb } from "@/firebase/firebase-admin";
import {serverTimestamp } from "firebase/database";


const db = getAdminDb() ; 
export async function createChat(userId: string) {
  const chatRef = await db
    .collection("users")
    .doc(userId)
    .collection("chats")
    .add({
      title: "New Chat",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isRagActive: false,
      activeDocumentName: null,
    });

  return chatRef.id;
}

export async function saveMessage(
  userId: string,
  chatId: string,
  text: string,
  sender: "user" | "bot"
) {
  await db
    .collection("users")
    .doc(userId)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add({
      text,
      sender,
      createdAt: serverTimestamp(),
    });

  // update chat updatedAt
  await db
    .collection("users")
    .doc(userId)
    .collection("chats")
    .doc(chatId)
    .update({
      updatedAt: serverTimestamp(),
    });
}
