import { BASE_SERVER_URL } from "../constants";
import { HttpMethod } from "../types";
import { sendRequestToServer } from "./sendRequestToServer";

export const planVacation = async ({
  vacationStartDate,
  vacationEndDate,
}: {
  vacationStartDate: Date;
  vacationEndDate: Date;
}) => {
  const url = `${BASE_SERVER_URL}/vacations`;
  return await sendRequestToServer({
    url,
    method: HttpMethod.POST,
    body: JSON.stringify({
      vacationStartDate,
      vacationEndDate,
    }),
  });
};
