import { Doc } from "@automerge/automerge";
import { RepoValue } from "../contexts";
import { Chat } from "../types";

export const chatIdx = (doc: Doc<RepoValue>, chat: Chat) =>
  doc.chats.indexOf(chat);
