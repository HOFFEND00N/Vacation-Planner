export type Vacation = {
  id: string;
  start: Date;
  end: Date;
  userId: string;
  type: VacationType;
};

export enum VacationType {
  APPROVED = "Approved",
  PENDING_APPROVAL = "Pending approval",
}

export type VacationCountByDays = Record<number, number>;
