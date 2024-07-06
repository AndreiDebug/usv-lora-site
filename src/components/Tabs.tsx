import React from "react";
import Tab from "@/components/Tab";

type TabOption<T extends string> = {
  id: T;
  label: string;
};

type TabsProps<T extends readonly TabOption<string>[]> = {
  tabs: T;
  activeTab: T[number]["id"];
  onTabChange: (tabId: T[number]["id"]) => void;
  size?: "default" | "small";
};

function Tabs<T extends readonly TabOption<string>[]>({
  tabs,
  activeTab,
  onTabChange,
  size = "default",
}: TabsProps<T>) {
  const containerClasses = `flex mb-4 rounded-[8px] gap-1 p-1 ${
    size === "small" ? "text-sm bg-gray-50" : "text-base bg-gray-100"
  }`;

  return (
    <div className={containerClasses}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          label={tab.label}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          size={size}
        />
      ))}
    </div>
  );
}

export default Tabs;
