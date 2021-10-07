import React, { useState } from "react";
import { Button } from "@confirmit/react-button";
import { DatePicker } from "@confirmit/react-date-picker";
import moment from "moment";
import Dropzone, { UploadStates } from "@confirmit/react-dropzone";

export function PlanVacation() {
  const today = moment();

  const [uploadState, setUploadState] = useState(UploadStates.Idle);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [vacationStart, setVacationStart] = useState(today);
  const [vacationEnd, setVacationEnd] = useState(today);

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("please upload document with vacation request");
    }
    //TODO: component dont need to know about \plan-vacation
    setUploadState(UploadStates.Uploading);
    const res = await fetch(`${protocol}${domain}${serverPort || 3000}/plan-vacation`, { method: "post" });
    //TODO: put vs patch
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

  return (
    <>
      Загрузить заявление
      <Dropzone
        uploadState={uploadState}
        selectedLabel={selectedFileName}
        //TODO: extract to a function
        onFileSelected={(selectedFiles) => {
          setFiles(selectedFiles);
          setSelectedFileName(selectedFiles[0].name);
        }}
        onClearFile={() => {
          setFiles([]);
          setSelectedFileName("");
        }}
      />
      <div style={{ width: "300px" }}>
        <DatePicker defaultDate={today} onChange={handleDateStartChange} />
        <DatePicker defaultDate={today} onChange={handleDateEndChange} />
      </div>
      <Button onClick={handleSubmit}> Отправить </Button>
    </>
  );
}
