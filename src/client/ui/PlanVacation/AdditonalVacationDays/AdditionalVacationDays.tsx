import React, { Dispatch, SetStateAction } from "react";
import { TextField } from "@confirmit/react-text-field";
import { CheckBox } from "@confirmit/react-toggle";
import "./additional-vacation-days.css";

export const AdditionalVacationDays = ({
  additionalVacationDays,
  setAdditionalVacationDays,
}: {
  additionalVacationDays: number | undefined;
  setAdditionalVacationDays: Dispatch<SetStateAction<number | undefined>>;
}) => {
  const handleAdditionalVacationDaysChange = (value: number) => {
    setAdditionalVacationDays(value);
  };

  const handleUseAdditionalVacationDays = () => {
    additionalVacationDays === undefined ? setAdditionalVacationDays(1) : setAdditionalVacationDays(undefined);
  };

  return (
    <div data-testid="additional-vacation-days">
      <div className="additional-vacation-days">
        <div className="additional-vacation-days__header">Use additional vacation days</div>
        <CheckBox
          onChange={handleUseAdditionalVacationDays}
          checked={additionalVacationDays !== undefined}
          id="isUseAdditionalVacationDays"
        />
      </div>
      {additionalVacationDays !== undefined ? (
        <TextField onChange={handleAdditionalVacationDaysChange} value={additionalVacationDays} type={"number"} />
      ) : undefined}
    </div>
  );
};
