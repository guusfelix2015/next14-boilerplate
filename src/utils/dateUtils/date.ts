import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.locale(ptBr);

export const getNow = (): dayjs.Dayjs => dayjs();

export const getToday = (): dayjs.Dayjs => dayjs().startOf("day");

export const getTodayUtc = (): dayjs.Dayjs => dayjs().utc().startOf("day");

export const parseDate = (
  date: string | dayjs.Dayjs | Date,
  options: {
    format?: string;
    timezone?: string;
  } = {}
) => {
  let parsedDate = dayjs(date, options.format);
  if (options.timezone) parsedDate = parsedDate.tz(options.timezone);
  return parsedDate;
};

export const parseDateUtc = (
  date: string | dayjs.Dayjs | Date,
  format?: string
) => dayjs(date, format).utc();

export const getWeekDays = (
  firstWeekDay = "SUNDAY",
  today = getToday(),
  locale = "pt"
): Dayjs[] => {
  today = today.locale(locale);
  const weekDays: Dayjs[] = [];
  const firstDayOfWeek =
    firstWeekDay === "SUNDAY" ? today.day(0) : today.day(1);
  for (let i = 0; i < 7; i++) {
    const date = firstDayOfWeek.add(i, "day");
    weekDays.push(date);
  }
  return weekDays;
};

export const getDayTimes = () => {
  const dayTimes: Dayjs[] = [];
  for (let i = 0; i < 24; i++) {
    const date = getToday().hour(i);
    dayTimes.push(date);
  }
  return dayTimes;
};

export const isBefore = (
  date: string | dayjs.Dayjs | Date,
  compareDate: string | dayjs.Dayjs | Date
) => dayjs(date).isBefore(compareDate);

export type Dayjs = dayjs.Dayjs;
