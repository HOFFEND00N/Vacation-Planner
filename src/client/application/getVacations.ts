import { BASE_SERVER_URL } from "../constants";
import { Vacation } from "../../shared";
import { sendGetRequestToServer } from "./sendGetRequestToServer";

export const getVacations = async (usersIds: string[]): Promise<Vacation[]> => {
  const queryStringElements = usersIds.map((usersId) => `id=${usersId}`);
  const url = `${BASE_SERVER_URL}/vacations?${queryStringElements.join("&")}`;

  const response = await sendGetRequestToServer(url);

  return response.vacations.map((vacation) => {
    vacation.start = new Date(vacation.start);
    vacation.end = new Date(vacation.end);
    return vacation;
  });
};
