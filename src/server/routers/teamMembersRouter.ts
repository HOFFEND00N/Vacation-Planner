import express, { Response } from "express";
import { IRequestWithSSO } from "../types";
import { User } from "../../shared";
import { getTeamMembers } from "../ADHelpers/getTeamMembers";

const teamMembersRouter = express.Router();

teamMembersRouter.get(
  "/",
  async (
    req: IRequestWithSSO<Record<string, unknown>>,
    res: Response<{ error: string } | { team: User[]; currentUser: User }, Record<string, unknown>>
  ) => {
    try {
      // const username = req.sso.user?.adUser?.userPrincipalName;
      const team = await getTeamMembers("anna.kozlova@forsta.com");
      res.send({
        team,
        currentUser: { id: "D1E5D597-93FC-4AEA-8FFF-D92CADD0F639", name: "Anna Kozlova" },
      });
    } catch (e) {
      res.status(500).send({ error: "Something went wrong, please try again later" });
    }
  }
);

export { teamMembersRouter };
