import { Doc } from "@automerge/automerge";
import { RepoValue } from "../contexts";
import { Chat } from "../types";

export const chatIdx = (doc: Doc<RepoValue> | undefined, chat: Chat) =>
  doc?.chats?.findIndex(({ id }) => chat?.id === id) ?? -1;
