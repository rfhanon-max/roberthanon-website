import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updatePortal } from "@/lib/client-portal-store";
import type { ClientMilestone } from "@/lib/client-portal-schema";

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
};

export async function POST(request: Request) {
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

  const updatedPortal = await updatePortal(payload.slug, {
    clientNames: payload.clientNames,
    viewLabel: "Accepted Offer Timeline Buyer",
    address: payload.address || "",
    propertyImage: payload.propertyImage || "",
    propertyImageAlt: payload.propertyImageAlt || "",
    transactionType: "Buyer",
    closingDate: payload.closingDate,
    summaryNote: payload.summaryNote || "",
    email: payload.email,
    accessCode: payload.accessCode,
    milestones: payload.milestones || [],
  });

  if (!updatedPortal) {
    return NextResponse.json({ error: "Portal not found." }, { status: 404 });
  }

  revalidatePath("/client-portal");
  revalidatePath(`/client-portal/${updatedPortal.slug}`);
  revalidatePath("/portal-studio");
  revalidatePath(`/portal-studio/${updatedPortal.slug}`);

  return NextResponse.json({ ok: true, slug: updatedPortal.slug });
}
