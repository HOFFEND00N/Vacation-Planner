import { HttpMethod } from "../types";

export const sendRequestToServer = async ({ url, method }: { url: string; method: HttpMethod }) => {
  const response = await fetch(url, { method });
  const parsedResponse = await response.json();
  if (parsedResponse.error) {
    throw new Error(parsedResponse.error);
  }
  return parsedResponse;
};
