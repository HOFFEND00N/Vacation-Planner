import { User } from "../domain/types";
import { BASE_SERVER_URL } from "../constants";
import { HttpMethod } from "../types";
import { sendRequestToServer } from "./sendRequestToServer";

export const getTeamMembers = async (): Promise<{ teamMembers: User[]; currentUser: User }> => {
  const url = `${BASE_SERVER_URL}/team-members`;
  const response = await sendRequestToServer({ url, method: HttpMethod.GET });

  return { teamMembers: response.team, currentUser: response.currentUser };
};
