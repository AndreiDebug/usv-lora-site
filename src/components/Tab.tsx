import React from "react";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`flex-1 py-2 px-4 rounded-[4px] transition-colors ${
        isActive ? "bg-gray-800 text-white" : "bg-transparent"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
