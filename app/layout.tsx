import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "./components/ClientProviders";
// import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "0XBUY - The Next Generation Marketplace",
  description:
    "Buy and sell with confidence on 0XBUY. The secure, fast, and user-friendly marketplace for everyone.",
};

// Main setup for the AbstraxionProvider config

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders>
          {/* <Header /> */}
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
