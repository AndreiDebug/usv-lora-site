import React from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  iconPosition?: "before" | "after";
  fullWidth?: boolean;
  variant?: "default" | "red" | "light";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon: Icon,
  iconPosition = "before",
  fullWidth = false,
  variant = "default",
}) => {
  const baseClasses =
    "py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-opacity-50";
  const variantClasses = {
    default: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    red: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    light: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300",
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
      `}
      onClick={onClick}
    >
      {Icon && iconPosition === "before" && <Icon size={18} />}
      <span>{label}</span>
      {Icon && iconPosition === "after" && <Icon size={18} />}
    </button>
  );
};

export default Button;
