import { Request } from "express";

export interface IRequestWithSSO<Locals, reqQuery = unknown, reqBody = unknown>
  extends Request<unknown, unknown, reqBody, reqQuery, Locals> {
  sso: {
    user: {
      adUser: {
        objectGUID: string[];
        userPrincipalName: string;
      };
      displayName: string;
    };
  };
}
