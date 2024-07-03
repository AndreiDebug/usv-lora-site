import { db } from "@/lib/firebase/server";
import { NodePayloadSchema } from "@/schemas";
import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("--- UPLINK ---");
    console.log(body);

    const validatedData = NodePayloadSchema.parse(body);

    const deviceId = validatedData.end_device_ids.device_id;
    const timestamp = new Date(validatedData.received_at);

    const nodeDocRef = db.collection("nodes").doc(deviceId);

    const readingDocRef = nodeDocRef.collection("readings").doc();

    const readingData = {
      timestamp: Timestamp.fromDate(timestamp),
      ...validatedData.uplink_message.decoded_payload,
    };

    const batch = db.batch();

    batch.set(
      nodeDocRef,
      {
        device_id: deviceId,
        last_update: Timestamp.fromDate(timestamp),
      },
      { merge: true }
    );

    batch.set(readingDocRef, readingData);
    await batch.commit();

    return Response.json({ message: "Data validated and stored successfully" });
  } catch (error) {
    console.error("Error processing uplink:", error);

    if (error instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid data format", details: error.errors },
        { status: 400 }
      );
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
