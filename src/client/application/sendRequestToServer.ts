import { HttpMethod } from "../types";

export const sendRequestToServer = async ({ url, method }: { url: string; method: HttpMethod }) => {
  const response = await fetch(url, { method: method });
  return await response.json();
};
