import { v4 as uuid } from "uuid";

export type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export type UploadedDoc = {
  id: string;
  name: string;
  filePath: string;
  uploadedAt: Date;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  documents: UploadedDoc[];
  vectorNamespace: string;
};

export function createChat(title: string): Chat {
  return {
    id: uuid(),
    title,
    messages: [],
    createdAt: new Date(),
    documents: [],
    vectorNamespace: uuid(),
  };
}
