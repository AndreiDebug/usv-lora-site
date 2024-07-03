import { create } from "zustand";
import { z } from "zod";
import { interpretDataSchema } from "@/schemas";

export type AIData = z.infer<typeof interpretDataSchema>;

type PartialAIData = Partial<AIData>;

interface AIStore {
  aiData: { [nodeId: string]: PartialAIData };
  setAIData: (nodeId: string, data: PartialAIData) => void;
}

export const useAIStore = create<AIStore>((set) => ({
  aiData: {},
  setAIData: (nodeId, data) =>
    set((state) => ({
      aiData: {
        ...state.aiData,
        [nodeId]: data,
      },
    })),
}));
