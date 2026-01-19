import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { adminActions } from "@/store/admin";
import { cartActions } from "@/store/cart";
import { Button } from "@/components";
import { checkout } from "@/apis/orders";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, subtotal, itemCount } = useCart();
  const { config, generatedCode, isGeneratingCode } = useAppSelector(
    (s) => s.admin,
  );

  const [discountCode, setDiscountCode] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(adminActions.fetchConfig());
  }, [dispatch]);

  const handleCheckout = async () => {
    if (!items.length) return;

    setIsCheckingOut(true);
    setError("");

    try {
      const code = discountCode || generatedCode?.code || "";
      const response = await checkout({ discountCode: code || undefined });

      dispatch(cartActions.clearCart());
      navigate("/payment/success", {
        state: { order: response.order },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setIsCheckingOut(false);
    }
  };

  // Calculate if NEXT order (current + 1) will be eligible
  const nextOrderNumber = (config?.totalOrderCount || 0) + 1;
  const nthValue = config?.nthOrderValue || 0;
  const isEligible = nthValue > 0 && nextOrderNumber % nthValue === 0;
  const ordersLeft = isEligible ? 0 : nthValue - (nextOrderNumber % nthValue);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Discount Status */}
        {config && (
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
            <h2 className="font-semibold mb-2">Discount Rewards</h2>
            <p className="text-xs text-gray-600 mb-3">
              Every {config.nthOrderValue} orders gets {config.discountPercent}%
              off
            </p>
            {!isEligible ? (
              <p className="text-sm text-gray-700">
                {ordersLeft} {ordersLeft === 1 ? "order" : "orders"} away from
                your next discount
              </p>
            ) : (
              <>
                <p className="text-sm text-green-700 mb-3">
                  🎉 This will be order #{nextOrderNumber}! Generate a{" "}
                  {config.discountPercent}% discount code
                </p>
                {!generatedCode && (
                  <Button
                    onClick={() =>
                      dispatch(adminActions.generateDiscountCode())
                    }
                    disabled={isGeneratingCode}
                    className="bg-blue-600 text-white text-sm px-4 py-2"
                  >
                    {isGeneratingCode ? "Generating..." : "Generate Code"}
                  </Button>
                )}
              </>
            )}
            {generatedCode && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-xs text-green-800">Your code:</p>
                <p className="text-lg font-bold text-green-600">
                  {generatedCode.code}
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Use it now to save {generatedCode.discountPercent}%!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white rounded shadow p-4 mb-4">
          <h2 className="font-semibold mb-3">Order Summary</h2>
          {!items.length ? (
            <p className="text-gray-500 text-center py-4">Cart is empty</p>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3 pb-3 mb-3 border-b"
                >
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.productName}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ₹{(item.priceSnapshot * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
              <div className="flex justify-between pt-2">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>

        {/* Discount Code */}
        <div className="bg-white rounded shadow p-4 mb-4">
          <h2 className="font-semibold mb-3">Discount Code</h2>
          <input
            type="text"
            value={discountCode || generatedCode?.code || ""}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            placeholder="Enter code"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={() => navigate("/cart")}
            className="flex-1 bg-gray-200 text-gray-700"
          >
            Back
          </Button>
          <Button
            onClick={handleCheckout}
            disabled={isCheckingOut || !items.length}
            className="flex-1 bg-green-600 text-white"
          >
            {isCheckingOut ? "Processing..." : "Complete Order"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
