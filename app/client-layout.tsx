"use client";

import React, { FC, useEffect, useState } from "react";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider, useSession } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

export const ClientLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Providers>
      <SessionProvider>
        <InnerProviders>{children}</InnerProviders>
      </SessionProvider>
    </Providers>
  );
};

const InnerProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  // 🔥 Khi login Google thành công → gọi social-auth từ CLIENT
  useEffect(() => {
    if (session?.user) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/social-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 cực kỳ quan trọng
        body: JSON.stringify({
          email: session.user.email,
          name: session.user.name,
          avatar: session.user.image,
        }),
      });
    }
  }, [session]);

  // 🔥 Sau khi cookie được set → /me mới hoạt động
  const { isLoading } = useLoadUserQuery(undefined, {
    skip: !session, // tránh gọi quá sớm
  });

  useEffect(() => {
    setMounted(true);
    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!mounted || status === "loading") return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {isLoading ? <Loader /> : children}
      <Toaster position="top-center" />
    </ThemeProvider>
  );
};