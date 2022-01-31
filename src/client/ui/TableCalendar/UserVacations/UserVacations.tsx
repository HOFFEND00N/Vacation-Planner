import React from "react";
import { Appearances, Button } from "@confirmit/react-button";
import "./user-vacations.css";
import { Vacation } from "../../../../shared";

export const UserVacations = ({ vacations }: { vacations: Vacation[] }) => {
  const vacationDates = vacations.map((vacation) => (
    <div key={vacation.id} className="user-vacation">
      <div className="user-vacation__dates">
        {vacation.start.toDateString()} - {vacation.end.toDateString()}
      </div>
      <Button appearance={Appearances.primaryDanger}>Cancel</Button>
    </div>
  ));

  return (
    <>
      <div>Your vacations: </div>
      {vacationDates}
    </>
  );
};
