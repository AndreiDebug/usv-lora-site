"use client";

import React, { useMemo, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import FocusAllButton from "@/components/FocusAllButton";
import { X } from "lucide-react";
import Tabs from "@/components/Tabs";
import NodeHeader from "@/components/NodeHeader";
import UserBadge from "@/components/UserBadge";
import { Node } from "../types";
import { deleteNodeAndReadings, useNodes } from "@/hooks/useNodes";
import LoraNodeMarker from "@/components/LoraNodeMarker";
import InterpretData from "@/components/InterpretData";
import NodeChart from "@/components/NodeChart";

const mapSettings = {
  center: {
    lat: 47.6512,
    lng: 26.2553
  },
  zoom: 14
};

const graphTabOptions = [
  { id: "temperature" as const, label: "Temperature" },
  { id: "humidity" as const, label: "Humidity" }
] as const;

type GraphTabId = (typeof graphTabOptions)[number]["id"];

const timeRangeOptions = [
  { id: "1h" as const, label: "1 hour" },
  { id: "1d" as const, label: "1 day" }
] as const;

type TimeRangeId = (typeof timeRangeOptions)[number]["id"];

export default function Home() {
  const [loraNode, setLoraNode] = useState<Node>();
  const [sheetOpen, setSheetOpen] = useState(false);

  const { nodes, loading, mutate } = useNodes();

  const [activeGraphTab, setActiveGraphTab] = useState<GraphTabId>(
    graphTabOptions[0].id
  );
  const [activeTimeRangeTab, setActiveTimeRangeTab] = useState<TimeRangeId>(
    timeRangeOptions[0].id
  );

  const timeRange = useMemo(() => {
    if (activeTimeRangeTab === "1d") return 24;
    return 1;
  }, [activeTimeRangeTab]);

  const handleDeleteNode = async (nodeId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this node?"
    );

    if (confirmDelete) {
      try {
        await deleteNodeAndReadings(nodeId);
        setSheetOpen(false);
        mutate();
      } catch (error) {
        console.error("Error deleting node:", error);
        alert("An error occurred while deleting the node. Please try again.");
      }
    } else {
      setSheetOpen(false);
    }
    setSheetOpen(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <APIProvider
        apiKey="AIzaSyB - RZ6MalrT7wfW_6GB0HQjmYwIBgI71tA"
        libraries={["marker"]}>
        <div className="absolute inset-0 flex">
          {/* Map and floating UI components */}
          <div className="flex-1 relative h-screen overflow-hidden">
            <UserBadge />
            <Map
              mapId="lora-nodes-map"
              className="absolute z-0 inset-0 scale-110"
              defaultCenter={mapSettings.center}
              defaultZoom={mapSettings.zoom}
              gestureHandling={"greedy"}
              disableDefaultUI={true}>
              {!loading &&
                nodes &&
                nodes.map((node, i) => (
                  <LoraNodeMarker
                    key={node.device_id}
                    node={node}
                    onClick={() => {
                      setSheetOpen(true);
                      setLoraNode(nodes[i]);
                    }}
                  />
                ))}
            </Map>

            {!loading && nodes && <FocusAllButton nodes={nodes} />}
          </div>

          {/* Side Sheet */}
          <div
            className={`relative flex-shrink-0 transition-all ${
              sheetOpen ? "w-full sm:w-[512px]" : "w-0"
            }`}>
            {!!loraNode && (
              <div
                key={loraNode.id}
                className="absolute top-0 left-0 bottom-0 w-screen sm:w-[512px] overflow-y-scroll">
                <div className="py-8 px-4 sm:py-4 sm:px-8">
                  <button
                    type="button"
                    className="size-10 bg-gray-100 rounded-full flex items-center justify-center mb-8"
                    onClick={() => setSheetOpen(false)}>
                    <X size={16} />
                  </button>

                  <NodeHeader
                    hoursAgo={timeRange}
                    node={loraNode}
                    onDelete={handleDeleteNode}
                  />

                  <Tabs
                    activeTab={activeGraphTab}
                    onTabChange={(tab) => setActiveGraphTab(tab)}
                    tabs={graphTabOptions}
                  />

                  <Tabs
                    activeTab={activeTimeRangeTab}
                    onTabChange={(tab) => setActiveTimeRangeTab(tab)}
                    tabs={timeRangeOptions}
                    size="small"
                  />

                  <div className="mb-8">
                    <NodeChart
                      nodeId={loraNode.device_id}
                      dataType={activeGraphTab}
                      hoursAgo={timeRange}
                    />
                  </div>

                  {loraNode && <InterpretData node={loraNode} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </APIProvider>
    </div>
  );
}
