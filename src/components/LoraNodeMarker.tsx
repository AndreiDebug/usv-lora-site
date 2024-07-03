import { Node } from "@/app/types";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useMemo } from "react";

const ONE_HOUR = 60 * 60 * 1000;

const LoraNodeMarker: React.FC<{ node: Node; onClick: () => void }> = ({
  node,
  onClick,
}) => {
  const active = useMemo(() => {
    const now = new Date();
    const lastReadingTime = node.lastReading.timestamp;
    const timeDifference = now.getTime() - lastReadingTime.getTime();

    return timeDifference < ONE_HOUR;
  }, [node]);

  return (
    <AdvancedMarker
      position={{
        lat: node.lastReading.latitude,
        lng: node.lastReading.longitude,
      }}
      onClick={onClick}
    >
      <button
        type="button"
        className="relative px-4 py-2 bg-white border border-gray-200 rounded-full shadow-lg"
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              active ? "bg-green-500" : "bg-red-500"
            }`}
          />

          <p
            className={`text-center text-sm font-bold ${
              active ? "text-gray-800" : "text-gray-400"
            }`}
            style={{ lineHeight: 1.2 }}
          >
            {node.device_id}
          </p>
        </div>
      </button>
    </AdvancedMarker>
  );
};

export default LoraNodeMarker;
