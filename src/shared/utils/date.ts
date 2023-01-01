import { enUS, ja } from "date-fns/locale";
import dateFnsAdd from "date-fns/add";
import dateFnsFormat from "date-fns/format";

export type Duration = {
  years?: number | undefined;
  months?: number | undefined;
  weeks?: number | undefined;
  days?: number | undefined;
  hours?: number | undefined;
  minutes?: number | undefined;
  seconds?: number | undefined;
};

const LOCALE = {
  ja: ja,
  en: enUS,
} as const;

export type Locale = keyof typeof LOCALE;

export const add = (date: Date | number, duration: Duration) => {
  return dateFnsAdd(date, duration);
};

export const formatYMD = (date: Date | number, locale: Locale) => {
  return dateFnsFormat(date, "P", { locale: LOCALE[locale] });
};

export const formatYMDMH = (date: Date | number, locale: Locale) => {
  return dateFnsFormat(date, "P HH:mm", { locale: LOCALE[locale] });
};
