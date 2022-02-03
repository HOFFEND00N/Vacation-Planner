import { Request } from "express";

export interface IMyRequest<P, resBody, reqBody, reqQuery, Locals>
  extends Request<P, resBody, reqBody, reqQuery, Locals> {
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
