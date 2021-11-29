import React from "react";
import cn from "classnames";
import styles from "./table-calendar-legend-item.css";

type tableCalendarLegendItemProps = {
  className: string;
  itemName: string;
};

export function TableCalendarLegendItem({ className, itemName }: tableCalendarLegendItemProps) {
  return (
    <div className={"table-calendar-legend-element-container"} data-testid={"table-calendar-legend-element-container"}>
      <div className={cn(styles["table-calendar-legend-element"], className)} />
      <div> {itemName} </div>
    </div>
  );
}
