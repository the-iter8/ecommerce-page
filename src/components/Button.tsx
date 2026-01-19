import React from "react";
import classNames from "classnames";
import { useAppSelector } from "@/hooks/redux";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "amazon" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  className,
}) => {
  const isGlobalLoading = useAppSelector((state) => state.global.isLoading);
  const isDisabled = disabled || isGlobalLoading;

  const baseClasses =
    "font-medium transition-colors rounded-full cursor-pointer";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    amazon: "bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const sizeClasses = {
    sm: "px-4 py-1 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const disabledClasses = "bg-gray-300 cursor-not-allowed hover:bg-gray-300";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={classNames(
        baseClasses,
        isDisabled ? disabledClasses : variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
