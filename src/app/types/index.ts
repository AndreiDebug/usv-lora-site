export type LoraNode = {
  id: string;
  title: string;
  position: Position;
  data: LoraData;
  active?: boolean;
};

export type LoraData = {
  temperature: number;
  humidity: number;
  battery: number;
};

export type Position = {
  lat: number;
  lng: number;
};

export interface NodeReading {
  battery: number;
  humidity: number;
  latitude: number;
  longitude: number;
  temperature: number;
  timestamp: Date;
}

export interface Node {
  id: string;
  device_id: string;
  lastReading: NodeReading;
}
