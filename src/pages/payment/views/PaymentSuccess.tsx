import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components";
import type { Order } from "@/types";

interface LocationState {
  order?: Order;
}

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = (location.state || {}) as LocationState;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded shadow-lg p-6">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">
          Order Successful!
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Thank you for your purchase
        </p>

        {/* Order Details */}
        {order && (
          <div className="border-t border-b py-4 mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-semibold">#{order.orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Items:</span>
              <span className="font-semibold">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">
                ₹{order.subtotal.toLocaleString()}
              </span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount:</span>
                <span className="font-semibold">
                  -₹{order.discountAmount.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total:</span>
              <span>₹{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={() => navigate("/products")}
            className="w-full bg-blue-600 text-white"
          >
            Continue Shopping
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-gray-200 text-gray-700"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
