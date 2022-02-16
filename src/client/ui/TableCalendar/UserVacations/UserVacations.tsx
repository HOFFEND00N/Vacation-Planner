import React, { useState } from "react";
import { Appearances, Button } from "@confirmit/react-button";
import { ConfirmationDialog, ConfirmationMode } from "@confirmit/react-confirmation-dialog";
import { cancelUnapprovedVacation } from "../../../application/cancelUnapprovedVacation";
import "./user-vacations.css";
import { Vacation } from "../../../../shared";
import { showNotification } from "../../bannerHelpers/showNotification";
import { showError } from "../../bannerHelpers/showError";

export const UserVacations = ({
  vacations,
  onVacationCancel,
}: {
  vacations: Vacation[];
  onVacationCancel: (vacationId: string) => void;
}) => {
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [vacationId, setVacationId] = useState<string>();

  const handleCancelVacation = (vacationId: string) => {
    setIsConfirmationDialogOpen(true);
    setVacationId(vacationId);
  };

  const handleClose = () => {
    setIsConfirmationDialogOpen(false);
  };

  const handleConfirmation = () => {
    (async () => {
      try {
        await cancelUnapprovedVacation(vacationId!);
        onVacationCancel(vacationId!);
        showNotification("Vacation has been canceled successfully");
      } catch (e) {
        showError(e);
      }
      setIsConfirmationDialogOpen(false);
    })();
  };

  if (vacations.length === 0) {
    return <></>;
  }

  const vacationDates = vacations.map((vacation) => (
    <div key={vacation.id} className="user-vacation">
      <div className="user-vacation__dates">
        {vacation.start.toDateString()} - {vacation.end.toDateString()}
      </div>
      <Button appearance={Appearances.primaryDanger} onClick={() => handleCancelVacation(vacation.id)}>
        Cancel vacation
      </Button>
    </div>
  ));

  return (
    <div>
      <div>Your vacations: </div>
      {vacationDates}
      <ConfirmationDialog
        title="Vacation cancellation"
        onClose={handleClose}
        onConfirm={handleConfirmation}
        open={isConfirmationDialogOpen}
        mode={ConfirmationMode.Danger}
        texts={{
          ok: "Yes",
          cancel: "No",
        }}
      >
        <span> Are you sure you want to cancel vacation? </span>
      </ConfirmationDialog>
    </div>
  );
};
