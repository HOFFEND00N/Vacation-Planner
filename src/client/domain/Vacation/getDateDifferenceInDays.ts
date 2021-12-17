import moment from "moment";

export const getDateDifferenceInDays = ({ start, end }: { start: Date; end: Date }) => {
  return moment(end).diff(moment(start), "day") + 1;
};
