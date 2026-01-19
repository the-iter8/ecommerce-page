import React from "react";

interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
  disabled?: boolean;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onDecrease,
  onIncrease,
  onRemove,
  disabled = false,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center border-2 border-[#FFD814] rounded-full overflow-hidden">
        <button
          onClick={quantity === 1 ? onRemove : onDecrease}
          disabled={disabled}
          className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 disabled:opacity-50"
          aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {quantity === 1 ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            )}
          </svg>
        </button>
        <div className="w-10 h-10 flex items-center justify-center bg-white border-x border-[#FFD814]">
          <span className="font-medium">{quantity}</span>
        </div>
        <button
          onClick={onIncrease}
          disabled={disabled}
          className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 disabled:opacity-50"
          aria-label="Increase quantity"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuantityControl;
