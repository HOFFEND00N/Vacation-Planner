export async function getTeamMembers(): Promise<{ name: string; id: string }[]> {
  const response = await fetch(`${SITE_PROTOCOL}${SITE_DOMAIN}${SITE_SERVER_PORT}/team-members`, { method: "get" });
  const parsedResponse = await response.json();
  return parsedResponse.team;
}
