import { User } from "../domain/user";

export async function getTeamMembers(): Promise<User[]> {
  const response = await fetch(`${SITE_PROTOCOL}${SITE_DOMAIN}${SITE_SERVER_PORT}/team-members`, { method: "get" });
  const parsedResponse = await response.json();
  return parsedResponse.team;
}
