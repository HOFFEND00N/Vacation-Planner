import React, { useState } from "react";
import { Button } from "@confirmit/react-button";
import { DatePicker } from "@confirmit/react-date-picker";
import moment from "moment";
import Dropzone, { UploadStates } from "@confirmit/react-dropzone";

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
    //TODO: component dont need to know about \plan-vacation => extract to a function into application folder
    setUploadState(UploadStates.Uploading);
    const res = await fetch(`${SITE_PROTOCOL}${SITE_DOMAIN}${SITE_SERVER_PORT}/plan-vacation`, { method: "post" });
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
        <DatePicker date={vacationStart} onChange={handleDateStartChange} />
        <DatePicker date={vacationEnd} onChange={handleDateEndChange} />
      </div>
      <Button onClick={handleSubmit}> Отправить </Button>
    </>
  );
}
