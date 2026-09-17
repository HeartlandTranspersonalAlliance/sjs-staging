export function formatDate(date: Date, options: Intl.DateTimeFormatOptions): string {
  return date.toLocaleDateString("en-US", {
    ...options,
    timeZone: "UTC"
  });
}
