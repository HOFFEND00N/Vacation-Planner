import React from "react";
import "./application.css";
import moment from "moment";

type ApplicationProps = {
  vacationStart: moment.Moment;
  vacationEnd: moment.Moment;
  additionalVacationDays?: number;
  userName: string;
};

export const Application = ({ vacationStart, vacationEnd, additionalVacationDays, userName }: ApplicationProps) => {
  let text = "";
  if (additionalVacationDays) {
    if (additionalVacationDays === 1) {
      text = `, из них ${additionalVacationDays} дополнительный день отпуска за ${moment().year()} год`;
    } else {
      text = `, из них ${additionalVacationDays} дополнительных дня отпуска за ${moment().year()} год`;
    }
  }

  return (
    <div className="application">
      <div className="application-header">
        <div>Генеральному директору</div>
        <div>ООО "Конфёрмит" </div>
        <div>Мастрюкову Д.Л. </div>
        <div>от {userName} </div>
      </div>
      <div className="application-headline">Заявление</div>
      <div>
        Прошу предоставить мне отпуск с {vacationStart.format("DD.MM.YYYY")} до {vacationEnd.format("DD.MM.YYYY")}
        {text}
      </div>
      <div className="application-footer">{moment().format("DD.MM.YYYY")}</div>
    </div>
  );
};
