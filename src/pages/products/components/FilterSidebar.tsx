import React from "react";
import FilterSection from "./FilterSection";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (value: string | null) => void;
  categoryOptions: FilterOption[];
  priceRange: string | null;
  onPriceChange: (value: string | null) => void;
  priceOptions: FilterOption[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onCategoryChange,
  categoryOptions,
  priceRange,
  onPriceChange,
  priceOptions,
}) => {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white rounded shadow-sm p-4">
        <FilterSection
          title="Category"
          name="category"
          value={selectedCategory}
          onChange={onCategoryChange}
          options={categoryOptions}
        />

        <FilterSection
          title="Price"
          name="price"
          value={priceRange}
          onChange={onPriceChange}
          options={priceOptions}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
