import { isValid, parseISO, differenceInMonths, format } from "date-fns";

function diffInMonths(startIso?: string | null, endIso?: string | null): number {
  if (!startIso) {
    return 0;
  }
  const start = parseISO(startIso);
  const end = endIso ? parseISO(endIso) : new Date();
  if (!isValid(start) || !isValid(end)) {
    return 0;
  }
  let months = differenceInMonths(end, start);

  if (end.getDate() < start.getDate()) {
    months -= 1;
  }
  return Math.max(0, months);
}

function formatMonthYear(iso?: string | null): string {
  if (!iso) return "-";
  const date = parseISO(iso);
  if (!isValid(date)) return "-";
  try {
    return format(date, "LLL yyyy");
  } catch {
    return "-";
  }
}

export { diffInMonths, formatMonthYear };
