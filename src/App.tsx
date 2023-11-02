import React, { useEffect } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Outlet, Route, Routes } from "react-router-dom";
import { CreateChatPage, ChatPage, Login } from "./pages";
import { useDoc } from "./hooks/useDoc";

const App: React.FC = () => {
  const { docUrl } = useDoc();

  useEffect(() => {
    window.location.hash = docUrl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docUrl, window.location.pathname]);

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
              <Login />
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
