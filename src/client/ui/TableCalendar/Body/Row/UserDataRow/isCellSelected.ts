export const isCellSelected = ({
  vacationStartDate,
  vacationEndDate,
  cellDate,
  columnNumber,
}: {
  vacationStartDate?: Date;
  vacationEndDate?: Date;
  cellDate: Date;
  columnNumber: number;
}) => {
  if (!vacationStartDate) {
    return false;
  }
  if (!vacationEndDate) {
    vacationEndDate = vacationStartDate;
  }
  return cellDate >= vacationStartDate && cellDate <= vacationEndDate && columnNumber !== 0;
};
