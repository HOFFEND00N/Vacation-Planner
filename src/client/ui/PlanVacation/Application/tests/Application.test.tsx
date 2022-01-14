import { render, screen } from "@testing-library/react";
import moment from "moment";
import React from "react";
import { Application } from "../Application";
import "@testing-library/jest-dom";

describe("application", () => {
  test("should render", () => {
    const username = "test";
    const vacationStart = moment("25-12-20210", "DD-MM-YYYY");
    const vacationEnd = moment("30-12-2021", "DD-MM-YYYY");
    const currentDate = moment("1-12-2021", "DD-MM-YYYY");

    render(
      <Application
        vacationStart={vacationStart}
        vacationEnd={vacationEnd}
        userName={username}
        currentDate={currentDate}
      />
    );

    expect(screen.getByTestId("application")).toBeInTheDocument();
    expect(screen.getByTestId("application-header")).toBeInTheDocument();
    expect(screen.getByText("Генеральному директору")).toBeInTheDocument();
    expect(screen.getByText('ООО "Конфёрмит"')).toBeInTheDocument();
    expect(screen.getByText("Мастрюкову Д.Л.")).toBeInTheDocument();
    expect(screen.getByText(`от ${username}`)).toBeInTheDocument();
    expect(screen.getByText(`Заявление`)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Прошу предоставить мне отпуск с ${vacationStart.format("DD.MM.YYYY")} до ${vacationEnd.format("DD.MM.YYYY")}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(`${currentDate.format("DD.MM.YYYY")}`)).toBeInTheDocument();
  });

  test("should render, when 1 additional vacation day passed", () => {
    const username = "test";
    const vacationStart = moment("25-12-20210", "DD-MM-YYYY");
    const vacationEnd = moment("30-12-2021", "DD-MM-YYYY");
    const currentDate = moment("1-12-2021", "DD-MM-YYYY");
    const additionalVacationDays = 1;
    render(
      <Application
        vacationStart={vacationStart}
        vacationEnd={vacationEnd}
        userName={username}
        currentDate={currentDate}
        additionalVacationDays={additionalVacationDays}
      />
    );

    expect(
      screen.getByText(
        `Прошу предоставить мне отпуск с ${vacationStart.format("DD.MM.YYYY")} до ${vacationEnd.format(
          "DD.MM.YYYY"
        )}, из них ${additionalVacationDays} дополнительный день отпуска за ${vacationStart.year()} год`
      )
    ).toBeInTheDocument();
  });

  test("should render, when 3 additional vacation days passed", () => {
    const username = "test";
    const vacationStart = moment("25-12-20210", "DD-MM-YYYY");
    const vacationEnd = moment("30-12-2021", "DD-MM-YYYY");
    const currentDate = moment("1-12-2021", "DD-MM-YYYY");
    const additionalVacationDays = 3;
    render(
      <Application
        vacationStart={vacationStart}
        vacationEnd={vacationEnd}
        userName={username}
        currentDate={currentDate}
        additionalVacationDays={additionalVacationDays}
      />
    );

    expect(
      screen.getByText(
        `Прошу предоставить мне отпуск с ${vacationStart.format("DD.MM.YYYY")} до ${vacationEnd.format(
          "DD.MM.YYYY"
        )}, из них ${additionalVacationDays} дополнительных дня отпуска за ${vacationStart.year()} год`
      )
    ).toBeInTheDocument();
  });
});
