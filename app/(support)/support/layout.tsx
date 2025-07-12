import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Header from "./components/header";
import { AvatarFallback } from "@/components/ui/avatar";
import { Bot, UserRound } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col ">
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-12 flex flex-col gap-4 items-center justify-center border-r py-4">
              <Avatar className="ring-2 ring-slate-700 rounded-lg cursor-pointer">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback>
                      <UserRound />
                  </AvatarFallback>
              </Avatar>
              <Avatar>
                  <Bot className="cursor-not-allowed" />
              </Avatar>
          </aside>

          <main className="flex-1 overflow-auto">
            <div className="sticky top-0 z-10 bg-white border-b">
              <Header />
            </div>

            <div className="p-4 space-y-4">
              
              {children}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}