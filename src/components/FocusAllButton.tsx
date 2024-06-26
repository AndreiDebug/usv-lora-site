import { LoraNode } from "@/app/types";
import { useMap } from "@vis.gl/react-google-maps";
import { Minimize2Icon } from "lucide-react";
import React from "react";

const FocusAllButton: React.FC<{ nodes: LoraNode[] }> = ({ nodes }) => {
  const map = useMap();

  const fitBounds = () => {
    if (!map) return;
    if (nodes.length === 0) return;

    let minLat = nodes[0].position.lat;
    let maxLat = nodes[0].position.lat;
    let minLng = nodes[0].position.lng;
    let maxLng = nodes[0].position.lng;

    nodes.forEach((node) => {
      minLat = Math.min(minLat, node.position.lat);
      maxLat = Math.max(maxLat, node.position.lat);
      minLng = Math.min(minLng, node.position.lng);
      maxLng = Math.max(maxLng, node.position.lng);
    });

    const bounds = {
      north: maxLat,
      south: minLat,
      east: maxLng,
      west: minLng,
    };

    map.fitBounds(bounds);
  };

  return (
    <div className="absolute top-4 right-4">
      <button
        role="button"
        onClick={fitBounds}
        className="size-16 rounded-full shadow-xl bg-white flex items-center justify-center"
      >
        <Minimize2Icon className="size-6" />
      </button>
    </div>
  );
};

export default FocusAllButton;
