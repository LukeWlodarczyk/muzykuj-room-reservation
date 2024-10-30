import { Timestamp } from "firebase/firestore";

export enum EventType {
  WEEKLY = "WEEKLY",
  CUSTOM = "CUSTOM",
}

export const assertUnreachable = <T>(_: T | never, message: string): never => {
  throw new Error(message);
};

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
