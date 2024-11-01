import { addDoc, deleteDoc } from "firebase/firestore";

import { eventsCollectionRef, getEventDocRef } from "./refs";
import { Event } from "./types";

export const addEvent = (event: Event) => addDoc(eventsCollectionRef, event);

export const deleteEvent = (id: Event["id"]) => deleteDoc(getEventDocRef(id));
