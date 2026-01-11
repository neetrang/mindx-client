import "./globals.css";
import { Roboto, Montserrat } from "next/font/google";
import { ClientLayout } from "./client-layout";

export const metadata = {
  title: "MindX",
  icons: {
    icon: "/favicon.svg",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-Roboto",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500","700"],
  variable: "--font-Montserrat",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${montserrat.variable} !bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
