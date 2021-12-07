import moment from "moment";

export function getDateDifferenceInDays({ start, end }: { start: Date; end: Date }) {
  return moment(end).diff(moment(start), "day") + 1;
}
