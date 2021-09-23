import React, { useState } from "react";
import { Button } from "@confirmit/react-button";
import { DatePicker } from "@confirmit/react-date-picker";
import moment from "moment";
import Dropzone, { UploadStates } from "@confirmit/react-dropzone";

export function PlanVacation() {
  const [uploadState, setUploadState] = useState(UploadStates.Idle);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleSubmit = () => {
    setUploadState(UploadStates.Uploading);
    alert("submitted data");
  };

  return (
    <>
      Загрузить заявление
      <Dropzone
        uploadState={uploadState}
        selectedLabel={selectedFileName}
        onFileSelected={(selectedFiles) => {
          setFiles(selectedFiles);
          setSelectedFileName(selectedFiles[0].name);
        }}
        onClearFile={() => {
          setFiles([]);
          setSelectedFileName("");
        }}
        accept={[".doc", ".docx", "image/*", "pdf"]}
      />
      <div style={{ width: "300px" }}>
        <DatePicker defaultDate={moment()} />
        <DatePicker defaultDate={moment()} />
      </div>
      <Button onClick={handleSubmit}> Отправить </Button>
    </>
  );
}
