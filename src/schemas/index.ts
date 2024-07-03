import { LoraNode } from "@/app/types";
import { z } from "zod";

export const interpretDataSchema = z.object({
  overallAssessment: z
    .string()
    .describe(
      "Evalueaza din punct de vedere al mediului situatia curenta in functie de datele furnizare, poti sa mentionezi daca e peste sau sub normele la data curenta si locatia curenta"
    ),
  specifications: z
    .array(z.string())
    .describe(
      "Lista cu riscuri prezentate de temperatura si umiditatea la locatia specificata"
    ),
});

export const NodePayloadSchema = z.object({
  end_device_ids: z.object({
    device_id: z.string(),
  }),
  received_at: z.string().datetime(),
  uplink_message: z.object({
    decoded_payload: z.object({
      battery: z.number(),
      humidity: z.number(),
      latitude: z.number(),
      longitude: z.number(),
      temperature: z.number(),
    }),
  }),
});

export type NodePayloadType = z.infer<typeof NodePayloadSchema>;
