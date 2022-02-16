import { HttpMethod } from "../types";

export const sendPostRequestToServer = async ({ url, body }: { url: string; body: unknown }) => {
  const response = await fetch(url, {
    method: HttpMethod.POST,
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const parsedResponse = await response.json();
  if (response.status >= 400) {
    throw new Error(parsedResponse.error);
  }
  return parsedResponse;
};
