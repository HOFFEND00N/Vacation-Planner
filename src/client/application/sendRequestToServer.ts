import { HttpMethod } from "../types";

export async function sendRequestToServer({ url, method }: { url: string; method: HttpMethod }) {
  const response = await fetch(url, { method: method });
  return await response.json();
}
