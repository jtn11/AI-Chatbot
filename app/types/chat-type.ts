// types/chat-type.ts

export type ChatMeta = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  isRagActive: boolean;
  activeDocumentName: string | null;
};

export type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  createdAt: Date;
};
