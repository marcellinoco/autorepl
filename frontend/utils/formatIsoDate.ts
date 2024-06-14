import { format, toZonedTime } from "date-fns-tz";

export const formatIsoDate = (str: string) => {
  const date = new Date(str);
  const timeZone = "UTC";
  const zonedDate = toZonedTime(date, timeZone);

  const formattedDate = format(zonedDate, "MMM d, yyyy, h:mm:ss a", {
    timeZone,
  });
  return formattedDate;
};
