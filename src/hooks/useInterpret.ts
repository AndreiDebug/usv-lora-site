import { experimental_useObject as useObject } from "ai/react";
import { interpretDataSchema } from "@/schemas";

export const useInterpret = () => {
  return useObject({
    api: "/api/interpret-data-ai",
    schema: interpretDataSchema,
  });
};
