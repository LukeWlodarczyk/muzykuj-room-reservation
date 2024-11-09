import { createContext, useContext, FC, ReactNode } from "react";
import { FirestoreError } from "firebase/firestore";
import {
  useCollectionData,
  useCollectionDataOnce,
} from "react-firebase-hooks/firestore";

import { Room, roomsCollectionRef } from "@/features/reservations/db/rooms";
import {
  Event,
  currentAndFutureEventsQuery,
} from "@/features/reservations/db/events";

export type ReservationsContextType = {
  rooms: {
    value: Room[];
    isLoading: boolean;
    error?: FirestoreError;
  };
  events: {
    value: Event[];
    isLoading: boolean;
    error?: FirestoreError;
  };
};

const ReservationsContext = createContext<ReservationsContextType | null>(null);

export const ReservationsProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [rooms = [], roomsIsLoading, roomsError] =
    useCollectionDataOnce<Room>(roomsCollectionRef);

  const [events = [], eventsIsLoading, eventsError] = useCollectionData<Event>(
    currentAndFutureEventsQuery
  );

  return (
    <ReservationsContext.Provider
      value={{
        rooms: {
          value: rooms,
          isLoading: roomsIsLoading,
          error: roomsError,
        },
        events: {
          value: events,
          isLoading: eventsIsLoading,
          error: eventsError,
        },
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useReservationsContext = () => {
  const context = useContext(ReservationsContext);
  if (!context) {
    throw new Error(
      "useReservationsContext must be used within a ReservationsProvider"
    );
  }

  return context;
};
