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
  const [socialReady, setSocialReady] = useState(false);

  const { data: session, status } = useSession();

  // 🔥 1️⃣ Gọi social-auth và chờ hoàn thành
useEffect(() => {
  const handleSocialAuth = async () => {
    if (session?.user) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/social-auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: session.user.email,
            name: session.user.name,
            avatar: session.user.image,
          }),
        });
      } catch (err) {
        console.error("Social auth failed:", err);
      }
    }

    setSocialReady(true);
  };

  handleSocialAuth();
}, [session]);

  // 🔥 2️⃣ Chỉ gọi /me sau khi social-auth hoàn thành
  const { isLoading } = useLoadUserQuery(undefined, {
  skip: status === "loading",
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