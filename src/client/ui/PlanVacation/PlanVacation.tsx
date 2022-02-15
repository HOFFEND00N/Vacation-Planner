import React, { useState } from "react";
import { Appearances, Button } from "@confirmit/react-button";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import Dropzone, { UploadStates } from "@confirmit/react-dropzone";
import { TextField } from "@confirmit/react-text-field";
import { Icon, printer } from "@confirmit/react-icons";
import { Fieldset, LayoutStyle } from "@confirmit/react-fieldset";
import { planVacation } from "../../application/planVacation";
import { showError } from "../bannerHelpers/showError";
import { showNotification } from "../bannerHelpers/showNotification";
import { AdditionalVacationDays } from "./AdditonalVacationDays";
import { Application } from "./Application";
import { VacationDates } from "./VacationDates";
import "./plan-vacation.css";

export function PlanVacation({ currentDate }: { currentDate: moment.Moment }) {
  const [uploadState, setUploadState] = useState(UploadStates.Idle);
  const [file, setFile] = useState<File>();
  const [selectedFileName, setSelectedFileName] = useState("");
  const location = useLocation();
  const history = useHistory();
  const [vacationStartDate, setVacationStartDate] = useState(moment(location.state.vacationStart.date));
  const [vacationEndDate, setVacationEndDate] = useState(moment(location.state.vacationEnd.date));
  const [additionalVacationDays, setAdditionalVacationDays] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState("");

  const handleSubmit = async () => {
    setUploadState(UploadStates.Uploading);
    try {
      await planVacation({
        vacationStartDate: vacationStartDate.toDate(),
        vacationEndDate: vacationEndDate.toDate(),
      });
      setUploadState(UploadStates.Idle);
      showNotification("Vacation successfully planned");
      history.push({
        pathname: "/",
      });
    } catch (e) {
      setUploadState(UploadStates.Idle);
      showError(e);
    }
  };

  const handleFileSelected = (selectedFiles: File[]) => {
    setFile(selectedFiles[0]);
    setSelectedFileName(selectedFiles[0].name);
  };

  const handleClearFile = () => {
    setFile(undefined);
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
        <Fieldset layoutStyle={LayoutStyle.Vertical}>
          <VacationDates
            vacationStartDate={vacationStartDate}
            vacationEndDate={vacationEndDate}
            handleDateStartChange={(startDate: moment.Moment) => setVacationStartDate(startDate)}
            handleDateEndChange={(endDate: moment.Moment) => setVacationEndDate(endDate)}
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
        </Fieldset>

        <Fieldset layoutStyle={LayoutStyle.Vertical}>
          <Button
            className="application-form__print-application-button"
            appearance={Appearances.primarySuccess}
            onClick={handlePrintApplication}
            suffix={<Icon path={printer} />}
          >
            Print application
          </Button>
          <div className="application-form__dropzone-container">
            <div className="application-form__dropzone-container-header">Upload a vacation application *</div>
            <Dropzone
              uploadState={uploadState}
              selectedLabel={selectedFileName}
              onFileSelected={handleFileSelected}
              onClearFile={handleClearFile}
            />
          </div>
        </Fieldset>
      </div>

      <div className="application-form__buttons-container">
        <Button
          className="application-form__buttons-container-item"
          appearance={Appearances.primaryDanger}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="application-form__buttons-container-item"
          appearance={Appearances.primarySuccess}
          onClick={handleSubmit}
          disabled={!file}
        >
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
