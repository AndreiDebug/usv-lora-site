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
