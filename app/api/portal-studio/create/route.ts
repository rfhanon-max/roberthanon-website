import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createPortal, portalTemplates } from "@/lib/client-portal-store";
import {
  isValidPortalStudioSession,
  PORTAL_STUDIO_COOKIE,
} from "@/lib/portal-studio-access";

type IncomingMilestone = {
  title: string;
  deadline: string;
  notes: string;
  completed: boolean;
};

type IncomingPortalView = {
  id: string;
  label: string;
  viewLabel: string;
  address: string;
  propertyImage: string;
  propertyImageAlt: string;
  transactionType: string;
  closingDate: string;
  summaryNote: string;
  milestones: IncomingMilestone[];
};

function getSaveErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.includes("EROFS")) {
    return "Portal Studio can only save portals while the site is running locally. The live website is read-only, so add the portal locally, commit it, and redeploy.";
  }

  return error instanceof Error ? error.message : "Unable to create portal.";
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    if (!isValidPortalStudioSession(cookieStore.get(PORTAL_STUDIO_COOKIE)?.value)) {
      return Response.json({ error: "Portal Studio login is required." }, { status: 401 });
    }

    const payload = (await request.json()) as {
      clientNames?: string;
      email?: string;
      accessCode?: string;
      address?: string;
      propertyImage?: string;
      propertyImageAlt?: string;
      closingDate?: string;
      summaryNote?: string;
      milestones?: IncomingMilestone[];
      portalViews?: IncomingPortalView[];
    };

    if (!payload.clientNames || !payload.email || !payload.accessCode || !payload.closingDate) {
      return Response.json(
        { error: "Client name, email, access code, and closing date are required." },
        { status: 400 },
      );
    }

    const template = portalTemplates.buyer;
    const cleanMilestones = (milestones: IncomingMilestone[] = []) =>
      milestones
      .filter((item) => item.title.trim() && item.deadline.trim())
      .map((item) => ({
        title: item.title.trim(),
        deadline: item.deadline,
        notes: item.notes.trim(),
        completed: Boolean(item.completed),
      }));

    const portalViews = (payload.portalViews?.length
      ? payload.portalViews
      : [
          {
            id: template.id,
            label: template.label,
            viewLabel: template.viewLabel,
            address: payload.address?.trim() || "Address to be added",
            propertyImage: payload.propertyImage?.trim() || "",
            propertyImageAlt: payload.propertyImageAlt?.trim() || "Client property cover photo",
            transactionType: template.transactionType,
            closingDate: payload.closingDate,
            summaryNote: payload.summaryNote?.trim() || template.summaryNote,
            milestones: payload.milestones ?? [],
          },
        ]).map((view, index) => ({
      id: view.id?.trim() || `view-${index + 1}`,
      label: view.label?.trim() || `View ${index + 1}`,
      viewLabel: view.viewLabel?.trim() || template.viewLabel,
      address: view.address?.trim() || "Address to be added",
      propertyImage:
        view.propertyImage?.trim() ||
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      propertyImageAlt: view.propertyImageAlt?.trim() || "Client property cover photo",
      transactionType: view.transactionType?.trim() || template.transactionType,
      closingDate: view.closingDate || payload.closingDate || "",
      summaryNote: view.summaryNote?.trim() || template.summaryNote,
      milestones: cleanMilestones(view.milestones),
    }));
    const primaryView = portalViews[0];

    const created = await createPortal({
      clientNames: payload.clientNames.trim(),
      email: payload.email.trim(),
      accessCode: payload.accessCode.trim(),
      ...primaryView,
      portalViews,
    });

    revalidatePath("/client-portal");
    revalidatePath(`/client-portal/${created.slug}`);
    revalidatePath("/portal-studio");

    return Response.json({ ok: true, slug: created.slug });
  } catch (error) {
    return Response.json(
      { error: getSaveErrorMessage(error) },
      { status: 500 },
    );
  }
}
