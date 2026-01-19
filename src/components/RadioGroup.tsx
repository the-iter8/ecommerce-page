import React from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  value: string | null;
  onChange: (value: string | null) => void;
  options: RadioOption[];
  allowNull?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  allowNull = true,
}) => {
  return (
    <div className="space-y-2">
      {allowNull && (
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={!value}
            onChange={() => onChange(null)}
            className="mr-2"
          />
          <span className="text-sm">All</span>
        </label>
      )}
      {options.map((option) => (
        <label key={option.value} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="mr-2"
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
