import { HttpMethod } from "../types";

export const sendDeleteRequestToServer = async (url: string) => {
  const response = await fetch(url, {
    method: HttpMethod.DELETE,
  });
  if (response.status >= 400) {
    throw new Error("Something went wrong, please try again later");
  }
};
