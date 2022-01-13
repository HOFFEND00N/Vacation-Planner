import React from "react";
import cn from "classnames";
import "./cell.css";

type CellProps = {
  value?: number | string;
  classNames?: string;
  onClick?: () => void;
  isDaysColumn?: boolean;
};

export const Cell = ({ value, classNames, onClick, isDaysColumn }: CellProps) => {
  const cellClassNames = cn("cell", {
    [`${classNames}`]: !!classNames,
    ["cell-days-column"]: isDaysColumn,
  });

  return (
    <div className={cellClassNames} data-testid="table-cell" onClick={onClick}>
      {value}
    </div>
  );
};
