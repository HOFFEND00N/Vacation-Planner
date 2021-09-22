import React from "react";
import { Button } from "@confirmit/react-button";

export function PlanVacation() {
  return (
    <>
      Загрузить заявление
      <input type="file" name="Загрузить" />
      <input type="date" />
      &ndash;
      <input type="date" />
      Need to show what have been downloaded
      <Button> Отправить </Button>
    </>
  );
}
