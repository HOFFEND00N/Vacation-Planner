import React from "react";
import { User } from "../../../domain/types";

export const AppContext = React.createContext({
  currentUser: { name: "", id: "" },
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  setCurrentUser: (currentUser: User) => {},
});
