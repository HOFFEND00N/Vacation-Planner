import { MouseEventHandler } from "react";

export type Cell = {
  value: string | number;
  classNames: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
