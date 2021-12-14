import React, { useState } from "react";
import { Appearances, Button } from "@confirmit/react-button";
import { DatePicker } from "@confirmit/react-date-picker";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import Dropzone, { UploadStates } from "@confirmit/react-dropzone";
import { CheckBox } from "@confirmit/react-toggle";
import { planVacation } from "../../application/planVacation";
import "./plan-vacation.css";
import { AdditionalVacationDays } from "./AddiionalVacationDays/AdditionalVacationDays";

export function PlanVacation() {
  const [uploadState, setUploadState] = useState(UploadStates.Idle);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const location = useLocation();
  const [vacationStartDate, setVacationStartDate] = useState(moment(location.state.vacationStart.date));
  const [vacationEndDate, setVacationEndDate] = useState(moment(location.state.vacationEnd.date));
  const [isUsedAdditionalVacationDays, setIsUsedAdditionalVacationDays] = useState(false);

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("please upload document with vacation request");
    }
    setUploadState(UploadStates.Uploading);
    const res = await planVacation();
    //TODO: FTP server, web server, time server
    console.log(res.json());
    alert(`file = ${files[0].name}, vacation start = ${vacationStartDate}, vacation end = ${vacationEndDate}`);
  };

  const handleDateStartChange = (startDate: moment.Moment) => {
    setVacationStartDate(startDate);
  };

  const handleDateEndChange = (endDate: moment.Moment) => {
    setVacationEndDate(endDate);
  };

  const handleFileSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setSelectedFileName(selectedFiles[0].name);
  };

  const handleClearFile = () => {
    setFiles([]);
    setSelectedFileName("");
  };

  const handleUseAdditionalVacationDays = () => {
    setIsUsedAdditionalVacationDays(!isUsedAdditionalVacationDays);
  };

  const history = useHistory();
  const handleCancel = () => {
    history.push({
      pathname: "/",
      state: {
        vacationStart: { isSelected: true, date: vacationStartDate.toDate() },
        vacationEnd: { isSelected: true, date: vacationEndDate.toDate() },
      },
    });
  };

  return (
    <div className={"application-container"}>
      <div className={"application"}>
        <div>
          Vacation dates
          <div className={"vacation-dates"}>
            <DatePicker date={vacationStartDate} onChange={handleDateStartChange} className={"vacation-dates__item"} />
            <hr className={"vacation-dates__line-between"} />
            <DatePicker date={vacationEndDate} onChange={handleDateEndChange} className={"vacation-dates__item"} />
          </div>
          <div>
            <div className={"additional-vacation-days"}>
              <div className={"additional-vacation-days__header"}>Use additional vacation days</div>
              <CheckBox
                onChange={handleUseAdditionalVacationDays}
                checked={isUsedAdditionalVacationDays}
                id={"isUseAdditionalVacationDays"}
              />
            </div>
            {isUsedAdditionalVacationDays ? <AdditionalVacationDays /> : undefined}
          </div>
        </div>
        <div className={"right-page-half"}>
          <Button className={"right-page-half__print-application-button"} appearance={Appearances.primarySuccess}>
            Print application
          </Button>
          <div>
            <div className={"dropzone-container__header"}>Upload a vacation application</div>
            <Dropzone
              uploadState={uploadState}
              selectedLabel={selectedFileName}
              onFileSelected={handleFileSelected}
              onClearFile={handleClearFile}
            />
          </div>
        </div>
      </div>

      <div className={"buttons-container"}>
        <Button className={"buttons-container__item"} appearance={Appearances.primaryDanger} onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={"buttons-container__item"} appearance={Appearances.primarySuccess} onClick={handleSubmit}>
          Send
        </Button>
      </div>
    </div>
  );
}