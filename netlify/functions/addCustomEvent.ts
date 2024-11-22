import { Config } from "@netlify/functions";
import firebaseAdmin from "firebase-admin";

import { createResponse, createUnauthorizedResponse } from "../utils/response";
import { firestoreAdmin } from "../utils/firebase/firebase";
import * as auth from "../utils/firebase/auth";
import { CustomEvent, EventType } from "../utils/firebase/firestore/types";
import { isSameDateOrBefore, transformIsoToTimestamp } from "../utils/date";

type RequestBody = {
  event?: CustomEvent;
};

const validateCustomEventBody = (
  event: CustomEvent,
  userId: string
): event is CustomEvent => {
  if (!event) return false;
  if (event.type !== EventType.CUSTOM) return false;
  if (event.ownerId !== userId) return false;

  return true;
};

export default async (req: Request) => {
  console.log("start");
  try {
    const decodedToken = await auth.verifyToken(req);

    if (!decodedToken) return createUnauthorizedResponse();

    const userId = decodedToken.uid;

    const body: RequestBody = await req.json();
    const { event } = body;

    if (!event) {
      console.log("Validation failed - no event provided");
      return;
    }

    const isValid = validateCustomEventBody(event, userId);

    if (!isValid) {
      console.log("Validation failed");
      return;
    }

    console.log(event);

    const eventCollection = firestoreAdmin.collection("events");

    const customEventsQuery = eventCollection
      .where("type", "==", EventType.CUSTOM)
      .where("roomId", "==", event.roomId)
      .where("date", "==", transformIsoToTimestamp(event.date))
      .where("hour", "==", event.hour);

    const weeklyEventsQuery = eventCollection
      .where("type", "==", EventType.WEEKLY)
      .where("roomId", "==", event.roomId)
      .where("startDate", "<=", transformIsoToTimestamp(event.date))
      .where("dayOfWeek", "==", event.dayOfWeek)
      .where("hour", "==", event.hour);

    console.log("start transaction");
    await firestoreAdmin.runTransaction(async (transaction) => {
      const [customEventsCollision, weeklyEventsPotentialCollision] =
        await Promise.all([
          transaction.get(customEventsQuery),
          transaction.get(weeklyEventsQuery),
        ]);

      if (!customEventsCollision.empty)
        return Promise.reject("Collision with custom event");

      const weeklyEventsCollision = weeklyEventsPotentialCollision.docs
        .map((doc) => doc.data())
        .filter(
          (weeklyEvent) =>
            weeklyEvent.endDate === null ||
            isSameDateOrBefore(
              transformIsoToTimestamp(event.date),
              weeklyEvent.endDate
            )
        );

      if (weeklyEventsCollision.length > 0)
        return Promise.reject("Collision with weekly event");

      transaction.set(eventCollection.doc(), {
        ...event,
        date: transformIsoToTimestamp(event.date),
        startDate: null,
        endDate: null,
        createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      });
    });
  } catch (error) {
    console.log("Transaction failed: ", error);
    return createResponse({ status: 400, message: "Transaction failed" });
  }

  return createResponse({ status: 200, message: "Success" });
};

export const config: Config = {
  method: "POST",
};
