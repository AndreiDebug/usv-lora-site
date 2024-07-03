"use client";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (user) {
    router.replace("/");
    return null;
  }

  return children;
};

export default LoginLayout;
