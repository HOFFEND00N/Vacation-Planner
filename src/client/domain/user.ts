import { UniqueId } from "../../types/types";

type Email = string;
type Password = string;

export type User = {
  id: UniqueId;
  email: Email;
  password: Password;
};
