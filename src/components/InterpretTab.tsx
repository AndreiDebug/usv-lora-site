"use client";

import { LoraNode } from "@/app/types";
import { useInterpret } from "@/hooks/useInterpret";
import { FC, useState } from "react";

const InterpretTab: FC<{ node: LoraNode }> = ({ node }) => {
  const { object, submit } = useInterpret();
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative flex flex-col h-72 overflow-y-scroll">
      {object || clicked ? (
        <div className="w-full flex-1 p-4">
          <div className="mb-8">
            <h6 className="font-bold text-lg mb-2">Interpretare generala</h6>
            <p className="text-sm text-gray-600">{object?.overallAssessment}</p>
          </div>

          <div>
            <h6 className="font-bold text-lg mb-2">Riscuri</h6>
            {object?.specifications?.map((spec, i) => (
              <p key={spec} className="text-sm text-gray-600">
                {i + 1}. {spec}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 flex items-center justify-center">
          <button
            onClick={() => {
              setClicked(true);
              submit(node);
            }}
            className="bg-sky-400 text-white px-6 py-3 rounded-md text-xs"
          >
            Interpreteaza
          </button>
        </div>
      )}
    </div>
  );
};

export default InterpretTab;
