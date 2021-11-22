import { User } from "../domain/user";

export async function getTeamMembers(): Promise<{ team: User[]; currentUser: User }> {
  const response = await fetch(`${SITE_PROTOCOL}${SITE_DOMAIN}${SITE_SERVER_PORT}/team-members`, { method: "get" });
  const parsedResponse = await response.json();
  return { team: parsedResponse.team, currentUser: parsedResponse.currentUser };
}
