import moment from "moment";

export const makePagerName = (currentTableCalendarDate: moment.Moment) => {
  return `${currentTableCalendarDate.format("MMMM")} ${currentTableCalendarDate.year()}`;
};
