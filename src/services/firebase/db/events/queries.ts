import { and, or, query } from "firebase/firestore";
import { CUSTOM_EVENT, WEEKLY_EVENT } from "./clauses";
import { eventsCollection } from "./collection";

export const currentAndFutureEventsQuery = query(
  eventsCollection,
  or(
    and(CUSTOM_EVENT.TYPE, CUSTOM_EVENT.CURRENT_WEEK_OR_FUTURE),
    and(
      WEEKLY_EVENT.TYPE,
      or(
        WEEKLY_EVENT.STARTING_CURRENT_WEEK_OR_FUTURE,
        WEEKLY_EVENT.ENDING_CURRENT_WEEK_OR_FUTURE,
        WEEKLY_EVENT.INFINITE_REPEATING
      )
    )
  )
);
