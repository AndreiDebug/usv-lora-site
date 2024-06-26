import { LoraNode } from "@/app/types";
import { XIcon } from "lucide-react";
import React, { FC } from "react";

const NodeModalHeader: FC<{
  node: LoraNode;
  setNode: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ node, setNode }) => {
  return (
    <header className="flex items-center justify-between p-2 border-b-2 border-gray-200">
      <h2 className="text-lg font-bold pl-2">{node.title}</h2>
      <button
        role="button"
        onClick={() => setNode(undefined)}
        className="size-8 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-sm flex items-center justify-center"
      >
        <XIcon className="size-5 text-gray-800" />
      </button>
    </header>
  );
};

export default NodeModalHeader;
