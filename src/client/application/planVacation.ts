import { BASE_SERVER_URL } from "../constants";
import { HttpMethod } from "../types";
import { sendRequestToServer } from "./sendRequestToServer";

export const planVacation = async () => {
  const url = `${BASE_SERVER_URL}/vacations`;
  return await sendRequestToServer({ url, method: HttpMethod.POST });
};
