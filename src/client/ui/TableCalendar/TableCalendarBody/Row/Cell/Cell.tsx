import React from "react";

type CellProps = { value: number | string; className: string; handleOnClick?: React.MouseEventHandler<HTMLDivElement> };

//TODO: wrap Table calendar component in React.context to avoid passing props throw multiple components (handleOnClick)
export function Cell({ value, className, handleOnClick }: CellProps) {
  return (
    <div className={className} onClick={handleOnClick} data-testid={"table-cell"}>
      {value}
    </div>
  );
}
