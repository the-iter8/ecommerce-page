import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import CartItemCard from "@/components/CartItemCard";
import Button from "@/components/Button";
import { ROUTES } from "@/routes/constants";

const CartSidebar: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    itemCount,
    incrementItem,
    decrementItem,
    removeItem,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Cart ({itemCount})</h2>
        <div className="text-center py-8">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">
          Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})
        </h2>
        <span className="text-2xl font-bold">₹{subtotal.toLocaleString()}</span>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-green-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Part of your order qualifies for FREE Delivery</span>
        </div>
      </div>

      <Button
        variant="amazon"
        fullWidth
        size="lg"
        onClick={() => navigate(ROUTES.CART)}
        className="mb-4"
      >
        Go to Cart
      </Button>

      <div className="max-h-96 overflow-y-auto">
        {items.map((item) => (
          <CartItemCard
            key={item.productId}
            item={item}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
            onRemove={removeItem}
            compact
          />
        ))}
      </div>
    </div>
  );
};

export default CartSidebar;
