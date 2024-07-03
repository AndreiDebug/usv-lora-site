"use client";

import { useInterpret } from "@/hooks/useInterpret";
import { useState } from "react";
import Button from "./Button";
import { WandSparkles, Loader2, RefreshCw } from "lucide-react";
import { useAIStore } from "@/state/useAIStore";
import { Node } from "@/app/types";

const InterpretData: React.FC<{ node: Node }> = ({ node }) => {
  const { isLoading, error, submit } = useInterpret(node.device_id);
  const [clicked, setClicked] = useState(false);
  const aiData = useAIStore((state) => state.aiData[node.device_id]);

  const handleAnalyze = () => {
    setClicked(true);
    submit(node);
  };

  const handleRegenerate = () => {
    submit(node);
  };

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-100 rounded-md">
        An error has occured!
      </div>
    );
  }

  if (isLoading || (clicked && !aiData)) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="animate-spin mr-2" />
        <span>AI is analysing the data...</span>
      </div>
    );
  }

  if (aiData) {
    return (
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h6 className="font-bold text-lg">Interpretare AI</h6>
          <button
            onClick={handleRegenerate}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
            disabled={isLoading}
          >
            <RefreshCw
              size={16}
              className={`mr-1 ${isLoading ? "animate-spin" : ""}`}
            />
            {isLoading ? "Regenerare..." : "Regenerare"}
          </button>
        </div>
        <div>
          <h6 className="font-bold text-md mb-2">Interpretare generala</h6>
          <p className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md">
            {aiData.overallAssessment ||
              "Nu există o interpretare generală disponibilă."}
          </p>
        </div>
        <div>
          <h6 className="font-bold text-md mb-2">Riscuri</h6>
          {aiData.specifications && aiData.specifications.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {aiData.specifications.map((spec, i) => (
                <li key={i} className="text-sm text-gray-600">
                  {spec}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 italic">
              Nu au fost identificate riscuri.
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="flex justify-center">
      <Button
        fullWidth
        icon={WandSparkles}
        label="Analizare date cu IA"
        onClick={handleAnalyze}
      />
    </div>
  );
};

export default InterpretData;
