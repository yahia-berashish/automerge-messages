import React, { useContext } from "react";
import { ChatContext, ChatContextInterface } from "../contexts";

export const useChat = <
  T extends ChatContextInterface | null = ChatContextInterface
>(
  value: T
): T extends null
  ? ChatContextInterface
  : React.FC<{ children: React.ReactNode }> => {
  const contextResult = useContext(ChatContext);

  if (value === null) {
    return contextResult as T extends null
      ? ChatContextInterface
      : React.FC<{ children: React.ReactNode }>;
  }

  const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
  };

  return Provider as T extends null
    ? ChatContextInterface
    : React.FC<{ children: React.ReactNode }>;
};
