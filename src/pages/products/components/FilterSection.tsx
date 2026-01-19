import React from "react";
import RadioGroup from "@/components/RadioGroup";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSectionProps {
  title: string;
  name: string;
  value: string | null;
  onChange: (value: string | null) => void;
  options: FilterOption[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <RadioGroup
        name={name}
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export default FilterSection;
