import { Node } from "@/types";
import { getIsActive } from "@/utils";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useMemo } from "react";

const LoraNodeMarker: React.FC<{ node: Node; onClick: () => void }> = ({
  node,
  onClick,
}) => {
  const active = getIsActive(node);

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
