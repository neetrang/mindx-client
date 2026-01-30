"use client";

import React, { FC, useEffect, useState } from "react";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import socketIO, { Socket } from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

export const ClientLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Providers>
      <InnerProviders>{children}</InnerProviders>
    </Providers>
  );
};

const InnerProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // ✅ restore login từ cookie
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    setMounted(true);

    const socket: Socket = socketIO(ENDPOINT, {
      transports: ["websocket"],
    });

    // ✅ FIX CHÍNH: cleanup phải return void
    return () => {
      socket.disconnect();
    };
  }, []);

  if (!mounted) return null;

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {isLoading ? <Loader /> : children}
        <Toaster position="top-center" />
      </ThemeProvider>
    </SessionProvider>
  );
};
