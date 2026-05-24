"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type PortalStudioCalendarEvent = {
  id: string;
  date: string;
  name: string;
  address: string;
  contingency: string;
  completed: boolean;
  portalSlug: string;
  viewLabel: string;
};

function formatMonth(value: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(value);
}

function buildMonthRange(events: PortalStudioCalendarEvent[]) {
  const datedEvents = events
    .map((event) => new Date(`${event.date}T12:00:00`))
    .sort((first, second) => first.getTime() - second.getTime());
  const start = datedEvents[0] ?? new Date();
  const end = datedEvents[datedEvents.length - 1] ?? start;
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const finalMonth = new Date(end.getFullYear(), end.getMonth(), 1);
  const months: Date[] = [];

  while (cursor <= finalMonth) {
    months.push(new Date(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return months;
}

function buildCalendarWeeks(
  monthStart: Date,
  eventsByDay: Map<string, PortalStudioCalendarEvent[]>,
) {
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - monthStart.getDay());
  const weeks: { date: Date; events: PortalStudioCalendarEvent[] }[][] = [];

  for (let week = 0; week < 6; week += 1) {
    const days = [];
    for (let day = 0; day < 7; day += 1) {
      const current = new Date(gridStart);
      current.setDate(gridStart.getDate() + week * 7 + day);
      const key = current.toISOString().slice(0, 10);
      days.push({ date: current, events: eventsByDay.get(key) ?? [] });
    }
    weeks.push(days);
  }

  return weeks;
}

function getInitialMonthIndex(months: Date[]) {
  const today = new Date();
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const exactIndex = months.findIndex((month) => month.getTime() === currentMonth.getTime());

  if (exactIndex >= 0) {
    return exactIndex;
  }

  const nextIndex = months.findIndex((month) => month > currentMonth);
  return nextIndex >= 0 ? nextIndex : Math.max(0, months.length - 1);
}

export function PortalStudioMasterCalendar({ events }: { events: PortalStudioCalendarEvent[] }) {
  const months = useMemo(() => buildMonthRange(events), [events]);
  const eventsByDay = useMemo(() => {
    const nextEventsByDay = new Map<string, PortalStudioCalendarEvent[]>();

    for (const event of events) {
      const existing = nextEventsByDay.get(event.date) ?? [];
      existing.push(event);
      nextEventsByDay.set(event.date, existing);
    }

    return nextEventsByDay;
  }, [events]);
  const [activeMonthIndex, setActiveMonthIndex] = useState(() => getInitialMonthIndex(months));
  const todayMonthIndex = useMemo(() => getInitialMonthIndex(months), [months]);
  const activeMonth = useMemo(
    () => months[activeMonthIndex] ?? months[0] ?? new Date(),
    [activeMonthIndex, months],
  );
  const weeks = useMemo(
    () => buildCalendarWeeks(activeMonth, eventsByDay),
    [activeMonth, eventsByDay],
  );

  return (
    <article className="mt-10 rounded-[2rem] border border-line bg-white p-5 shadow-card lg:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted">Calendar View</p>
          <h2 className="mt-2 font-display text-3xl text-navy">{formatMonth(activeMonth)}</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-paper p-1.5">
          <button
            type="button"
            onClick={() => setActiveMonthIndex((current) => Math.max(0, current - 1))}
            disabled={activeMonthIndex === 0}
            aria-label="Previous month"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-2xl leading-none text-navy transition hover:border-navy disabled:cursor-not-allowed disabled:opacity-40"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setActiveMonthIndex(todayMonthIndex)}
            className="inline-flex h-10 items-center justify-center rounded-full bg-navy px-7 text-sm font-semibold text-white transition hover:bg-[#1a2c47]"
            style={{ color: "#f8f5ef" }}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setActiveMonthIndex((current) => Math.min(months.length - 1, current + 1))}
            disabled={activeMonthIndex === months.length - 1}
            aria-label="Next month"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-2xl leading-none text-navy transition hover:border-navy disabled:cursor-not-allowed disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">Name, address, and contingency appear on every event.</p>

      <div className="mt-7 grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.18em] text-muted">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-2 grid gap-2">
        {weeks.map((week, weekIndex) => (
          <div key={`${activeMonth.toISOString()}-${weekIndex}`} className="grid grid-cols-7 gap-2">
            {week.map((day) => {
              const inMonth = day.date.getMonth() === activeMonth.getMonth();

              return (
                <div
                  key={day.date.toISOString()}
                  className={`min-h-36 rounded-lg border p-2 ${
                    inMonth ? "border-line bg-paper" : "border-line/60 bg-white/70 text-muted/60"
                  }`}
                >
                  <p className="text-right text-sm font-medium">{day.date.getDate()}</p>
                  <div className="mt-2 space-y-2">
                    {day.events.map((event) => (
                      <Link
                        key={event.id}
                        href={`/portal-studio/${event.portalSlug}`}
                        className={`block rounded-md px-2 py-2 text-left text-[11px] leading-4 transition hover:shadow-card ${
                          event.completed ? "bg-green-700 text-white" : "bg-[#e8dccb] text-navy"
                        }`}
                        style={event.completed ? { color: "#ffffff" } : undefined}
                      >
                        <span className="block font-semibold">{event.name}</span>
                        <span className="block">{event.address}</span>
                        <span className="block">{event.contingency}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </article>
  );
}
