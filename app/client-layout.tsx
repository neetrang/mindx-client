"use client";

import React, { FC, useEffect } from "react";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider"; // <--- Redux Provider
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

export const ClientLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Providers> {/* Redux Provider BỌC NGOÀI CÙNG */}
      <InnerProviders>
        {children}
      </InnerProviders>
    </Providers>
  );
};

// Tách phần logic để tránh chạy hook trước Redux Provider
const InnerProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {isLoading ? <Loader /> : children}
        <Toaster position="top-center" />
      </ThemeProvider>
    </SessionProvider>
  );
};
