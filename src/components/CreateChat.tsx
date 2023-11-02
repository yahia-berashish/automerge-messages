import React, { useState } from "react";
import { useDoc } from "../hooks/useDoc";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useUser } from "@clerk/clerk-react";

export const CreateChat: React.FC = () => {
  const { changeDoc } = useDoc();
  const [chatName, setChatName] = useState("");
  const { user } = useUser();

  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader>Create Chat</CardHeader>
        <CardBody>
          <Input
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className="mb-4"
          />
          <Button
            isDisabled={chatName.length === 0}
            color="primary"
            onClick={() => {
              changeDoc((d) =>
                d.chats.push({
                  id: d.chats?.length,
                  messages: [],
                  users: [
                    user?.username || user?.fullName || user?.firstName || "",
                  ],
                  name: chatName,
                })
              );

              setChatName("");
            }}
          >
            Create Chat
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
