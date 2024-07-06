import useSWR from "swr";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  where,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Node, NodeReading } from "@/types";
import { ONE_HOUR } from "@/utils";

const fetchNodes = async (): Promise<Node[]> => {
  const nodesCollection = collection(db, "nodes");
  const nodesSnapshot = await getDocs(nodesCollection);

  const nodesPromises = nodesSnapshot.docs.map(async (doc) => {
    const nodeData = doc.data();
    const readingsCollection = collection(doc.ref, "readings");
    const latestReadingQuery = query(
      readingsCollection,
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const readingSnapshot = await getDocs(latestReadingQuery);

    if (!readingSnapshot.empty) {
      const readingData = readingSnapshot.docs[0].data();
      return {
        id: doc.id,
        device_id: nodeData.device_id,
        lastReading: {
          battery: readingData.battery,
          humidity: readingData.humidity,
          latitude: readingData.latitude,
          longitude: readingData.longitude,
          temperature: readingData.temperature,
          timestamp: readingData.timestamp.toDate(),
        },
      };
    }
    return null;
  });

  const nodesWithReadings = (await Promise.all(nodesPromises)).filter(
    (node): node is Node => node !== null
  );

  return nodesWithReadings;
};

const fetchNodeData = async ([nodeId, timeRange]: [string, number]): Promise<
  NodeReading[]
> => {
  const readingsCollection = collection(db, "nodes", nodeId, "readings");
  const startTime = new Date(Date.now() - timeRange);

  const readingsQuery = query(
    readingsCollection,
    where("timestamp", ">=", startTime),
    orderBy("timestamp", "desc"),
    limit(1000) // Adjust this limit as needed
  );

  const readingsSnapshot = await getDocs(readingsQuery);

  const readingsData = readingsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      timestamp: data.timestamp.toDate(),
      temperature: data.temperature,
      humidity: data.humidity,
      battery: data.battery,
    };
  }) as NodeReading[];

  return readingsData.reverse();
};

export function useNodes() {
  const {
    data: nodes,
    mutate,
    error,
    isValidating,
  } = useSWR<Node[], Error>("nodes", fetchNodes, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  return {
    nodes: nodes || [],
    mutate,
    loading: !error && !nodes,
    error,
    isValidating,
  };
}

export function useNodeData(nodeId: string, hoursAgo: number = 1) {
  const timeRange = ONE_HOUR * hoursAgo;
  const {
    data: readings,
    error,
    isValidating,
  } = useSWR<NodeReading[], Error>([nodeId, timeRange], fetchNodeData, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  return {
    readings: readings || [],
    loading: !error && !readings,
    error,
    isValidating,
  };
}

export async function deleteNodeAndReadings(nodeId: string): Promise<void> {
  const batch = writeBatch(db);
  const readingsCollection = collection(db, "nodes", nodeId, "readings");
  const readingsSnapshot = await getDocs(readingsCollection);
  readingsSnapshot.docs.forEach((readingDoc) => {
    batch.delete(doc(db, "nodes", nodeId, "readings", readingDoc.id));
  });
  batch.delete(doc(db, "nodes", nodeId));
  await batch.commit();
}
