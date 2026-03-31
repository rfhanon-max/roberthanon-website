"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { ClientPortalRecord } from "@/lib/client-portal-schema";
import { portalTemplates } from "@/lib/client-portal-schema";

type StudioMilestone = {
  id: string;
  title: string;
  deadline: string;
  notes: string;
  completed: boolean;
};

function newMilestoneId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

type PortalStudioFormProps = {
  initialPortal?: ClientPortalRecord;
};

export function PortalStudioForm({ initialPortal }: PortalStudioFormProps) {
  const router = useRouter();
  const starterMilestones = useMemo(
    () =>
      (initialPortal?.milestones || portalTemplates.buyer.milestones).map((milestone) => ({
        id: newMilestoneId(),
        ...milestone,
      })),
    [initialPortal],
  );

  const [clientNames, setClientNames] = useState(initialPortal?.clientNames || "");
  const [email, setEmail] = useState(initialPortal?.email || "");
  const [accessCode, setAccessCode] = useState(initialPortal?.accessCode || "");
  const [address, setAddress] = useState(initialPortal?.address || "");
  const [propertyImage, setPropertyImage] = useState(initialPortal?.propertyImage || "");
  const [propertyImageAlt, setPropertyImageAlt] = useState(initialPortal?.propertyImageAlt || "");
  const [closingDate, setClosingDate] = useState(initialPortal?.closingDate || "");
  const [summaryNote, setSummaryNote] = useState<string>(
    initialPortal?.summaryNote || portalTemplates.buyer.summaryNote,
  );
  const [milestones, setMilestones] = useState<StudioMilestone[]>(starterMilestones);
  const [status, setStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isEditing = Boolean(initialPortal);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSaving(true);

    const response = await fetch(isEditing ? "/api/portal-studio/update" : "/api/portal-studio/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: initialPortal?.slug,
        clientNames,
        email,
        accessCode,
        address,
        propertyImage,
        propertyImageAlt,
        closingDate,
        summaryNote,
        milestones: milestones.map(({ id: _id, ...milestone }) => milestone),
      }),
    });

    const payload = (await response.json()) as { ok?: boolean; slug?: string; error?: string };
    setIsSaving(false);

    if (!response.ok || !payload.ok) {
      setStatus(payload.error || `Unable to ${isEditing ? "update" : "create"} the portal.`);
      return;
    }

    setStatus(
      isEditing
        ? `Portal updated: /client-portal/${payload.slug}`
        : `Portal created: /client-portal/${payload.slug}`,
    );
    router.push("/portal-studio");
    router.refresh();
  }

  function updateMilestone(id: string, field: keyof Omit<StudioMilestone, "id">, value: string | boolean) {
    setMilestones((current) =>
      current.map((milestone) =>
        milestone.id === id ? { ...milestone, [field]: value } : milestone,
      ),
    );
  }

  function removeMilestone(id: string) {
    setMilestones((current) => current.filter((milestone) => milestone.id !== id));
  }

  function addMilestone() {
    setMilestones((current) => [
      ...current,
      { id: newMilestoneId(), title: "", deadline: "", notes: "", completed: false },
    ]);
  }

  async function handleDelete() {
    if (!initialPortal) {
      return;
    }

    const confirmed = window.confirm(
      `Delete the portal for ${initialPortal.clientNames}? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setStatus(null);
    setIsDeleting(true);

    const response = await fetch("/api/portal-studio/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: initialPortal.slug,
      }),
    });

    const payload = (await response.json()) as { ok?: boolean; error?: string };
    setIsDeleting(false);

    if (!response.ok || !payload.ok) {
      setStatus(payload.error || "Unable to delete the portal.");
      return;
    }

    window.location.href = "/portal-studio";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-[2rem] border border-line bg-white p-8 shadow-card">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Portal Studio</p>
        <h2 className="mt-4 font-display text-4xl text-navy">
          {isEditing ? "Edit this client portal." : "Create a client portal from the buyer template."}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
          Fill in the client details, adjust the milestones, then save the portal. You can remove or add contingencies as needed for each client.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-navy">Client names</span>
            <input value={clientNames} onChange={(event) => setClientNames(event.target.value)} className="rounded-[1.2rem] border border-line bg-paper px-4 py-3 text-base text-navy outline-none transition focus:border-navy" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-navy">Client email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-[1.2rem] border border-line bg-paper px-4 py-3 text-base text-navy outline-none transition focus:border-navy" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-navy">Access code</span>
            <input value={accessCode} onChange={(event) => setAccessCode(event.target.value)} className="rounded-[1.2rem] border border-line bg-paper px-4 py-3 text-base text-navy outline-none transition focus:border-navy" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-navy">Closing date</span>
            <input type="date" value={closingDate} onChange={(event) => setClosingDate(event.target.value)} className="rounded-[1.2rem] border border-line bg-paper px-4 py-3 text-base text-navy outline-none transition focus:border-navy" />
          </label>
          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-medium text-navy">Property address</span>
            <input value={address} onChange={(event) => setAddress(event.target.value)} className="rounded-[1.2rem] border border-line bg-paper px-4 py-3 text-base text-navy outline-none transition focus:border-navy" />
          </label>
          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-medium text-navy">Cover photo JPG path</span>
            <input
              value={propertyImage}
              onChange={(event) => setPropertyImage(event.target.value)}
              placeholder="/client-portals/example-home.jpg"
              className="rounded-[1.2rem] border border-line bg-paper px-4 py-3 text-base text-navy outline-none transition focus:border-navy"
            />
            <span className="text-xs text-muted">
              Place the JPG in <code className="rounded bg-white px-1.5 py-0.5 text-[11px]">public/client-portals</code> and enter the path like <code className="rounded bg-white px-1.5 py-0.5 text-[11px]">/client-portals/example-home.jpg</code>.
            </span>
            <span className="text-xs text-muted">
              For the best banner quality, use a fairly wide image, ideally around 1600 pixels wide or larger.
            </span>
          </label>
          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-medium text-navy">Cover photo alt text</span>
            <input value={propertyImageAlt} onChange={(event) => setPropertyImageAlt(event.target.value)} className="rounded-[1.2rem] border border-line bg-paper px-4 py-3 text-base text-navy outline-none transition focus:border-navy" />
          </label>
          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-medium text-navy">Summary note</span>
            <textarea value={summaryNote} onChange={(event) => setSummaryNote(event.target.value)} rows={3} className="rounded-[1.2rem] border border-line bg-paper px-4 py-3 text-base text-navy outline-none transition focus:border-navy" />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-line bg-white p-8 shadow-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Milestones</p>
            <h3 className="mt-3 font-display text-3xl text-navy">Add, remove, or edit contingencies.</h3>
          </div>
          <button
            type="button"
            onClick={addMilestone}
            className="rounded-full border border-line px-5 py-2.5 text-sm text-navy transition hover:border-navy"
          >
            Add milestone
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="rounded-[1.6rem] border border-line bg-paper p-5">
              <div className="grid gap-4 md:grid-cols-[1.1fr_0.8fr_auto]">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-navy">Title</span>
                  <input
                    value={milestone.title}
                    onChange={(event) => updateMilestone(milestone.id, "title", event.target.value)}
                    className="rounded-[1rem] border border-line bg-white px-4 py-3 text-base text-navy outline-none transition focus:border-navy"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-navy">Deadline</span>
                  <input
                    type="date"
                    value={milestone.deadline}
                    onChange={(event) => updateMilestone(milestone.id, "deadline", event.target.value)}
                    className="rounded-[1rem] border border-line bg-white px-4 py-3 text-base text-navy outline-none transition focus:border-navy"
                  />
                </label>
                <div className="flex items-end gap-3">
                  <label className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-3 text-sm text-navy">
                    <input
                      type="checkbox"
                      checked={milestone.completed}
                      onChange={(event) => updateMilestone(milestone.id, "completed", event.target.checked)}
                    />
                    Completed
                  </label>
                  <button
                    type="button"
                    onClick={() => removeMilestone(milestone.id)}
                    className="rounded-full border border-line px-4 py-3 text-sm text-muted transition hover:border-navy hover:text-navy"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <label className="mt-4 grid gap-2">
                <span className="text-sm font-medium text-navy">Notes</span>
                <textarea
                  value={milestone.notes}
                  onChange={(event) => updateMilestone(milestone.id, "notes", event.target.value)}
                  rows={3}
                  className="rounded-[1rem] border border-line bg-white px-4 py-3 text-base text-navy outline-none transition focus:border-navy"
                />
              </label>
              <p className="mt-4 text-xs uppercase tracking-[0.24em] text-muted">Milestone {index + 1}</p>
            </div>
          ))}
        </div>
      </section>

      {status ? (
        <div className="rounded-[1.5rem] border border-line bg-white px-5 py-4 text-sm text-navy shadow-card">
          {status}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSaving || isDeleting}
          className="inline-flex items-center rounded-full bg-navy px-6 py-3 text-sm text-white transition hover:bg-[#1a2c47] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Create Portal"}
        </button>

        {isEditing ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isSaving || isDeleting}
            className="inline-flex items-center rounded-full border border-red-200 px-6 py-3 text-sm text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDeleting ? "Deleting..." : "Delete Portal"}
          </button>
        ) : null}
      </div>
    </form>
  );
}
