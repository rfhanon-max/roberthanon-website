import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  PortalStudioMasterCalendar,
  type PortalStudioCalendarEvent,
} from "@/components/portal/portal-studio-master-calendar";
import { getAllPortals } from "@/lib/client-portal-store";
import { getPortalViews } from "@/lib/client-portal-schema";
import {
  isValidPortalStudioSession,
  PORTAL_STUDIO_COOKIE,
} from "@/lib/portal-studio-access";

export const dynamic = "force-dynamic";

function sortEvents(events: PortalStudioCalendarEvent[]) {
  return [...events].sort((first, second) => {
    return (
      first.date.localeCompare(second.date) ||
      first.name.localeCompare(second.name) ||
      first.contingency.localeCompare(second.contingency)
    );
  });
}

export default async function PortalStudioCalendarPage() {
  const cookieStore = await cookies();
  if (!isValidPortalStudioSession(cookieStore.get(PORTAL_STUDIO_COOKIE)?.value)) {
    redirect("/portal-studio/login");
  }

  const portals = await getAllPortals();
  const events = sortEvents(
    portals.flatMap((portal) =>
      getPortalViews(portal).flatMap((view) =>
        view.milestones
          .filter((milestone) => milestone.deadline)
          .map((milestone) => ({
            id: `${portal.slug}-${view.id}-${milestone.deadline}-${milestone.title}`,
            date: milestone.deadline,
            name: portal.clientNames,
            address: view.address,
            contingency: milestone.title,
            completed: milestone.completed,
            portalSlug: portal.slug,
            viewLabel: view.label,
          })),
      ),
    ),
  );
  const upcomingEvents = events.filter((event) => event.date >= new Date().toISOString().slice(0, 10));

  return (
    <section className="mx-auto w-full max-w-[1600px] px-6 py-14 lg:px-8 lg:py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.32em] text-muted">Portal Studio</p>
          <h1 className="mt-4 font-display text-5xl text-navy">Master Calendar</h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            All saved portal dates and deadlines in one full-page view.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/portal-studio"
            className="inline-flex items-center rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-navy transition hover:border-navy"
          >
            Create + Manage
          </Link>
          <Link
            href="/portal-studio/calendar"
            className="inline-flex items-center rounded-full bg-navy px-5 py-3 text-sm font-medium text-white"
            style={{ color: "#f8f5ef" }}
          >
            Master Calendar
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card">
          <p className="text-xs uppercase tracking-[0.28em] text-muted">Active Portals</p>
          <p className="mt-2 text-3xl font-semibold text-navy">{portals.length}</p>
        </div>
        <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card">
          <p className="text-xs uppercase tracking-[0.28em] text-muted">Calendar Events</p>
          <p className="mt-2 text-3xl font-semibold text-navy">{events.length}</p>
        </div>
        <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card">
          <p className="text-xs uppercase tracking-[0.28em] text-muted">Upcoming</p>
          <p className="mt-2 text-3xl font-semibold text-navy">{upcomingEvents.length}</p>
        </div>
      </div>

      {events.length ? (
        <PortalStudioMasterCalendar events={events} />
      ) : (
        <div className="mt-10 rounded-[2rem] border border-line bg-white p-8 shadow-card">
          <p className="font-semibold text-navy">No dated portal deadlines yet.</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            Add deadline dates to a portal and they will appear here automatically.
          </p>
        </div>
      )}
    </section>
  );
}
