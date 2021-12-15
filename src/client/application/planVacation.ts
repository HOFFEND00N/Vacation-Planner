import { BASE_SERVER_URL } from "../constants";

export async function planVacation() {
  return await fetch(`${BASE_SERVER_URL}/plan-vacation`, { method: "post" });
}
