import dateFnsAdd from "date-fns/add";

export type Duration = {
  years?: number | undefined;
  months?: number | undefined;
  weeks?: number | undefined;
  days?: number | undefined;
  hours?: number | undefined;
  minutes?: number | undefined;
  seconds?: number | undefined;
};

export const add = (date: Date | number, duration: Duration) => {
  return dateFnsAdd(date, duration);
};
