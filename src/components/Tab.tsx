import React from "react";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  size?: "default" | "small";
}

const Tab: React.FC<TabProps> = ({
  label,
  isActive,
  onClick,
  size = "default",
}) => {
  const baseClasses = "flex-1 rounded-[4px] transition-colors";
  const sizeClasses = size === "small" ? "py-1 px-2" : "py-2 px-4";

  let activeClasses;
  if (size === "small") {
    activeClasses = isActive
      ? "bg-white text-gray-800 shadow-sm"
      : "bg-transparent text-gray-600 hover:bg-gray-100";
  } else {
    activeClasses = isActive
      ? "bg-gray-800 text-white"
      : "bg-transparent hover:bg-gray-200";
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${activeClasses}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
