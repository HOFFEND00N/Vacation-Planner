import { HttpMethod } from "../types";

export const sendRequestToServer = async ({
  url,
  method,
  body,
}: {
  url: string;
  method: HttpMethod;
  body?: string;
}) => {
  const response = await fetch(url, {
    method,
    body,
    headers:
      method === HttpMethod.POST
        ? {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        : undefined,
  });
  const parsedResponse = await response.json();
  if (response.status >= 400) {
    throw new Error(parsedResponse.error);
  }
  return parsedResponse;
};
