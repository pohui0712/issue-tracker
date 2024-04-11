"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

// Session provider is a component that uses react context to pass the authentication down the component tree

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
