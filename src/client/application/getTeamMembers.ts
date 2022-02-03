import { BASE_SERVER_URL } from "../constants";
import { User } from "../../shared";
import { sendGetRequestToServer } from "./sendGetRequestToServer";

export const getTeamMembers = async (): Promise<{ teamMembers: User[]; currentUser: User }> => {
  const url = `${BASE_SERVER_URL}/team-members`;
  const response = await sendGetRequestToServer(url);

  return { teamMembers: response.team, currentUser: response.currentUser };
};
