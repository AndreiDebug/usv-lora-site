import { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Node, NodeReading } from "@/types";

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const nodesCollection = collection(db, "nodes");

    const unsubscribe = onSnapshot(
      nodesCollection,
      (snapshot) => {
        const fetchNodeData = async () => {
          try {
            const nodesPromises = snapshot.docs.map(async (doc) => {
              const nodeData = doc.data();
              const readingsCollection = collection(doc.ref, "readings");
              const latestReadingQuery = query(
                readingsCollection,
                orderBy("timestamp", "desc"),
                limit(1)
              );

              return new Promise<Node | null>((resolve) => {
                const unsubscribeReading = onSnapshot(
                  latestReadingQuery,
                  (readingSnapshot) => {
                    if (!readingSnapshot.empty) {
                      const readingData = readingSnapshot.docs[0].data();
                      resolve({
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
                      });
                    } else {
                      resolve(null);
                    }
                    unsubscribeReading(); // Unsubscribe after getting the latest reading
                  },
                  (err) => {
                    console.error("Error fetching latest reading:", err);
                    resolve(null);
                  }
                );
              });
            });

            const nodesWithReadings = (await Promise.all(nodesPromises)).filter(
              (node): node is Node => node !== null
            );
            setNodes(nodesWithReadings);
            setLoading(false);
          } catch (err) {
            setError(
              err instanceof Error
                ? err
                : new Error("An unknown error occurred")
            );
            setLoading(false);
          }
        };

        fetchNodeData();
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
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
          orderBy("timestamp", "desc")
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
