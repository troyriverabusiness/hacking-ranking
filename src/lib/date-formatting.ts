// =============================================================================
// Date formatting utilities
// =============================================================================

export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startStr = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const endStr = endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${startStr}-${endDate.getDate()}, ${startDate.getFullYear()}`;
}

export function formatDateRangeLong(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startStr = startDate.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const endStr = endDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return `${startStr} - ${endStr}`;
}

export function formatDateRangeCompact(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startStr = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const endDay = endDate.getDate();
  return `${startStr} - ${endDay}`;
}
