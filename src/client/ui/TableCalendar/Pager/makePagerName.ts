import moment from "moment";

export function makePagerName(today: moment.Moment) {
  return `${today.format("MMMM")} ${today.year()}`;
}
