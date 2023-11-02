import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { Send } from "lucide-react";
import { useChat } from "../hooks/useChat";

export const SendMessage: React.FC = () => {
  const { currentReply, send, setCurrentReply, chat } = useChat(null);
  const [message, setMessage] = useState("");

  // const {  onOpen,  } = useDisclosure();

  // useEffect(() => {
  //   if (message.endsWith("@")) {
  //     onOpen();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [message]);

  useEffect(() => {
    console.log("chat users:", chat);
  });

  const sendMessage = () => {
    send(message);
    setMessage("");
  };

  return (
    <div className="flex flex-col gap-y-0.5">
      {currentReply !== undefined && (
        <Dropdown>
          <DropdownTrigger>
            <Button size="sm" className="text-xs justify-start" variant="light">
              Replying to "{(chat?.messages || [])[currentReply]?.content}"
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
        {/* <Dropdown isOpen={isOpen} onOpenChange={onOpenChange}>
          <DropdownTrigger>
            <> */}
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <Button
          type="submit"
          color="primary"
          isDisabled={message.length === 0}
          isIconOnly
          onClick={sendMessage}
        >
          <Send className="h-4 w-4" />
        </Button>
        {/* </>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="mentions-menu"
            selectionMode="single"
            selectedKeys={mentions}
            onSelectionChange={(mention) =>
              setMentions((current) => {
                const set = new Set([...current, mention]);
                const array = Array.from(set) as string[];
                return array;
              })
            }
          >
            {(chat?.users || [])?.map((user) => (
              <DropdownItem
                key={`mention-item-${user}`}
                onClick={() => {
                  //! INCOMPLETE
                }}
              >
                {user}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown> */}
      </div>
    </div>
  );
};
