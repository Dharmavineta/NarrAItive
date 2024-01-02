"use client";
import { SignInButton, SignedOut } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import React, { Suspense } from "react";

const LoginButton = () => {
  return (
    // <Suspense fallback={<p>Loading...</p>}>
    <div>
      <UserButton afterSignOutUrl="/" />
      <SignedOut>
        <SignInButton afterSignInUrl="/plots" mode="modal" />
      </SignedOut>
    </div>
    // </Suspense>
  );
};

export default LoginButton;
