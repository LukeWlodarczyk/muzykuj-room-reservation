export enum EventType {
  WEEKLY = "WEEKLY",
  CUSTOM = "CUSTOM",
}

export type WeeklyEvent = {
  id: string;
  ownerId: string;
  ownerName: string;
  roomId: string;
  type: EventType.WEEKLY;
  date: null;
  startDate: string;
  endDate: string | null;
  hour: number;
  dayOfWeek: number;
};

export type CustomEvent = {
  id: string;
  ownerId: string;
  ownerName: string;
  roomId: string;
  type: EventType.CUSTOM;
  startDate: null;
  endDate: null;
  date: string;
  hour: number;
  dayOfWeek: number;
};

export type Event = CustomEvent | WeeklyEvent;
