"use client";
import { LoraNode } from "@/app/types";
import { AnimatePresence, motion } from "framer-motion";
import { DropletsIcon, SproutIcon, ThermometerSunIcon } from "lucide-react";
import { useState } from "react";
import NodeModalHeader from "./NodeModalHeader";
import NodeModalTabHeader from "./NodeModalTabHeader";
import InterpretTab from "./InterpretTab";

const LoraNodeDetailsModal: React.FC<{
  node?: LoraNode;
  setNode: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ node, setNode }) => {
  const [tab, setTab] = useState(0);

  return (
    <AnimatePresence mode="popLayout">
      {!!node && (
        <motion.div
          key={node.id}
          className="absolute inset-1 sm:inset-2 md:inset-4 flex items-end justify-end pointer-events-none"
          initial={{ opacity: 0, y: -64, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: 64,
            scale: 0.8,
          }}
        >
          <div className="w-full max-w-[512px] bg-white rounded-lg border-2 border-gray-200 shadow-xl pointer-events-auto">
            <NodeModalHeader node={node} setNode={setNode} />

            <NodeModalTabHeader tab={tab} setTab={setTab} />

            {tab === 0 ? (
              <section className="px-8 py-4 h-72 overflow-y-scroll">
                <div className="flex items-center justify-around">
                  <div className="flex flex-col items-center py-4">
                    <ThermometerSunIcon className="size-12 text-amber-500 mb-2" />
                    <p className="text-sm text-gray-600 mb-4">Temperatura</p>
                    <p className="bg-gray-100 text-gray-800 font-medium rounded-full px-4 py-2">
                      {node.data.temperature}°C
                    </p>
                  </div>

                  <div className="flex flex-col items-center py-4">
                    <DropletsIcon className="size-12 text-sky-500 mb-2" />
                    <p className="text-sm text-gray-600 mb-4">Umiditate</p>
                    <p className="bg-gray-100 text-gray-800 font-medium rounded-full px-4 py-2">
                      {node.data.humidity}%
                    </p>
                  </div>

                  <div className="flex flex-col items-center py-4">
                    <SproutIcon className="size-12 text-green-500 mb-2" />
                    <p className="text-sm text-gray-600 mb-4">Nivel CO2</p>
                    <p className="bg-gray-100 text-gray-800 font-medium rounded-full px-4 py-2">
                      12%
                    </p>
                  </div>
                </div>
              </section>
            ) : (
              <InterpretTab node={node} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoraNodeDetailsModal;
