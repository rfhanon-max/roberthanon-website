import { ClientPortalRecord } from "@/lib/client-portal-schema";

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatDateValue(value: string) {
  return value.replaceAll("-", "");
}

function formatNextDateValue(value: string) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

function buildEventUid(slug: string, deadline: string, title: string) {
  return `${slug}-${deadline}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}@roberthanon.com`;
}

export function buildPortalCalendarIcs(record: ClientPortalRecord) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Robert Hanon//Client Portal//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  for (const milestone of record.milestones) {
    if (!milestone.deadline) {
      continue;
    }

    lines.push(
      "BEGIN:VEVENT",
      `UID:${buildEventUid(record.slug, milestone.deadline, milestone.title)}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${formatDateValue(milestone.deadline)}`,
      `DTEND;VALUE=DATE:${formatNextDateValue(milestone.deadline)}`,
      `SUMMARY:${escapeIcsText(`${record.clientNames}: ${milestone.title}`)}`,
      `DESCRIPTION:${escapeIcsText(milestone.notes)}`,
      `LOCATION:${escapeIcsText(record.address)}`,
      `STATUS:${milestone.completed ? "COMPLETED" : "CONFIRMED"}`,
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
