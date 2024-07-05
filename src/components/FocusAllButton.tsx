import { Node } from "@/types";
import { useMap } from "@vis.gl/react-google-maps";
import { Minimize2Icon } from "lucide-react";
import { useCallback } from "react";

const FocusAllButton: React.FC<{ nodes: Node[] }> = ({ nodes }) => {
  const map = useMap();

  const fitBounds = useCallback(() => {
    if (!map || !nodes.length) return;

    let minLat = nodes[0].lastReading.latitude;
    let maxLat = minLat;

    let minLng = nodes[0].lastReading.longitude;
    let maxLng = minLng;

    nodes.forEach((node) => {
      minLat = Math.min(minLat, node.lastReading.latitude);
      maxLat = Math.max(maxLat, node.lastReading.latitude);
      minLng = Math.min(minLng, node.lastReading.longitude);
      maxLng = Math.max(maxLng, node.lastReading.longitude);
    });

    const bounds = {
      north: maxLat,
      south: minLat,
      east: maxLng,
      west: minLng,
    };

    map.fitBounds(bounds);
  }, [map, nodes]);

  return map && nodes.length ? (
    <div className="absolute top-4 right-4">
      <button
        role="button"
        onClick={fitBounds}
        className="size-16 rounded-full shadow-xl bg-white flex items-center justify-center"
      >
        <Minimize2Icon className="size-6" />
      </button>
    </div>
  ) : null;
};

export default FocusAllButton;
