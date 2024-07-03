import { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Node, NodeReading } from "@/app/types";

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
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
          const latestReadingSnapshot = await getDocs(latestReadingQuery);

          if (!latestReadingSnapshot.empty) {
            const readingData = latestReadingSnapshot.docs[0].data();
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
        setNodes(nodesWithReadings);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
        setLoading(false);
      }
    };

    fetchNodes();
  }, []);

  return { nodes, loading, error };
}

export function useNodeData(nodeId: string, timeRange: number = 3600000) {
  const [readings, setReadings] = useState<NodeReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNodeData = async () => {
      try {
        const readingsCollection = collection(db, "nodes", nodeId, "readings");
        const startTime = new Date(Date.now() - timeRange);

        const readingsQuery = query(
          readingsCollection,
          where("timestamp", ">=", startTime),
          orderBy("timestamp", "desc"),
          limit(60) // Limit to 60 readings max
        );

        const readingsSnapshot = await getDocs(readingsQuery);

        const readingsData = readingsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            timestamp: data.timestamp.toDate(),
            temperature: data.temperature,
            humidity: data.humidity,
          };
        }) as NodeReading[];

        setReadings(readingsData.reverse());
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
        setLoading(false);
      }
    };

    fetchNodeData();
  }, [nodeId, timeRange]);

  return { readings, loading, error };
}
