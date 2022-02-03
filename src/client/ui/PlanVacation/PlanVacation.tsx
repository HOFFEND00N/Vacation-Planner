import React, { useState } from "react";
import { Appearances, Button } from "@confirmit/react-button";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import Dropzone, { UploadStates } from "@confirmit/react-dropzone";
import { TextField } from "@confirmit/react-text-field";
import { store } from "@confirmit/react-banner";
import { planVacation } from "../../application/planVacation";
import { AdditionalVacationDays } from "./AdditonalVacationDays";
import { Application } from "./Application";
import { VacationDates } from "./VacationDates";
import "./plan-vacation.css";

export function PlanVacation({ currentDate }: { currentDate: moment.Moment }) {
  const [uploadState, setUploadState] = useState(UploadStates.Idle);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const location = useLocation();
  const history = useHistory();
  const [vacationStartDate, setVacationStartDate] = useState(moment(location.state.vacationStart.date));
  const [vacationEndDate, setVacationEndDate] = useState(moment(location.state.vacationEnd.date));
  const [additionalVacationDays, setAdditionalVacationDays] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState("");

  const handleSubmit = async () => {
    if (files.length === 0) {
      showWarning("please upload document with vacation request");
      return;
    }
    setUploadState(UploadStates.Uploading);
    await planVacation({
      vacationStartDate: vacationStartDate.toDate(),
      vacationEndDate: vacationEndDate.toDate(),
    });
    showNotification();
    setUploadState(UploadStates.Idle);
  };

  const showNotification = () => {
    store.success({ text: "Vacation successfully planned", closeTimeout: 0 });
  };

  const showWarning = (text: string) => {
    store.warning({ text, closeTimeout: 0 });
  };

  const handleStartDateChange = (startDate: moment.Moment) => {
    setVacationStartDate(startDate);
  };

  const handleEndDateChange = (endDate: moment.Moment) => {
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
    <div className="application-form-container" data-testid="application-form-container">
      <div className="application-form">
        <div>
          <VacationDates
            vacationStartDate={vacationStartDate}
            vacationEndDate={vacationEndDate}
            handleDateStartChange={handleStartDateChange}
            handleDateEndChange={handleEndDateChange}
          />
          <TextField
            label="Full name in the genitive case"
            placeholder="Иванова И.И."
            value={userName}
            onChange={setUserName}
            data-testid="full-name-input"
          />
          <AdditionalVacationDays
            additionalVacationDays={additionalVacationDays}
            setAdditionalVacationDays={setAdditionalVacationDays}
          />
        </div>
        <div className="right-page-half">
          <Button
            className="print-application-button"
            appearance={Appearances.primarySuccess}
            onClick={handlePrintApplication}
          >
            Print application
          </Button>
          <div className="dropzone-container">
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
          Plan vacation
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
