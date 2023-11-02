import { ClerkProvider } from "@clerk/clerk-react";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { PrimitiveRepoProvider, RepoProvider } from "./RepoContext";
import { SidebarProvider } from "./SidebarContext";
import { BrowserRouter } from "react-router-dom";

export interface ProvidersProps {
  children: React.ReactNode;
}

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey: string = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  console.log("clerkPubKey:", clerkPubKey);

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <ThemeProvider>
          <NextUIProvider>
            <PrimitiveRepoProvider>
              <RepoProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </RepoProvider>
            </PrimitiveRepoProvider>
          </NextUIProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ClerkProvider>
  );
};
