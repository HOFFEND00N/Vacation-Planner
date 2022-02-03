export enum VacationType {
  APPROVED = "Approved",
  PENDING_APPROVAL = "Pending approval",
}

export type User = {
  name: string;
  id: string;
};

export type Vacation = {
  id: string;
  start: Date;
  end: Date;
  userId: string;
  type: VacationType;
};
