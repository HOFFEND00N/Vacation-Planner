import React, { useState } from "react";
import { TextField } from "@confirmit/react-text-field";

export function AdditionalVacationDays() {
  const [additionalVacationDays, setAdditionalVacationDays] = useState(0);

  const handleAdditionalVacationDaysChange = (value: number) => {
    setAdditionalVacationDays(value);
  };

  return <TextField onChange={handleAdditionalVacationDaysChange} value={additionalVacationDays} />;
}
