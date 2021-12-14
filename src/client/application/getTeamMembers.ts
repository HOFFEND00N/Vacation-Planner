import { User } from "../domain/types";

export async function getTeamMembers(): Promise<{ teamMembers: User[]; currentUser: User }> {
  const response = await fetch(`${SITE_PROTOCOL}${SITE_DOMAIN}${SITE_SERVER_PORT}/team-members`, { method: "get" });
  const parsedResponse = await response.json();
  return { teamMembers: parsedResponse.team, currentUser: parsedResponse.currentUser };
}
