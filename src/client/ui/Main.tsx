import React from "react";
import UncontrollableCalendar from "@confirmit/react-calendar";
import { Button } from "@confirmit/react-button";

export function Main() {
  return (
    <>
      <UncontrollableCalendar />
      Загрузить заявление
      <input type="date" />
      &ndash;
      <input type="date" />
      Need to show what have been downloaded
      <input type="file" name="Загрузить" />
      <Button> Отправить </Button>
    </>
  );
}
