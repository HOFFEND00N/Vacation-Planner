import moment from "moment";
import { BASE_SERVER_URL } from "../constants";
import { Vacation } from "../../shared";
import { sendGetRequestToServer } from "./sendGetRequestToServer";

export const getVacations = async (usersIds: string[]): Promise<Vacation[]> => {
  const queryStringElements = usersIds.map((usersId) => `id=${usersId}`);
  const url = `${BASE_SERVER_URL}/vacations?${queryStringElements.join("&")}`;

  const response = await sendGetRequestToServer(url);

  return response.vacations.map((vacation) => {
    // use moment to get rid of timezone error with Date constructor. e.g. new Date("2021-11-04") creates date, but add hours
    // depends on local timezone, if you are in GMT+3 -> adds unexpected 3 hours to created date.
    vacation.start = moment(vacation.start, "YYYY-MM-DD").toDate();
    vacation.end = moment(vacation.end, "YYYY-MM-DD").toDate();
    return vacation;
  });
};
