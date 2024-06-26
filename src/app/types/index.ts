export type LoraNode = {
  id: string;
  title: string;
  position: Position;
  data: LoraData;
};

export type LoraData = {
  temperature: number;
  humidity: number;
  CO2: number;
};

export type Position = {
  lat: number;
  lng: number;
};
