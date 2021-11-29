import React from "react";

type CellProps = { value: number | string; className: string; handleOnClick?: React.MouseEventHandler<HTMLDivElement> };

export function Cell({ value, className, handleOnClick }: CellProps) {
  return (
    <div className={className} onClick={handleOnClick} data-testid={""}>
      {value}
    </div>
  );
}
