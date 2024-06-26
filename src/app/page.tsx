"use client";

import React, { useState } from "react";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { LoraNode } from "./types";
import LoraNodeDetailsModal from "@/components/LoraNodeDetailsModal";
import FocusAllButton from "@/components/FocusAllButton";

const LoraNodeMarker: React.FC<{ node: LoraNode; onClick: () => void }> = ({
  node,
  onClick,
}) => {
  return (
    <AdvancedMarker position={node.position} onClick={onClick}>
      <button
        type="button"
        className="size-12 bg-rose-500 border-2 border-rose-400 rounded-full flex items-center justify-center animate-pulse"
      >
        <p className="text-center text-white font-bold">{node.title}</p>
      </button>
    </AdvancedMarker>
  );
};

export default function Home() {
  const mapSettings = {
    center: {
      lat: 47.6512,
      lng: 26.2553,
    },
    zoom: 14,
  };

  const [loraNodes, setLoraNodes] = useState<LoraNode[]>([
    {
      id: "lora-node-1",
      title: "Lora Node 1",
      position: {
        lat: 47.6512,
        lng: 26.2553,
      },
      data: {
        temperature: 39.8,
        humidity: 5,
        CO2: 12,
      },
    },
    {
      id: "lora-node-2",
      title: "Lora Node 2",
      position: {
        lat: 47.62,
        lng: 26.24,
      },
      data: {
        temperature: 19.8,
        humidity: 23,
        CO2: 12,
      },
    },
  ]);
  const [activeLoraNode, setActiveLoraNode] = useState<string>();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <APIProvider
        apiKey="AIzaSyB - RZ6MalrT7wfW_6GB0HQjmYwIBgI71tA"
        libraries={["marker"]}
      >
        <Map
          mapId="lora-nodes-map"
          className="absolute inset-0 scale-110"
          defaultCenter={mapSettings.center}
          defaultZoom={mapSettings.zoom}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {loraNodes.map((node) => (
            <LoraNodeMarker
              key={node.id}
              node={node}
              onClick={() => setActiveLoraNode(node.id)}
            />
          ))}
        </Map>
        <FocusAllButton nodes={loraNodes} />
      </APIProvider>

      <LoraNodeDetailsModal
        node={loraNodes.find((node) => node.id === activeLoraNode)}
        setNode={setActiveLoraNode}
      />
    </div>
  );
}
