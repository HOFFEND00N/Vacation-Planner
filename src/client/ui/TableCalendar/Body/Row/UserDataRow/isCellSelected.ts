export function isCellSelected({
  vacationStartDate,
  vacationEndDate,
  cellDate,
  columnNumber,
}: {
  vacationStartDate: Date;
  vacationEndDate: Date;
  cellDate: Date;
  columnNumber: number;
}) {
  return cellDate >= vacationStartDate && cellDate <= vacationEndDate && columnNumber !== 0;
}
