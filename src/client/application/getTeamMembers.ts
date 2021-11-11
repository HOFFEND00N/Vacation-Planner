export async function getTeamMembers(): Promise<string[]> {
  const response = await fetch(`${SITE_PROTOCOL}${SITE_DOMAIN}${SITE_SERVER_PORT}/team-members`, { method: "get" });
  const parsedResponse = await response.json();
  return parsedResponse.team;
}
