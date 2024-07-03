import Tab from "@/components/Tab";

type TabOption = "temperature" | "humidity";

interface TabsProps {
  activeTab: TabOption;
  onTabChange: (tab: TabOption) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex mb-4 bg-gray-100 rounded-[8px] gap-1 p-1">
      <Tab
        label="Temperaturǎ"
        isActive={activeTab === "temperature"}
        onClick={() => onTabChange("temperature")}
      />
      <Tab
        label="Umiditate"
        isActive={activeTab === "humidity"}
        onClick={() => onTabChange("humidity")}
      />
    </div>
  );
};

export default Tabs;
