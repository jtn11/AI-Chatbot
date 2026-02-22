import { createChat, getChatById, saveMessage } from "@/app/lib/chat-service";
import { GenerateBotResponse } from "@/app/lib/generate-bot-response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userid, chatid, message } = await req.json();

    console.log({
      userid,
      chatid,
      message,
    });

    if (!userid || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    let finalChatId = chatid;

    if (!finalChatId) {
      finalChatId = await createChat(userid);
    }

    await saveMessage(userid, finalChatId, message, "user");

    const chatDoc = await getChatById(userid, finalChatId);
    const isRagActive = chatDoc?.isRagActive ?? false;
    const pdfUploaded = chatDoc?.activeDocumentName ? true : false;

    console.log(
      { activeDocname: chatDoc?.activeDocumentName },
      { isRagActive: isRagActive },
      { pdfUploaded: pdfUploaded },
    );

    let botResponse;
    try {
      botResponse = await GenerateBotResponse(
        message,
        isRagActive,
        pdfUploaded,
        userid,
        finalChatId,
      );
    } catch (error) {
      botResponse = "Sorry, something went wrong. Please try again.";
    }

    await saveMessage(userid, finalChatId, botResponse, "bot");

    return NextResponse.json({
      success: true,
      chatId: finalChatId,
      reply: botResponse,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
