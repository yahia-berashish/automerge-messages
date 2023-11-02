import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { Send } from "lucide-react";
import { useDoc } from "../hooks/useDoc";

export interface SendMessageProps {
  send: (messageContent: string) => void;
  currentReply: number | undefined;
  setCurrentReply: React.Dispatch<React.SetStateAction<number | undefined>>;
  chatIndex: number;
}

export const SendMessage: React.FC<SendMessageProps> = ({
  send,
  currentReply,
  setCurrentReply,
  chatIndex,
}) => {
  const [message, setMessage] = useState("");
  const { doc } = useDoc();

  return (
    <div className="flex flex-col gap-y-0.5">
      {currentReply !== undefined && (
        <Dropdown>
          <DropdownTrigger>
            <Button size="sm" className="text-xs justify-start" variant="light">
              Replying to "
              {
                ((doc?.chats || [])[chatIndex]?.messages || [])[currentReply]
                  ?.content
              }
              "
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="reply-actions">
            <DropdownItem
              key={`cancel-reply`}
              onClick={() => {
                setCurrentReply(undefined);
              }}
            >
              Cancel
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      <div className="w-full flex items-center gap-x-2 justify-center">
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button
          color="primary"
          isDisabled={message.length === 0}
          isIconOnly
          onClick={() => {
            send(message);
            setMessage("");
          }}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
