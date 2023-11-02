import React, { createContext } from "react";
import { Chat } from "../types";

export interface ChatContextInterface {
  send: (messageContent: string) => void;
  currentReply: number | undefined;
  setCurrentReply: React.Dispatch<React.SetStateAction<number | undefined>>;
  chat: Chat;
  mentions: string[];
  setMentions: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ChatContext = createContext<ChatContextInterface>(
  {} as ChatContextInterface
);
