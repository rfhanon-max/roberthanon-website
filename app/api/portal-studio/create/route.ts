import { revalidatePath } from "next/cache";
import { createPortal, portalTemplates } from "@/lib/client-portal-store";

type IncomingMilestone = {
  title: string;
  deadline: string;
  notes: string;
  completed: boolean;
};

export async function POST(request: Request) {
  try {
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
    };

    if (!payload.clientNames || !payload.email || !payload.accessCode || !payload.closingDate) {
      return Response.json(
        { error: "Client name, email, access code, and closing date are required." },
        { status: 400 },
      );
    }

    const template = portalTemplates.buyer;
    const milestones = (payload.milestones ?? [])
      .filter((item) => item.title.trim() && item.deadline.trim())
      .map((item) => ({
        title: item.title.trim(),
        deadline: item.deadline,
        notes: item.notes.trim(),
        completed: Boolean(item.completed),
      }));

    const created = await createPortal({
      clientNames: payload.clientNames.trim(),
      email: payload.email.trim(),
      accessCode: payload.accessCode.trim(),
      address: payload.address?.trim() || "Address to be added",
      propertyImage:
        payload.propertyImage?.trim() ||
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      propertyImageAlt: payload.propertyImageAlt?.trim() || "Client property cover photo",
      transactionType: template.transactionType,
      closingDate: payload.closingDate,
      summaryNote: payload.summaryNote?.trim() || template.summaryNote,
      viewLabel: template.viewLabel,
      milestones,
    });

    revalidatePath("/client-portal");
    revalidatePath(`/client-portal/${created.slug}`);
    revalidatePath("/portal-studio");

    return Response.json({ ok: true, slug: created.slug });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to create portal." },
      { status: 500 },
    );
  }
}
