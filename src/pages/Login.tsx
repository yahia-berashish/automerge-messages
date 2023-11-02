import React from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export const Login: React.FC = () => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? (
    <Navigate to="/chats/new" />
  ) : (
    <section className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-1/2 max-w-sm">
        <CardHeader>Login</CardHeader>
        <CardBody>
          <SignInButton afterSignInUrl="/chats/new" afterSignUpUrl="/chats/new">
            <Button>Login</Button>
          </SignInButton>
        </CardBody>
      </Card>
    </section>
  );
};
