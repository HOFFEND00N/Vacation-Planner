import { HttpMethod } from "../types";

export const sendDeleteRequestToServer = async (url: string) => {
  const response = await fetch(url, {
    method: HttpMethod.DELETE,
  });
  const parsedResponse = await response.json();
  if (response.status >= 400) {
    throw new Error(parsedResponse.error);
  }
  return parsedResponse;
};
