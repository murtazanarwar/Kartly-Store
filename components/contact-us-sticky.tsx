"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function ContactUsSticky() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/support"
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg transition hover:scale-105 hover:bg-slate-700"
      >
        <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-slate-600 opacity-75"></span>
        <span className="relative z-10 text-xl">
          <MessageCircle className="h-6 w-6" />
        </span>
      </Link>
    </div>
  );
}
