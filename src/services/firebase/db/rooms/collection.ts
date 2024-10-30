import { collection } from "firebase/firestore";

import { firestore } from "@/services/firebase/db";

import { roomConverter } from "./converter";

export const roomsCollection = collection(firestore, "rooms").withConverter(
  roomConverter
);
