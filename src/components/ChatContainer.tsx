import React, { useState } from "react";
import { Chat, Message } from "../types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { MessagesContainer } from "./MessagesContainer";
import { SendMessage } from ".";
import { useDoc } from "../hooks/useDoc";
import { useUser } from "@clerk/clerk-react";
import { username } from "../lib/username";
import { MoreHorizontal } from "lucide-react";
import { chatIdx } from "../lib/chatIdx";

export interface ChatContainerProps {
  chat: Chat;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ chat }) => {
  const { doc, changeDoc } = useDoc();
  const { user } = useUser();
  const [currentReply, setCurrentReply] = useState<number | undefined>(
    undefined
  );
  const [chatName, setChatName] = useState(
    doc?.chats[chatIdx(doc, chat)]?.name || ""
  );
  const {
    isOpen: isRenameOpen,
    onOpenChange: onOpenRenameChange,
    onOpen: onRenameOpen,
    onClose: onRenameClose,
  } = useDisclosure();
  const {
    isOpen: isConfirmDeleteOpen,
    onOpenChange: onOpenConfirmDeleteChange,
    onOpen: onConfirmDeleteOpen,
    onClose: onConfirmDeleteClose,
  } = useDisclosure();

  return (
    <>
      <Modal isOpen={isRenameOpen} onOpenChange={onOpenRenameChange}>
        <ModalContent>
          <ModalHeader>
            Rename chat from "{doc?.chats[chatIdx(doc, chat)]?.name}" to "
            {chatName}"
          </ModalHeader>
          <ModalBody>
            <Input
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() => {
                changeDoc((d) => {
                  d.chats[chatIdx(d, chat)].name = chatName;
                });
                onRenameClose();
              }}
            >
              Rename
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isConfirmDeleteOpen}
        onOpenChange={onOpenConfirmDeleteChange}
      >
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalBody>
            Are you absolutely sure? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onClick={() => {
                onConfirmDeleteClose();
              }}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={() => {
                changeDoc((d) => {
                  delete d.chats[chatIdx(d, chat)];
                });
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Card className="w-full max-w-[400px]">
        <CardHeader className="flex items-center justify-between">
          <span className="text-lg">{chat?.name}</span>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="message-actions">
              <DropdownItem
                key="rename-chat"
                onPress={() => {
                  isRenameOpen ? onRenameClose() : onRenameOpen();
                }}
              >
                Rename
              </DropdownItem>
              <DropdownItem
                key="delete-chat"
                onClick={() => {
                  onConfirmDeleteOpen();
                }}
                color="danger"
                className="text-danger"
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody>
          <SendMessage
            currentReply={currentReply}
            setCurrentReply={setCurrentReply}
            chatIndex={doc?.chats.indexOf(chat) ?? -1}
            send={(message) => {
              changeDoc((d) => {
                const newMessage: Message =
                  currentReply !== undefined
                    ? {
                        id: chat.messages.length,
                        content: message,
                        senderId: user?.id || "",
                        senderName: username(user),
                        reply: currentReply,
                      }
                    : {
                        id: chat.messages.length,
                        content: message,
                        senderId: user?.id || "",
                        senderName: username(user),
                      };

                const chatIndex = d.chats.indexOf(chat);
                d.chats[chatIndex].messages.push(newMessage);

                setCurrentReply(undefined);
              });
            }}
          />
          <Divider className="my-4" />
          <MessagesContainer
            setCurrentReply={setCurrentReply}
            messages={chat?.messages || []}
            chat={chat}
          />
        </CardBody>
      </Card>
    </>
  );
};
