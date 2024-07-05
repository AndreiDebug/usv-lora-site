import { Node } from "@/types";

const ONE_HOUR = 60 * 60 * 1000;

export const getIsActive = (node: Node) => {
  const now = new Date();
  const lastReadingTime = node.lastReading.timestamp;
  const timeDifference = now.getTime() - lastReadingTime.getTime();

  return timeDifference < ONE_HOUR;
};
