// Dates in the data are plain YYYY-MM-DD. Format in UTC so the server render
// and the browser agree regardless of the viewer's time zone.
const short = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const long = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export function formatShortDate(iso: string) {
  return short.format(new Date(`${iso}T00:00:00Z`));
}

export function formatLongDate(iso: string) {
  return long.format(new Date(`${iso}T00:00:00Z`));
}
