import { User } from "../domain/types";
import { BASE_SERVER_URL } from "../constants";

export async function getTeamMembers(): Promise<{ teamMembers: User[]; currentUser: User }> {
  const response = await fetch(`${BASE_SERVER_URL}/team-members`, { method: "get" });
  const parsedResponse = await response.json();
  return { teamMembers: parsedResponse.team, currentUser: parsedResponse.currentUser };
}
