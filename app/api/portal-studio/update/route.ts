import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updatePortal } from "@/lib/client-portal-store";
import {
  isValidPortalStudioSession,
  PORTAL_STUDIO_COOKIE,
} from "@/lib/portal-studio-access";
import type { ClientMilestone, ClientPortalView } from "@/lib/client-portal-schema";
import { portalTemplates } from "@/lib/client-portal-schema";

type Payload = {
  slug?: string;
  clientNames?: string;
  email?: string;
  accessCode?: string;
  address?: string;
  propertyImage?: string;
  propertyImageAlt?: string;
  closingDate?: string;
  summaryNote?: string;
  milestones?: ClientMilestone[];
  portalViews?: ClientPortalView[];
};

function getSaveErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.includes("EROFS")) {
    return "Portal Studio can only save portals while the site is running locally. The live website is read-only, so update the portal locally, commit it, and redeploy.";
  }

  return error instanceof Error ? error.message : "Unable to update portal.";
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    if (!isValidPortalStudioSession(cookieStore.get(PORTAL_STUDIO_COOKIE)?.value)) {
      return NextResponse.json({ error: "Portal Studio login is required." }, { status: 401 });
    }

    const payload = (await request.json()) as Payload;

    if (!payload.slug) {
      return NextResponse.json({ error: "Portal slug is required." }, { status: 400 });
    }

    if (!payload.clientNames || !payload.email || !payload.accessCode || !payload.closingDate) {
      return NextResponse.json(
        { error: "Client name, email, access code, and closing date are required." },
        { status: 400 },
      );
    }

    const template = portalTemplates.buyer;
    const cleanMilestones = (milestones: ClientMilestone[] = []) =>
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
            viewLabel: "Accepted Offer Timeline Buyer",
            address: payload.address || "",
            propertyImage: payload.propertyImage || "",
            propertyImageAlt: payload.propertyImageAlt || "",
            transactionType: "Buyer",
            closingDate: payload.closingDate,
            summaryNote: payload.summaryNote || "",
            milestones: payload.milestones || [],
          },
        ]).map((view, index) => ({
      id: view.id?.trim() || `view-${index + 1}`,
      label: view.label?.trim() || `View ${index + 1}`,
      viewLabel: view.viewLabel?.trim() || template.viewLabel,
      address: view.address?.trim() || "",
      propertyImage: view.propertyImage?.trim() || "",
      propertyImageAlt: view.propertyImageAlt?.trim() || "",
      transactionType: view.transactionType?.trim() || template.transactionType,
      closingDate: view.closingDate || payload.closingDate || "",
      summaryNote: view.summaryNote?.trim() || "",
      milestones: cleanMilestones(view.milestones),
    }));
    const primaryView = portalViews[0];

    const updatedPortal = await updatePortal(payload.slug, {
      clientNames: payload.clientNames,
      email: payload.email,
      accessCode: payload.accessCode,
      ...primaryView,
      portalViews,
    });

    if (!updatedPortal) {
      return NextResponse.json({ error: "Portal not found." }, { status: 404 });
    }

    revalidatePath("/client-portal");
    revalidatePath(`/client-portal/${updatedPortal.slug}`);
    revalidatePath("/portal-studio");
    revalidatePath(`/portal-studio/${updatedPortal.slug}`);

    return NextResponse.json({ ok: true, slug: updatedPortal.slug });
  } catch (error) {
    return NextResponse.json({ error: getSaveErrorMessage(error) }, { status: 500 });
  }
}
