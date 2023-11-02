import React from "react";
import { Chat, Message } from "../types";
import { MessageCard } from "./MessageCard";
import { Card, CardBody } from "@nextui-org/react";

export interface MessagesContainerProps {
  messages: Message[];
  setCurrentReply: React.Dispatch<React.SetStateAction<number | undefined>>;
  chat: Chat;
}

export const MessagesContainer: React.FC<MessagesContainerProps> = ({
  messages,
  setCurrentReply,
  chat,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {messages.length > 0 ? (
        messages?.map((message) => (
          <MessageCard
            key={`message-card-${message?.id}-${message?.content}`}
            message={message}
            setCurrentReply={setCurrentReply}
            chat={chat}
          />
        ))
      ) : (
        <Card>
          <CardBody>No Messages Currently in this Chat</CardBody>
        </Card>
      )}
    </div>
  );
};
