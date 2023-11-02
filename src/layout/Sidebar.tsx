/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Listbox,
  ListboxItem,
  User,
} from "@nextui-org/react";
import { useUser } from "@clerk/clerk-react";
import { username } from "../lib/username";
import { Plus, X } from "lucide-react";
import { SidebarContext } from "../contexts";
import { useDoc } from "../hooks/useDoc";
import { Link } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { doc } = useDoc();

  return (
    <Card
      as="aside"
      className={`absolute rounded-l-none inset-y-0 transition-all ${
        isOpen ? "left-0" : "-left-[351.640625px]"
      }`}
    >
      {isSignedIn && isLoaded && (
        <>
          <CardHeader className="flex items-center justify-between gap-x-4 w-[351.640625px]">
            <User
              name={username(user)}
              description={user.id}
              avatarProps={{ src: user.imageUrl }}
            />
            <Button isIconOnly variant="light" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <Divider />
        </>
      )}
      <CardBody>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg">Chats</h2>
            <Button isIconOnly variant="light" as={Link} to="/chats/new">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <Listbox className="p-0" aria-label="sidebar-chats">
            {(doc?.chats || []).map((chat) => (
              <ListboxItem
                key={`sidebar-chat-${chat?.id}`}
                as={Link}
                //@ts-ignore
                to={`/chats/${chat?.id}`}
              >
                {chat?.name}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </CardBody>
      <Divider />
      <CardFooter></CardFooter>
    </Card>
  );
};
