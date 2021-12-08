import moment from "moment";

export function makePagerName(currentTableCalendarDate: moment.Moment) {
  return `${currentTableCalendarDate.format("MMMM")} ${currentTableCalendarDate.year()}`;
}
