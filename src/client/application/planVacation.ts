import { BASE_SERVER_URL } from "../constants";
import { sendPostRequestToServer } from "./sendPostRequestToServer";

export const planVacation = async ({
  vacationStartDate,
  vacationEndDate,
}: {
  vacationStartDate: Date;
  vacationEndDate: Date;
}) => {
  const url = `${BASE_SERVER_URL}/vacations`;
  return await sendPostRequestToServer({
    url,
    body: {
      vacationStartDate,
      vacationEndDate,
    },
  });
};
