import { Vacation } from "../domain/types";
import { BASE_SERVER_URL } from "../constants";
import { HttpMethod } from "../types";
import { sendRequestToServer } from "./sendRequestToServer";

export const getVacations = async (usersIds: string[]): Promise<Vacation[]> => {
  const queryStringElements = usersIds.map((usersId) => `id=${usersId}`);
  const url = `${BASE_SERVER_URL}/vacations?${queryStringElements.join("&")}`;

  const response = await sendRequestToServer({ url, method: HttpMethod.GET });

  return response.vacations.map((vacation) => {
    vacation.start = new Date(vacation.start);
    vacation.end = new Date(vacation.end);
    return vacation;
  });
};
