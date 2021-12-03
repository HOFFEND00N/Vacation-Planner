import React from "react";
import cn from "classnames";
import styles from "./legend-item.css";

type tableCalendarLegendItemProps = {
  className: string;
  itemName: string;
};

export function LegendItem({ className, itemName }: tableCalendarLegendItemProps) {
  return (
    <div className={"legend-item-container"} data-testid={"legend-item-container"}>
      <div className={cn(styles["legend-item"], className)} />
      <div> {itemName} </div>
    </div>
  );
}
