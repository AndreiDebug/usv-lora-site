import { streamObject } from "ai";
import { interpretDataSchema } from "@/schemas";
import { LoraNode } from "@/app/types";
import openai from "@/lib/openai/openai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const node: LoraNode = await req.json();
  const date = new Date().toLocaleString();

  const result = await streamObject({
    model: openai("gpt-3.5-turbo"),
    schema: interpretDataSchema,
    system:
      "Esti un data analyst care te intereseaza anormalitatile in legatura cu mediul, si vei prezice diferite evenimente catastrofice cand datele vor indica o eventuala posibilitate a unui eveniment. Raspunsurile tale se refera strict la evenimente naturale",
    prompt: `Luand in vedere setul de date: { pozitie: { lat: ${node.position.lat}, lng: ${node.position.lng} }, temperatura: ${node.data.temperature}, umiditate: ${node.data.humidity}%, date: ${date} }, interpreteaza-le, si spune-mi ce riscuri sau oportunitati prezinta aceasta vreme, luand in vedere si locatia`,
  });

  return result.toTextStreamResponse();
}
