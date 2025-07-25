"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartPage = () => {
    const cart = useCart();
    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);

    //Comment down when Domain Brought
    useEffect(() => {
        const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

        const storageToken = typeof window !== 'undefined'
        ? localStorage.getItem('hhub_token')
        : null;

        const token = cookieToken || storageToken;

        if (!token) {
            router.replace('/log-in');
        }
    }, [router]);

    useEffect(() => {
        setIsMounted(true);
    } , []);
    
    if(!isMounted){
        return null;
    }

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart</p>}
                            <ul>
                            {cart.items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    data={item}
                                />
                            ))}
                            </ul>
                        </div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Summary />
                        </Suspense>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CartPage;