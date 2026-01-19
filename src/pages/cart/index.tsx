import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import CartItemCard from "@/components/CartItemCard";
import Button from "@/components/Button";
import { ROUTES } from "@/routes/constants";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, itemCount, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded shadow-sm p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-6"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Add items to your cart to get started
            </p>
            <Button variant="amazon" onClick={() => navigate(ROUTES.HOME)}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1500px] mx-auto px-4 py-5">
        <div className="flex gap-5">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg p-5 mb-4">
              <div className="border-b pb-3 mb-4">
                <h1 className="text-2xl font-medium">Shopping Cart</h1>
                <div className="flex justify-end">
                  <span className="text-sm text-gray-600">Price</span>
                </div>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              <div className="border-t pt-5 mt-5">
                <div className="flex justify-end">
                  <div className="text-lg">
                    <span className="text-gray-700">
                      Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""}
                      ):{" "}
                    </span>
                    <span className="font-bold text-gray-900">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Sidebar */}
          <div className="w-[300px] flex-shrink-0">
            <div className="bg-white rounded-lg p-5 sticky top-5">
              <div className="mb-4">
                <div className="flex items-start gap-2 text-xs text-green-700 mb-4 bg-green-50 p-3 rounded">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="leading-relaxed">
                    Part of your order qualifies for FREE Delivery
                  </span>
                </div>

                <div className="text-xs text-gray-700 mb-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>This order contains a gift</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-lg mb-3">
                  <span className="text-gray-700">
                    Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""}
                    ):{" "}
                  </span>
                  <span className="font-bold text-gray-900">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                variant="amazon"
                fullWidth
                size="lg"
                onClick={() => navigate(ROUTES.CHECKOUT)}
              >
                Proceed to Buy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
