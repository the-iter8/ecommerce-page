import React from "react";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import Pagination from "@/components/Pagination";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onProductClick: (productId: string) => void;
  onAddToCart: (e: React.MouseEvent, productId: string) => void;
  onPageChange: (page: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  currentPage,
  totalPages,
  onProductClick,
  onAddToCart,
  onPageChange,
}) => {
  return (
    <div className="flex-1">
      <div className="bg-white rounded shadow-sm p-4">
        <h2 className="text-2xl font-bold mb-4">Results</h2>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
