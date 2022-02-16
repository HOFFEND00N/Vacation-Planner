import { BASE_SERVER_URL } from "../constants";
import { sendDeleteRequestToServer } from "./sendDeleteRequestToServer";

export const cancelUnapprovedVacation = async (vacationId: string) => {
  const url = `${BASE_SERVER_URL}/vacations?id=${vacationId}`;
  await sendDeleteRequestToServer(url);
};
