import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, UserRound } from "lucide-react";

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between px-4 bg-white border-b">
      <div>
        <Avatar>
          {/* Optionally add AvatarImage for real user image */}
          <AvatarImage src="" alt="User" />
          <AvatarFallback>
            <UserRound className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="text-gray-700">
        <Phone className="h-5 w-5" />
      </div>
    </header>
  );
};

export default Header;
