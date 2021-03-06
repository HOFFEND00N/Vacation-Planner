import React from "react";
import "./application.css";
import moment from "moment";

type ApplicationProps = {
  vacationStart: moment.Moment;
  vacationEnd: moment.Moment;
  additionalVacationDays?: number;
  userName: string;
  currentDate: moment.Moment;
};

export const Application = ({
  vacationStart,
  vacationEnd,
  additionalVacationDays,
  userName,
  currentDate,
}: ApplicationProps) => {
  let text = "";
  if (additionalVacationDays) {
    if (additionalVacationDays === 1) {
      text = `, из них ${additionalVacationDays} дополнительный день отпуска за ${vacationStart.year()} год`;
    } else if (additionalVacationDays < 5) {
      text = `, из них ${additionalVacationDays} дополнительных дня отпуска за ${vacationStart.year()} год`;
    } else {
      text = `, из них ${additionalVacationDays} дополнительных дней отпуска за ${vacationStart.year()} год`;
    }
  }

  return (
    <div className="application-to-print" data-testid="application">
      <div className="application-to-print__header" data-testid="application-to-print__header">
        <div>Генеральному директору</div>
        <div>ООО "Конфёрмит" </div>
        <div>Мастрюкову Д.Л. </div>
        <div>от {userName} </div>
      </div>
      <div className="application-to-print__headline">Заявление</div>
      <div>
        Прошу предоставить мне отпуск с {vacationStart.format("DD.MM.YYYY")} до {vacationEnd.format("DD.MM.YYYY")}
        {text}
      </div>
      <div className="application-to-print__footer">{currentDate.format("DD.MM.YYYY")}</div>
    </div>
  );
};
