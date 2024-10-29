import {
  and,
  collection,
  DocumentData,
  FirestoreDataConverter,
  or,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  where,
  WithFieldValue,
} from "firebase/firestore";

import { firestore } from "@/services/firebase/db";

import { getCurrentWeekMondayDate } from "@/helpers/date";

export enum EventType {
  WEEKLY = "WEEKLY",
  CUSTOM = "CUSTOM",
}

function assertUnreachable<T>(_: T | never, message: string): never {
  throw new Error(message);
}

export type Event = {
  id: string;
  hour: number;
  ownerId: string;
  ownerName: string;
  roomId: string;
} & (
  | {
      type: EventType.WEEKLY;
      startDate: Timestamp;
      endDate: Timestamp | null;
    }
  | {
      type: EventType.CUSTOM;
      date: Timestamp;
    }
);

export const eventConverter: FirestoreDataConverter<Event> = {
  toFirestore(event: WithFieldValue<Event>): DocumentData {
    switch (event.type) {
      case EventType.WEEKLY:
        return {
          startDate: event.startDate,
          endDate: event.endDate,
          date: null,
          hour: event.hour,
          type: event.type,
          ownerId: event.ownerId,
          ownerName: event.ownerName,
          roomId: event.roomId,
        };
      case EventType.CUSTOM:
        return {
          date: event.date,
          startDate: null,
          endDate: null,
          hour: event.hour,
          type: event.type,
          ownerId: event.ownerId,
          ownerName: event.ownerName,
          roomId: event.roomId,
        };
      default:
        return assertUnreachable(
          event.type,
          `Unknown Event type - ${event.type}`
        );
    }
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Event => {
    const data = snapshot.data(options);

    switch (data.type) {
      case EventType.WEEKLY:
        return {
          id: snapshot.id,
          startDate: data.startDate,
          endDate: data.endDate,
          hour: data.hour,
          type: data.type,
          ownerId: data.ownerId,
          ownerName: data.ownerName,
          roomId: data.roomId,
        };
      case EventType.CUSTOM:
        return {
          id: snapshot.id,
          date: data.date,
          hour: data.hour,
          type: data.type,
          ownerId: data.ownerId,
          ownerName: data.ownerName,
          roomId: data.roomId,
        };
      default:
        return assertUnreachable(
          data.type,
          `Unknown Event type - ${data.type}`
        );
    }
  },
};

export const eventsCollection = query(
  collection(firestore, "events").withConverter(eventConverter),
  or(
    and(
      where("type", "==", EventType.CUSTOM),
      where("date", ">=", Timestamp.fromDate(getCurrentWeekMondayDate()))
    ),
    and(
      where("type", "==", EventType.WEEKLY),
      or(
        where(
          "startDate",
          ">=",
          Timestamp.fromDate(getCurrentWeekMondayDate())
        ),
        where("endDate", ">=", Timestamp.fromDate(getCurrentWeekMondayDate())),
        where("endDate", "==", null)
      )
    )
  )
);
