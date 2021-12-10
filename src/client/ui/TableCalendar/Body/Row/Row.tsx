import React from "react";
import "./row.css";

type RowProps = {
  dataTestId: string;
};

export const Row: React.FC<RowProps> = ({ children, dataTestId }) => {
  return (
    <div data-testid={dataTestId} className={"row"}>
      {children}
    </div>
  );
};
