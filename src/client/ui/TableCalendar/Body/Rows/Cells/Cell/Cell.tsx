import React from "react";
import cn from "classnames";
import "./cell.css";

type CellProps = {
  value?: number | string;
  classNames?: string;
  onClick?: () => void;
};

export const Cell = ({ value, classNames, onClick }: CellProps) => {
  const cellClassNames = cn("cell", {
    [`${classNames}`]: !!classNames,
  });

  return (
    <div className={cellClassNames} data-testid="table-cell" onClick={onClick}>
      {value}
    </div>
  );
};
