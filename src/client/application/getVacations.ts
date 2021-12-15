import { Vacation } from "../domain/types";
import { BASE_SERVER_URL } from "../constants";

export async function getVacations(usersIds: string[]): Promise<Vacation[]> {
  const queryStringElements = usersIds.map((usersId) => `id=${usersId}`);
  const url = `${BASE_SERVER_URL}/vacations?${queryStringElements.join("&")}`;

  const response = await fetch(url, { method: "get" });
  const parsedResponse = await response.json();
  return parsedResponse.vacations.map((vacation) => {
    vacation.start = new Date(vacation.start);
    vacation.end = new Date(vacation.end);
    return vacation;
  });
}
