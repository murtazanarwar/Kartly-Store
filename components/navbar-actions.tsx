"use client";

import { LogIn, LogOut, ShoppingBag } from "lucide-react";

import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { logoutUser } from "@/actions/get-authservice";
 
const NavbarActions = () => {
    const currentUser = useUser();
    const clearGlobalUser = useUser((s) => s.clearUser);
    const cart = useCart();
    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false); 

    const logout = async () => {
        try {
            logoutUser()
            clearGlobalUser();
            router.push("/");
            toast.success("Logout Successful");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }
    
    return (
        <div className="ml-auto flex items-center gap-x-4"> 
            <Button 
                className="flex items-center rounded-full bg-black px-4 py-2"
                onClick={() => router.push("/cart")}
            >
                <ShoppingBag 
                    size={20}
                    color="white"
                />
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
            {!currentUser.user 
            ? 
                <Button 
                    className="flex items-center rounded-full bg-black px-4 py-2"
                    onClick={() => router.push("/log-in")}
                >
                    <LogIn 
                        size={20}
                        color="white"
                    />
                    <span className="hidden md:block ml-2 text-sm font-medium text-white">
                        Log In
                    </span>
                </Button>
            :
                <Button 
                    className="flex items-center rounded-full bg-black px-4 py-2"
                    onClick={logout}
                >
                    <LogOut 
                        size={20}
                        color="white"
                    />
                    <span className="hidden md:block ml-2 text-sm font-medium text-white">
                        Log Out
                    </span>
                </Button>
            }
        </div>
    )
}
 
export default NavbarActions;