import React from "react";
import type { Product } from "@/types";
import Button from "@/components/Button";

interface ProductCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
  onAddToCart: (e: React.MouseEvent, productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onAddToCart,
}) => {
  return (
    <div
      onClick={() => onProductClick(product.id)}
      className="flex gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="shrink-0 w-48 h-48 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-medium text-[#007185] hover:text-[#C7511F] mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-medium">
            ₹{product.price.toLocaleString()}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Category: {product.category}
        </p>
        {product.stock > 0 ? (
          <p className="text-sm text-green-600 mb-3">In Stock</p>
        ) : (
          <p className="text-sm text-red-600 mb-3">Out of Stock</p>
        )}
        <Button
          onClick={(e) => onAddToCart(e, product.id)}
          disabled={product.stock === 0}
          variant="amazon"
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
