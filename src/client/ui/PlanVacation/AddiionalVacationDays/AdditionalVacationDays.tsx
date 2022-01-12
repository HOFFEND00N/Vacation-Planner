import React, { Dispatch, SetStateAction } from "react";
import { TextField } from "@confirmit/react-text-field";

export function AdditionalVacationDays({
  additionalVacationDays,
  setAdditionalVacationDays,
}: {
  additionalVacationDays: number;
  setAdditionalVacationDays: Dispatch<SetStateAction<number>>;
}) {
  const handleAdditionalVacationDaysChange = (value: string) => {
    setAdditionalVacationDays(Number(value));
  };

  return <TextField onChange={handleAdditionalVacationDaysChange} value={additionalVacationDays} />;
}
