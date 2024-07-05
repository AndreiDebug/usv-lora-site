import { Node } from "@/types";
import {
  Droplet,
  ThermometerIcon,
  WifiOff,
  Activity,
  Trash2,
  Sparkle
} from "lucide-react";
import Button from "@/components/Button";
import { getIsActive } from "@/utils";
import { useState } from "react";
import Modal from "./Modal";
import { useNodeData } from "@/hooks/useNodes";

interface NodeHeaderProps {
  node: Node;
  onDelete?: (nodeId: string) => void;
}

const NodeHeader: React.FC<NodeHeaderProps> = ({ node, onDelete }) => {
  const active = getIsActive(node);
  const { readings } = useNodeData(node.device_id, Date.now());

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h6 className="text-3xl text-gray-800 font-bold">{node.device_id}</h6>
        <StatusIndicator isActive={active} />
      </div>

      {active ? (
        <div className="grid grid-cols-3 gap-4">
          <DataItem
            icon={<ThermometerIcon size={20} className="text-amber-500" />}
            label="Temperature"
            value={`${node.lastReading.temperature}°C`}
          />
          <DataItem
            icon={<Droplet size={20} className="text-sky-500" />}
            label="Humidity"
            value={`${node.lastReading.humidity}%`}
          />
          <DataItem
            icon={<Sparkle size={20} className="text-red-500" />}
            label={"Voltage"}
            value={`${node.lastReading.battery}V`}
          />
        </div>
      ) : (
        <>
          <div className="text-center py-4 px-6 bg-gray-50 rounded-md relative mb-2">
            <div className="flex flex-col items-center mb-4">
              <WifiOff size={24} className="text-gray-400 mb-2" />
              <p className="text-gray-600 text-sm">
                This node is currently inactive. No data available.
              </p>
            </div>
          </div>

          {onDelete && (
            <Button
              label="Delete Node"
              onClick={() => onDelete(node.id)}
              icon={Trash2}
              fullWidth
              variant="red"
            />
          )}
        </>
      )}

      <div className="mt-8">
        <Button
          fullWidth
          label="Open Modal"
          onClick={handleOpenModal}
          variant="light"
          // icon={SomeIcon}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Data for node ${node.device_id}`}>
          {readings && readings.length > 1 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Previous Readings</h3>
              <div className="max-h-[70vh] overflow-y-auto mb-8">
                {readings.slice(1).map((reading, index) => (
                  <div key={index} className="border-t pt-2 mt-2">
                    <p className="text-sm text-gray-500">
                      {new Date(reading.timestamp).toLocaleString()}
                    </p>
                    <p>
                      Temp: {reading.temperature}°C, Humidity:{" "}
                      {reading.humidity}%, Battery: {reading.battery}V
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Button
            label="Close"
            onClick={handleCloseModal}
            variant="default"
            fullWidth
          />
        </Modal>
      </div>
    </header>
  );
};

const StatusIndicator: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div
    className={`flex items-center ${
      isActive ? "text-green-500" : "text-gray-400"
    }`}>
    {isActive ? (
      <>
        <span className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm font-medium">Active</span>
      </>
    ) : (
      <>
        <Activity size={16} className="mr-1" />
        <span className="text-sm font-medium">Inactive</span>
      </>
    )}
  </div>
);

const DataItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-md">
    {icon}
    <div className="ml-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default NodeHeader;
