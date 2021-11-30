import { Vacation } from "../domain/vacation";

export async function getVacations(usersIds: string[]): Promise<Vacation[]> {
  const queryStringElements: string[] = [];
  for (const usersId of usersIds) {
    queryStringElements.push(`id=${usersId}`);
  }
  const url = `${SITE_PROTOCOL}${SITE_DOMAIN}${SITE_SERVER_PORT}/vacations?${queryStringElements.join("&")}`;

  const response = await fetch(url, { method: "get" });
  const parsedResponse = await response.json();
  return parsedResponse.vacations.map((vacation) => {
    vacation.start = new Date(vacation.start);
    vacation.end = new Date(vacation.end);
    return vacation;
  });
}
