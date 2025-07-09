import type { Metadata } from "next";
import { Urbanist } from 'next/font/google'

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { SocketProvider } from "@/providers/socket-provider";

import "./globals.css";

const font = Urbanist({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SocketProvider>
        <body
          className={font.className}
          >
          <ModalProvider />
          <ToastProvider />
          <Navbar />
          {children}
          <Footer />
        </body>
      </SocketProvider>
    </html>
  );
}
