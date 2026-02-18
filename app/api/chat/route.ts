import { createChat, getChatById, saveMessage } from "@/app/lib/chat-service";
import { GenerateBotResponse } from "@/app/lib/generate-bot-response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, chatId, message } = await req.json();

    if (!userId || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    let finalChatId = chatId;

    if (!finalChatId) {
      finalChatId = await createChat(userId);
    }

    await saveMessage(userId, finalChatId, message, "user");

    const chatDoc = await getChatById(userId, finalChatId);
    const isRagActive = chatDoc?.isRagActive ?? false;
    const pdfUploaded = chatDoc?.activeDocumentName ? true : false;

    const botResponse = await GenerateBotResponse(message , isRagActive , pdfUploaded);
    await saveMessage(userId, finalChatId, botResponse, "bot");


    return NextResponse.json({
      success: true,
      chatId: finalChatId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
