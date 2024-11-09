import { Timestamp, where } from "firebase/firestore";

import { getStartOfCurrentWeekDate } from "@/features/reservations/utils/date";

import { EventType } from "./types";

export const CUSTOM_EVENT = {
  TYPE: where("type", "==", EventType.CUSTOM),
  CURRENT_WEEK_OR_FUTURE: where(
    "date",
    ">=",
    Timestamp.fromDate(getStartOfCurrentWeekDate())
  ),
};

export const WEEKLY_EVENT = {
  TYPE: where("type", "==", EventType.WEEKLY),
  INFINITE_REPEATING: where("endDate", "==", null),
  STARTING_CURRENT_WEEK_OR_FUTURE: where(
    "startDate",
    ">=",
    Timestamp.fromDate(getStartOfCurrentWeekDate())
  ),
  ENDING_CURRENT_WEEK_OR_FUTURE: where(
    "endDate",
    ">=",
    Timestamp.fromDate(getStartOfCurrentWeekDate())
  ),
};
