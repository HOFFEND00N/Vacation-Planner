import React, { useState } from "react";
import { Button } from "@confirmit/react-button";
import { DatePicker } from "@confirmit/react-date-picker";
import moment from "moment";
import Dropzone, { UploadStates } from "@confirmit/react-dropzone";
import { planVacation } from "../application/planVacation";

export function PlanVacation() {
  const [uploadState, setUploadState] = useState(UploadStates.Idle);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [vacationStart, setVacationStart] = useState(moment());
  const [vacationEnd, setVacationEnd] = useState(moment());

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("please upload document with vacation request");
    }
    setUploadState(UploadStates.Uploading);
    const res = await planVacation();
    //TODO: FTP server, web server, time server
    //TODO: react context (problem with passing props)
    console.log(res.json());
    alert(`file = ${files[0].name}, vacation start = ${vacationStart}, vacation end = ${vacationEnd}`);
  };

  const handleDateStartChange = (startDate) => {
    setVacationStart(startDate);
  };

  const handleDateEndChange = (endDate) => {
    setVacationEnd(endDate);
  };

  const handleFileSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setSelectedFileName(selectedFiles[0].name);
  };

  const handleClearFile = () => {
    setFiles([]);
    setSelectedFileName("");
  };

  return (
    <>
      Загрузить заявление
      <Dropzone
        uploadState={uploadState}
        selectedLabel={selectedFileName}
        onFileSelected={handleFileSelected}
        onClearFile={handleClearFile}
      />
      <div style={{ width: "300px" }}>
        <DatePicker date={vacationStart} onChange={handleDateStartChange} />
        <DatePicker date={vacationEnd} onChange={handleDateEndChange} />
      </div>
      <Button onClick={handleSubmit}> Отправить </Button>
    </>
  );
}
