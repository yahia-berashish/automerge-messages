import React, { useEffect } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Outlet, Route, Routes } from "react-router-dom";
import { CreateChatPage, ChatPage } from "./pages";
import { useDoc } from "./hooks/useDoc";

const App: React.FC = () => {
  const { docUrl } = useDoc();

  console.log("Doc URL:", docUrl);
  console.log("New Route:", `chats/new#${docUrl}`);

  useEffect(() => {
    window.location.hash = docUrl;
  }, [docUrl]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Outlet />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn redirectUrl="/login" />
            </SignedOut>
          </>
        }
      >
        <Route path="chats/new" element={<CreateChatPage />} />
        <Route path="chats/:id" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};

export default App;
