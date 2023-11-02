import React from "react";
import { Chat, Message } from "../types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MoreHorizontal } from "lucide-react";
import { useDoc } from "../hooks/useDoc";
import { chatIdx } from "../lib/chatIdx";

export interface MessageCardProps {
  message: Message;
  setCurrentReply: React.Dispatch<React.SetStateAction<number | undefined>>;
  chat: Chat;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  setCurrentReply,
  chat,
}) => {
  const { doc, changeDoc } = useDoc();

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <span className="text-sm">{message.senderName}</span>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="message-actions">
            <DropdownItem
              key="reply-to-message"
              onClick={() => {
                setCurrentReply(message?.id);
              }}
            >
              Reply
            </DropdownItem>
            <DropdownItem
              key="delete-message"
              onClick={() => {
                changeDoc((d) => {
                  const messageIndex = (
                    (d?.chats || [])[chatIdx(d, chat)]?.messages || []
                  ).indexOf(message);

                  console.log(
                    "HELLO WORLD:",
                    d?.chats?.findIndex(({ id }) => chat?.id === id)
                  );

                  delete ((d?.chats || [])[chatIdx(d, chat)]?.messages || [])[
                    messageIndex
                  ];
                });
              }}
              color="danger"
              className="text-danger"
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <Divider />
      <CardBody>{message.content}</CardBody>
      {message.reply !== undefined && (
        <>
          <Divider />
          <CardFooter>
            <span className="text-xs">
              Replying to "
              {
                ((doc?.chats || [])[chatIdx(doc, chat)]?.messages || [])[
                  message.reply
                ]?.content
              }
              "
            </span>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
