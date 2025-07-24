import type { Metadata } from "next";
import { Urbanist } from 'next/font/google'

import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";

import "./globals.css";
import { StockProvider } from "@/context/stock-context";

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
        <body
          className={font.className}
          >
          <StockProvider>
            <ModalProvider />
            <ToastProvider />
            {children}
          </StockProvider> 
        </body>
    </html>
  );
}
