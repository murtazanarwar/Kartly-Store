"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import PhoneNumber from "@/components/ui/phone-input";

const Summary = () => {
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items );
    const removeAll = useCart((state) => state.removeAll);
    const [phoneNumber, setPhoneNumber ] = useState("");

    useEffect(() => {
        if(searchParams.get("success")){
            toast.success("Order Placed");
            removeAll();
        }

        if(searchParams.get("canceled")){
            toast.error("something went wrong");
        }
    }, [searchParams, removeAll]);

    const totalPrice = items.reduce((total , item ) => {
        return total + Number(item.price);
    } , 0 );

    const onCheckout = async () => {
        // toast("watsapp page's screenshort to me")
        // toast("This feature will be avaliable soon...")
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id),
            phoneNumber: phoneNumber
        });

        window.location = response.data.url;
    }

    return (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gra-900">Order Summary</h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Order Total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <PhoneNumber setPhoneNumber={setPhoneNumber} />
            <Button onClick={onCheckout} className="w-full mt-6">
                Place Order
            </Button>
        </div>
    )
}

export default Summary;