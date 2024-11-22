import dayjs from "dayjs";
import { Timestamp } from "firebase-admin/firestore";

import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";

dayjs.extend(isSameOrBefore);

export const transformIsoToTimestamp = (iso: string) =>
  Timestamp.fromDate(new Date(iso));

export const isSameDateOrBefore = (
  firstDate: Timestamp,
  secondDate: Timestamp
) => {
  return dayjs(firstDate.toDate()).isSameOrBefore(
    dayjs(secondDate.toDate()),
    "hour"
  );
};
