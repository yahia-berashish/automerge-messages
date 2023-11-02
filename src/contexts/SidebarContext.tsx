import React, { createContext, useState } from "react";
import { Sidebar } from "../layout";
import { Button } from "@nextui-org/react";
import { SidebarIcon } from "lucide-react";

export interface SidebarContextInterface {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextInterface>({
  isOpen: false,
  setIsOpen() {},
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative w-full min-h-screen overflow-x-hidden">
        <Button
          className="absolute top-4 left-4"
          isIconOnly
          onClick={() => setIsOpen(true)}
        >
          <SidebarIcon className="w-4 h-4" />
        </Button>
        <Sidebar />
        <div
          className={`min-h-screen transition-all ${
            isOpen
              ? "ml-[351.640625px] w-[calc(100vw_-_351.640625px)]"
              : "w-full m-0"
          }`}
        >
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
};
