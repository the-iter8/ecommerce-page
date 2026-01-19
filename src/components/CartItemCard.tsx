import React from "react";
import type { CartItem } from "@/types";
import QuantityControl from "@/components/QuantityControl";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  compact?: boolean;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  compact = false,
}) => {
  const handleDecrease = () => {
    onUpdateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  if (compact) {
    return (
      <div className="flex gap-3 py-2">
        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {item.product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium text-gray-900">
              ₹{(item.product.price * item.quantity).toLocaleString()}
            </span>
          </div>
          <div className="mt-2">
            <QuantityControl
              quantity={item.quantity}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
              onRemove={handleRemove}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-5 py-5">
      <div className="flex-shrink-0 w-44 h-44 bg-gray-100 rounded">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900 hover:text-orange-700 cursor-pointer">
          {item.product.name}
        </h3>
        <p className="text-xs text-green-700 font-medium mt-1">In Stock</p>
        <p className="text-xs text-gray-600 mt-1">Eligible for FREE Delivery</p>

        <div className="mt-2">
          <QuantityControl
            quantity={item.quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            onRemove={handleRemove}
          />
        </div>

        <div className="mt-3 flex gap-4 text-xs">
          <button className="text-blue-600 hover:text-orange-700 hover:underline">
            Delete
          </button>
          <button className="text-blue-600 hover:text-orange-700 hover:underline">
            Save for later
          </button>
          <button className="text-blue-600 hover:text-orange-700 hover:underline">
            See more like this
          </button>
        </div>
      </div>

      <div className="flex-shrink-0 w-24 text-right">
        <span className="text-xl font-bold text-gray-900">
          ₹{item.product.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default CartItemCard;
