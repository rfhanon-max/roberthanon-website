"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ClientPortalRecord, ClientPortalView, getPortalViews } from "@/lib/client-portal-schema";

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function buildMonthDateRange(view: ClientPortalView) {
  const dates = view.milestones
    .filter((item) => item.deadline)
    .map((item) => new Date(`${item.deadline}T12:00:00`));
  if (view.closingDate) {
    dates.push(new Date(`${view.closingDate}T12:00:00`));
  }
  dates.sort((a, b) => a.getTime() - b.getTime());

  const start = dates[0] ?? new Date();
  const end = dates[dates.length - 1] ?? start;
  const months: Date[] = [];
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const finalMonth = new Date(end.getFullYear(), end.getMonth(), 1);

  while (cursor <= finalMonth) {
    months.push(new Date(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return months;
}

function buildCalendarWeeks(view: ClientPortalView, monthStart: Date) {
  const itemsByDay = new Map<string, { title: string; completed: boolean }[]>();
  for (const milestone of view.milestones) {
    if (!milestone.deadline) {
      continue;
    }

    const existing = itemsByDay.get(milestone.deadline) ?? [];
    existing.push({ title: milestone.title, completed: milestone.completed });
    itemsByDay.set(milestone.deadline, existing);
  }

  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - monthStart.getDay());

  const weeks: { date: Date; items: { title: string; completed: boolean }[] }[][] = [];
  for (let week = 0; week < 6; week += 1) {
    const days = [];
    for (let day = 0; day < 7; day += 1) {
      const current = new Date(gridStart);
      current.setDate(gridStart.getDate() + week * 7 + day);
      const key = current.toISOString().slice(0, 10);
      days.push({ date: current, items: itemsByDay.get(key) ?? [] });
    }
    weeks.push(days);
  }

  return weeks;
}

function shortEventLabel(value: string) {
  return value.length > 18 ? `${value.slice(0, 18)}...` : value;
}

export function ClientPortalDashboard({ record }: { record: ClientPortalRecord }) {
  const portalViews = useMemo(() => getPortalViews(record), [record]);
  const [activeViewId, setActiveViewId] = useState(portalViews[0]?.id ?? "buying");
  const activeView = portalViews.find((view) => view.id === activeViewId) ?? portalViews[0];

  const totalMilestones = activeView.milestones.length;
  const completedMilestones = activeView.milestones.filter((item) => item.completed).length;
  const nextMilestone =
    activeView.milestones.find((item) => !item.completed) ??
    activeView.milestones[activeView.milestones.length - 1];

  const months = useMemo(() => buildMonthDateRange(activeView), [activeView]);
  const [activeMonthIndex, setActiveMonthIndex] = useState(0);
  const activeMonth = useMemo(() => months[activeMonthIndex] ?? new Date(), [activeMonthIndex, months]);
  const weeks = useMemo(() => buildCalendarWeeks(activeView, activeMonth), [activeView, activeMonth]);

  return (
    <div className="mx-auto w-full max-w-[1560px] px-6 py-10 lg:px-8 lg:py-14">
      <section className="overflow-hidden rounded-[2.25rem] border border-line bg-white shadow-card">
        <div className="relative h-[19rem] w-full lg:h-[21rem]">
          <Image
            src={activeView.propertyImage}
            alt={activeView.propertyImageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            quality={95}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14233b]/75 via-[#14233b]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-8 pt-20 lg:px-10 lg:pb-10">
            <p className="text-xs uppercase tracking-[0.32em] text-white/70">Client Portal</p>
            <h1 className="mt-4 font-display text-5xl text-white lg:text-6xl">{record.clientNames}</h1>
            <p className="mt-3 text-lg text-white/82 lg:text-xl">{activeView.address}</p>
          </div>
        </div>
        {portalViews.length > 1 ? (
          <div className="border-b border-line bg-paper px-6 py-4 lg:px-10">
            <div className="inline-flex rounded-full border border-line bg-white p-1">
              {portalViews.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => {
                    setActiveViewId(view.id);
                    setActiveMonthIndex(0);
                  }}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    activeView.id === view.id
                      ? "bg-navy text-white"
                      : "text-muted hover:text-navy"
                  }`}
                  style={activeView.id === view.id ? { color: "#f8f5ef" } : undefined}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
          <div>
            <div className="max-w-xl rounded-[1.75rem] border border-line bg-paper p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.28em] text-muted">Progress</p>
                <p className="text-sm font-medium text-navy">
                  {completedMilestones} of {totalMilestones} completed
                </p>
              </div>
              <div className="mt-4 h-3 rounded-full bg-white">
                <div
                  className="h-3 rounded-full bg-navy"
                  style={{ width: `${totalMilestones ? (completedMilestones / totalMilestones) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="mt-4 max-w-xl rounded-[1.75rem] border border-line bg-paper p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Calendar Sync</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Add these dates and deadlines to Google Calendar or Outlook.
              </p>
              <a
                href={`/client-portal/${record.slug}/calendar`}
                className="mt-4 inline-flex items-center rounded-full bg-navy px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1a2c47]"
                style={{ color: "#f8f5ef" }}
              >
                Download calendar file
              </a>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted">{activeView.summaryNote}</p>
          </div>

          <div className="grid auto-rows-max content-start self-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <article className="self-start rounded-[1.5rem] border border-line bg-paper px-5 py-4">
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Next Deadline</p>
              <p className="mt-2 text-xl font-semibold leading-8 text-navy">
                {nextMilestone?.title ?? "All complete"}
              </p>
              <p className="mt-1 text-sm text-muted">
                {nextMilestone?.deadline ? formatDisplayDate(nextMilestone.deadline) : "No outstanding dates"}
              </p>
            </article>
            <article className="self-start rounded-[1.5rem] border border-line bg-paper px-5 py-4">
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Closing Date</p>
              <p className="mt-2 text-xl font-semibold leading-8 text-navy">
                {activeView.closingDate ? formatDisplayDate(activeView.closingDate) : "Date to be added"}
              </p>
              <p className="mt-1 text-sm text-muted">{activeView.transactionType} transaction</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(600px,1fr)]">
        <article className="rounded-[2rem] border border-line bg-white p-6 shadow-card lg:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Table View</p>
              <h2 className="mt-3 font-display text-3xl text-navy">{activeView.viewLabel}</h2>
            </div>
            <div className="rounded-full border border-line px-4 py-2 text-sm text-muted">
              Updated for your transaction
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-line">
            <div className="grid grid-cols-[1.1fr_0.7fr_1.8fr_0.55fr] gap-4 border-b border-line bg-paper px-5 py-4 text-xs uppercase tracking-[0.22em] text-muted">
              <span>Name</span>
              <span>Deadline</span>
              <span>Notes</span>
              <span>Done</span>
            </div>
            {activeView.milestones.map((milestone) => (
              <div
                key={`${record.slug}-${activeView.id}-${milestone.title}`}
                className="grid grid-cols-[1.1fr_0.7fr_1.8fr_0.55fr] gap-4 border-b border-line px-5 py-5 text-sm leading-7 last:border-b-0"
              >
                <div>
                  <p className="font-semibold text-navy">{milestone.title}</p>
                </div>
                <div className="text-muted">
                  {milestone.deadline ? formatDisplayDate(milestone.deadline) : "Date to be added"}
                </div>
                <div className="text-muted">{milestone.notes}</div>
                <div className="flex items-start">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-md border text-sm ${
                      milestone.completed
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-line bg-white text-muted"
                    }`}
                  >
                    {milestone.completed ? "✓" : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-line bg-white p-6 shadow-card lg:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Calendar View</p>
              <h2 className="mt-3 font-display text-3xl text-navy">
                {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(activeMonth)}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveMonthIndex((current) => Math.max(0, current - 1))}
                disabled={activeMonthIndex === 0}
                className="rounded-full border border-line px-4 py-2 text-sm text-navy transition hover:border-navy disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setActiveMonthIndex((current) => Math.min(months.length - 1, current + 1))}
                disabled={activeMonthIndex === months.length - 1}
                className="rounded-full border border-line px-4 py-2 text-sm text-navy transition hover:border-navy disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-7 gap-3 text-center text-sm text-muted">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-2 grid gap-3">
            {weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-3">
                {week.map((day) => {
                  const inMonth = day.date.getMonth() === activeMonth.getMonth();
                  return (
                    <div
                      key={day.date.toISOString()}
                      className={`min-h-40 rounded-[1.4rem] border p-3 ${
                        inMonth ? "border-line bg-paper" : "border-line/60 bg-white/70 text-muted/60"
                      }`}
                    >
                      <p className="text-right text-sm font-medium">{day.date.getDate()}</p>
                      <div className="mt-3 space-y-2">
                        {day.items.slice(0, 3).map((item) => (
                          <div
                            key={`${day.date.toISOString()}-${item.title}`}
                            className={`rounded-2xl px-3 py-2 text-left text-xs leading-5 ${
                              item.completed
                                ? "bg-green-700 text-white"
                                : "bg-[#e8dccb] text-navy"
                            }`}
                          >
                            {item.completed ? "✓ " : ""}
                            {shortEventLabel(item.title)}
                          </div>
                        ))}
                        {day.items.length > 3 ? (
                          <p className="text-xs text-muted">+{day.items.length - 3} more</p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
