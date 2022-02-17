import express, { Response } from "express";
import bodyParser from "body-parser";
import { IRequestWithSSO } from "../types";
import { Vacation } from "../../shared";
import { getTeamVacations } from "../DBHelpers/getTeamVacations";
import { createVacation } from "../DBHelpers/createVacation";
import { DB_CONNECTION } from "../constants";

const vacationsRouter = express.Router();
const jsonParser = bodyParser.json();

vacationsRouter.get(
  "/",
  async (
    req: IRequestWithSSO<Record<string, unknown>, { id: string[] }>,
    res: Response<{ error: string } | { vacations: Vacation[] }, Record<string, unknown>>
  ) => {
    try {
      const dbConnection = req.app.get(DB_CONNECTION);
      const usersIds = req.query.id;

      const usersVacations = await getTeamVacations({ usersIds, dbConnection });
      res.send({ vacations: usersVacations });
    } catch (e) {
      res.status(500).send({ error: "Something went wrong, please try again later" });
    }
  }
);

vacationsRouter.post(
  "/",
  jsonParser,
  async (
    req: IRequestWithSSO<Record<string, unknown>, unknown, { vacationStartDate: Date; vacationEndDate: Date }>,
    res: Response<{ error: string } | { vacation: Vacation }, Record<string, unknown>>
  ) => {
    try {
      const dbConnection = req.app.get(DB_CONNECTION);
      //userId: req.sso.user?.adUser?.objectGUID[0] ||| userName: req.sso.user?.displayName
      const vacation = await createVacation({
        userId: "D1E5D597-93FC-4AEA-8FFF-D92CADD0F639",
        dbConnection,
        userName: "Anna Kozlova",
        vacationStartDate: req.body.vacationStartDate,
        vacationEndDate: req.body.vacationEndDate,
      });
      res.status(201).send({ vacation });
    } catch (e) {
      res.status(500).send({ error: "Something went wrong, please try again later" });
    }
  }
);

export { vacationsRouter };
