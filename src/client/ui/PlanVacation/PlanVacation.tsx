import React, { useState } from "react";
import { Appearances, Button } from "@confirmit/react-button";
import { DatePicker } from "@confirmit/react-date-picker";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import Dropzone, { UploadStates } from "@confirmit/react-dropzone";
import { CheckBox } from "@confirmit/react-toggle";
import { TextField } from "@confirmit/react-text-field";
import { planVacation } from "../../application/planVacation";
import "./plan-vacation.css";
import { AdditionalVacationDays } from "./AddiionalVacationDays/AdditionalVacationDays";
import { Application } from "./Application/Application";

export function PlanVacation({ currentDate }: { currentDate: moment.Moment }) {
  const [uploadState, setUploadState] = useState(UploadStates.Idle);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const location = useLocation();
  const [vacationStartDate, setVacationStartDate] = useState(moment(location.state.vacationStart.date));
  const [vacationEndDate, setVacationEndDate] = useState(moment(location.state.vacationEnd.date));
  const [additionalVacationDays, setAdditionalVacationDays] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState("");

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
    additionalVacationDays === undefined ? setAdditionalVacationDays(0) : setAdditionalVacationDays(undefined);
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

  const handlePrintApplication = () => {
    window.print();
  };

  return (
    <div className="application-form-container">
      <div className="application-form">
        <div>
          Vacation dates
          <div className="vacation-dates">
            <DatePicker date={vacationStartDate} onChange={handleDateStartChange} className="vacation-dates__item" />
            <hr className="vacation-dates__line-between" />
            <DatePicker date={vacationEndDate} onChange={handleDateEndChange} className="vacation-dates__item" />
          </div>
          <TextField
            label="Full name in the genitive case"
            placeholder="Иванова И.И."
            value={userName}
            onChange={setUserName}
          />
          <div>
            <div className="additional-vacation-days">
              <div className="additional-vacation-days__header">Use additional vacation days</div>
              <CheckBox
                onChange={handleUseAdditionalVacationDays}
                checked={additionalVacationDays !== undefined}
                id={"isUseAdditionalVacationDays"}
              />
            </div>
            {additionalVacationDays !== undefined ? (
              <AdditionalVacationDays
                additionalVacationDays={additionalVacationDays}
                setAdditionalVacationDays={setAdditionalVacationDays}
              />
            ) : undefined}
          </div>
        </div>
        <div className="right-page-half">
          <Button
            className="print-application-button"
            appearance={Appearances.primarySuccess}
            onClick={handlePrintApplication}
          >
            Print application
          </Button>
          <div>
            <div className="dropzone-container__header">Upload a vacation application</div>
            <Dropzone
              uploadState={uploadState}
              selectedLabel={selectedFileName}
              onFileSelected={handleFileSelected}
              onClearFile={handleClearFile}
            />
          </div>
        </div>
      </div>

      <div className="buttons-container">
        <Button className="buttons-container__item" appearance={Appearances.primaryDanger} onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="buttons-container__item" appearance={Appearances.primarySuccess} onClick={handleSubmit}>
          Send
        </Button>
      </div>

      <Application
        vacationEnd={vacationEndDate}
        vacationStart={vacationStartDate}
        additionalVacationDays={additionalVacationDays}
        userName={userName}
        currentDate={currentDate}
      />
    </div>
  );
}
