import React from "react";
import cn from "classnames";
import "./legend-item.css";

type tableCalendarLegendItemProps = {
  className: string;
  itemName: string;
};

export const LegendItem = ({ className, itemName }: tableCalendarLegendItemProps) => {
  return (
    <div className="legend-item-container" data-testid="legend-item-container">
      <div className={cn("legend-item", className)} />
      <div> {itemName} </div>
    </div>
  );
};
