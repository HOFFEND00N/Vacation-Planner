import { UniqueId } from "../types";

type Email = string;
type Password = string;

export type User = {
  id: UniqueId;
  email: Email;
  password: Password;
}