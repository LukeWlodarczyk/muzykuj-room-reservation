import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export const getStartOfCurrentWeekDate = () =>
  dayjs().isoWeekday(1).startOf("day").toDate();
