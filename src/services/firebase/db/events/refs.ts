import { collection, doc } from "firebase/firestore";

import { firestore } from "@/services/firebase/db";

import { eventConverter } from "./converter";
import { Event } from "./types";

export const eventsCollectionRef = collection(
  firestore,
  "events"
).withConverter(eventConverter);

export const getEventDocRef = (id: Event["id"]) => doc(firestore, "events", id);
