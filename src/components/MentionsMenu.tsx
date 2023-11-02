import React from "react";
import { useChat } from "../hooks/useChat";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { AtSign } from "lucide-react";

export const MentionsMenu: React.FC = () => {
  const { chat } = useChat(null);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isDisabled={!chat?.users || chat?.users?.length === 0}
          isIconOnly
          className="absolute top-0 right-12"
        >
          <AtSign className="w-4 h-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="mentions-menu">
        {(chat?.users || [])?.map((user) => (
          <DropdownItem key={`mention-item-${user}`}>{user}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
