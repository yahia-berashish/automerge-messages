import React from "react";
import { MessageCard } from "./MessageCard";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { useChat } from "../hooks/useChat";

export const MessagesContainer: React.FC = () => {
  const { chat, setCurrentReply } = useChat(null);

  return (
    <ScrollShadow className="h-[calc(100vh_-_15rem)]">
      <div className="flex flex-col gap-2">
        {(chat?.messages || [])?.length > 0 ? (
          (chat?.messages || [])?.map((message) => (
            <MessageCard
              key={`message-card-${message?.id}-${message?.content}`}
              message={message}
              setCurrentReply={setCurrentReply}
              chat={chat}
            />
          ))
        ) : (
          <Card>
            <CardBody>No Messages Currently in This Chat</CardBody>
          </Card>
        )}
      </div>
    </ScrollShadow>
  );
};
