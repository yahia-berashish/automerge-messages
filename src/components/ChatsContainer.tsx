import React from "react";
import { useDoc } from "../hooks/useDoc";
import { ChatContainer } from "./ChatContainer";

export const ChatsContainer: React.FC = () => {
  const { doc } = useDoc();
  return (
    <div className="flex gap-8 flex-wrap justify-center">
      {(doc?.chats || []).map((chat) => (
        <ChatContainer key={`chat-container-${chat.name}`} chat={chat} />
      ))}
    </div>
  );
};
