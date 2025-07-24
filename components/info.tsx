"use client";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "./ui/Button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler, useState } from "react";
import StockBadge from "./stock-badge";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((q) => Math.min(q + 1, data.stock));
  };
  const decrement = () => {
    setQuantity((q) => Math.max(q - 1, 1));
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data, quantity);
    console.log(`Added ${quantity} of ${data.name}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>

      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data.size?.name}</div>
        </div>

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Stock:</h3>
          <StockBadge productId = {data.id} initialStock = {data.stock}/>
        </div>

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data.color?.value }}
          />
        </div>

        <div className="flex gap-x-4">
          <h3 className="font-semibold text-black">Description:</h3>
          <div>{data.description}</div>
        </div>

        {/* Quantity selector */}
        <div className="flex items-center gap-x-2">
          <h3 className="font-semibold text-black">Quantity:</h3>
          <button
            onClick={decrement}
            disabled={quantity <= 1}
            className="p-1 rounded border"
          >
            <Minus size={16} />
          </button>
          <span className="px-3">{quantity}</span>
          <button
            onClick={increment}
            disabled={quantity >= data.stock}
            className="p-1 rounded border"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        <Button
          className="flex items-center gap-x-2"
          onClick={onAddToCart}
          disabled={data.stock === 0}
        >
          Add {quantity} To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
