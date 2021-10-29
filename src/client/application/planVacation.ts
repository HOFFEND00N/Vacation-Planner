export async function planVacation() {
  return await fetch(`${SITE_PROTOCOL}${SITE_DOMAIN}${SITE_SERVER_PORT}/plan-vacation`, { method: "post" });
}
