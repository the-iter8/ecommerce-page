import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "@/store/cart";
import { productsActions } from "@/store/products";
import Select from "@/components/Select";
import CartSidebar from "@/components/CartSidebar";
import ResultsHeader from "./components/ResultsHeader";
import FilterSidebar from "./components/FilterSidebar";
import ProductList from "./components/ProductList";
import { PRODUCT_CATEGORIES } from "./hooks/useProductFilters";
import { PRICE_OPTIONS, SORT_OPTIONS } from "./constants";

const ITEMS_PER_PAGE = 10;

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total, page, totalPages, isLoading } = useAppSelector(
    (s) => s.products,
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");

  const fetchProducts = (newPage: number = page) => {
    const [minPrice, maxPrice] = priceRange
      ? priceRange.split("-").map(Number)
      : [undefined, undefined];

    dispatch(
      productsActions.fetchProducts({
        category: selectedCategory || undefined,
        minPrice,
        maxPrice,
        sortBy: sortBy as "price-low" | "price-high" | "featured",
        page: newPage,
        limit: ITEMS_PER_PAGE,
      }),
    );
  };

  useEffect(() => {
    fetchProducts(1);
  }, [selectedCategory, priceRange, sortBy]);

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    dispatch(
      cartActions.addToCart({
        productId,
        quantity: 1,
      }),
    );
  };

  const handlePageChange = (newPage: number) => {
    fetchProducts(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ResultsHeader
        currentPage={page}
        itemsPerPage={ITEMS_PER_PAGE}
        totalResults={total}
      />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-end mb-4">
          <Select
            label="Sort by:"
            value={sortBy}
            onChange={setSortBy}
            options={SORT_OPTIONS}
          />
        </div>

        <div className="flex gap-6">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categoryOptions={PRODUCT_CATEGORIES}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            priceOptions={PRICE_OPTIONS}
          />

          <ProductList
            products={items}
            isLoading={isLoading}
            currentPage={page}
            totalPages={totalPages}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onPageChange={handlePageChange}
          />

          {/* Cart Sidebar */}
          <div className="w-80 shrink-0">
            <div className="sticky top-4">
              <CartSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
