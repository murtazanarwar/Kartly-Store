"use client";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  data: Product & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const { removeItem, updateItemQuantity } = useCart();

  const onRemove = () => removeItem(data.id);
  const decrement = () => data.quantity > 1 && updateItemQuantity(data.id, data.quantity - 1);
  const increment = () => data.quantity < data.stock && updateItemQuantity(data.id, data.quantity + 1);

  return (
    <li className="flex flex-col sm:flex-row items-center sm:items-start gap-4 py-6 border-b last:border-none">
      {/* Product Image */}
      <div className="relative h-28 w-full sm:w-28 sm:h-28 flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden">
        <Image
          fill
          src={data.images[0].url}
          alt={data.name}
          className="object-cover"
        />
      </div>

      {/* Details & Controls */}
      <div className="flex-1 flex flex-col justify-between w-full">
        {/* Top row: title & remove */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{data.name}</h3>
            <div className="flex gap-3 text-sm text-gray-500 mt-1">
              <span>{data.color.name}</span>
              <span className="border-l border-gray-300 pl-3">{data.size.name}</span>
            </div>
          </div>
          <IconButton
            onClick={onRemove}
            icon={<X size={16} />}
            className="text-gray-400 hover:text-red-500"
          />
        </div>

        {/* Quantity & Pricing */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Quantity */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={decrement}
              disabled={data.quantity <= 1}
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 text-gray-800">{data.quantity}</span>
            <button
              onClick={increment}
              disabled={data.quantity >= data.stock}
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Prices */}
          <div className="text-right">
            {/* Unit price */}
            <div className="text-sm text-gray-600">₹{data.price} each</div>
            {/* Total uses Currency which renders a div, so wrap in a div */}
            <div className="mt-1 text-base font-medium text-gray-900 flex items-center justify-end">
              <span className="mr-1">Total:</span>
              <Currency value={Number(data.price) * data.quantity} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
