import React from "react";
import { ChatContainer } from "../components";
import { useDoc } from "../hooks/useDoc";
import { useParams } from "react-router-dom";

export const ChatPage: React.FC = () => {
  const { doc } = useDoc();
  const { id } = useParams();

  const chatId = parseInt(id || "");

  if (isNaN(chatId)) {
    return <div>Chat not Found</div>;
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <ChatContainer chat={(doc?.chats || [])[chatId]} />
    </section>
  );
};
