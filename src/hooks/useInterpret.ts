import { experimental_useObject as useObject } from "ai/react";
import { interpretDataSchema } from "@/schemas";

import { useEffect } from "react";
import { AIData, useAIStore } from "@/state/useAIStore";

export const useInterpret = (nodeId: string) => {
  const setAIData = useAIStore((state) => state.setAIData);

  const { object, isLoading, error, ...rest } = useObject({
    api: "/api/interpret-data-ai",
    schema: interpretDataSchema,
  });

  useEffect(() => {
    if (object) {
      setAIData(nodeId, object as Partial<AIData>);
    }
  }, [object, nodeId, setAIData]);

  return { object, isLoading, error, ...rest };
};
