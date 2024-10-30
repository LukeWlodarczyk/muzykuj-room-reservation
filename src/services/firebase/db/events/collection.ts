import { collection } from "firebase/firestore";

import { firestore } from "@/services/firebase/db";

import { eventConverter } from "./converter";

export const eventsCollection = collection(firestore, "events").withConverter(
  eventConverter
);
