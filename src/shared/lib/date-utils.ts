function diffInMonths(startIso?: string | null, endIso?: string | null): number {
  if (!startIso) return 0;
  const start = new Date(startIso);
  const end = endIso ? new Date(endIso) : new Date();
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;

  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
}

function formatMonthYear(iso?: string | null): string {
  if (!iso) return "-";
  try {
    return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short" }).format(new Date(iso));
  } catch {
    return "-";
  }
}

export { diffInMonths, formatMonthYear };
