import React from "react";
import classNames from "classnames";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  label,
  className,
}) => {
  return (
    <div className={classNames("flex items-center gap-2", className)}>
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
