export type ClientMilestone = {
  title: string;
  deadline: string;
  notes: string;
  completed: boolean;
};

export type ClientPortalView = {
  id: string;
  label: string;
  viewLabel: string;
  address: string;
  propertyImage: string;
  propertyImageAlt: string;
  transactionType: string;
  closingDate: string;
  summaryNote: string;
  milestones: ClientMilestone[];
};

export type ClientPortalRecord = ClientPortalView & {
  slug: string;
  clientNames: string;
  email: string;
  accessCode: string;
  portalViews?: ClientPortalView[];
};

export const portalTemplates = {
  buyer: {
    id: "buying",
    label: "Buying",
    viewLabel: "Accepted Offer Timeline Buyer",
    transactionType: "Buyer",
    summaryNote:
      "Everything here is designed to keep the next steps clear, organized, and easy to follow.",
    milestones: [
      {
        title: "Accepted Offer Date",
        deadline: "",
        notes: "Congratulations. Our offer was accepted and the contract is now fully binding.",
        completed: false,
      },
      {
        title: "Earnest Money",
        deadline: "",
        notes: "Earnest money needs to be submitted within 5 days of the accepted offer.",
        completed: false,
      },
      {
        title: "Proof of Funds / Application",
        deadline: "",
        notes: "Provide proof of funds or proof of loan application by the contract deadline.",
        completed: false,
      },
      {
        title: "Home Inspection",
        deadline: "",
        notes: "Inspection will be scheduled and any follow-up requests can be tracked here.",
        completed: false,
      },
      {
        title: "Well",
        deadline: "",
        notes: "Seller to provide the well inspection and water test reports for review.",
        completed: false,
      },
      {
        title: "Financing",
        deadline: "",
        notes: "This is the financing contingency deadline. Please respond quickly to lender requests so we stay on track.",
        completed: false,
      },
      {
        title: "Appraisal",
        deadline: "",
        notes: "Please let me know as soon as the appraisal is completed so we can review next steps.",
        completed: false,
      },
      {
        title: "Title",
        deadline: "",
        notes: "Title commitment should be delivered for review so we can confirm there are no issues to resolve.",
        completed: false,
      },
      {
        title: "Pre-Closing Walkthrough",
        deadline: "",
        notes: "We will schedule the final walkthrough shortly before closing to confirm the property condition.",
        completed: false,
      },
      {
        title: "Closing Date",
        deadline: "",
        notes: "Closing will be coordinated with the lender and title company. I will confirm time and location.",
        completed: false,
      },
    ] satisfies ClientMilestone[],
  },
  seller: {
    id: "selling",
    label: "Selling",
    viewLabel: "Accepted Offer Timeline Seller",
    transactionType: "Seller",
    summaryNote:
      "Everything here is designed to keep the listing, deadlines, and next steps clear as we move toward closing.",
    milestones: [
      {
        title: "Listing Agreement",
        deadline: "",
        notes: "Listing paperwork is signed and the selling plan is ready to move forward.",
        completed: false,
      },
      {
        title: "Photography / Media",
        deadline: "",
        notes: "Photography, measurements, and listing media are coordinated before launch.",
        completed: false,
      },
      {
        title: "Listing Live",
        deadline: "",
        notes: "The property is active and showing activity can be tracked from here.",
        completed: false,
      },
      {
        title: "Offer Review",
        deadline: "",
        notes: "We will review offer terms, timing, contingencies, and net proceeds together.",
        completed: false,
      },
      {
        title: "Inspection Contingency",
        deadline: "",
        notes: "Inspection-related deadlines and any buyer requests can be tracked here.",
        completed: false,
      },
      {
        title: "Appraisal",
        deadline: "",
        notes: "The buyer lender appraisal is monitored so we can respond quickly if anything needs attention.",
        completed: false,
      },
      {
        title: "Title",
        deadline: "",
        notes: "Title work is reviewed and any items needing seller attention are resolved.",
        completed: false,
      },
      {
        title: "Final Walkthrough",
        deadline: "",
        notes: "Buyer walkthrough is coordinated shortly before closing.",
        completed: false,
      },
      {
        title: "Closing Date",
        deadline: "",
        notes: "Closing will be coordinated with the title company. I will confirm time, location, and what to bring.",
        completed: false,
      },
    ] satisfies ClientMilestone[],
  },
} as const;

export function getPortalViews(record: ClientPortalRecord): ClientPortalView[] {
  if (record.portalViews?.length) {
    return record.portalViews;
  }

  return [
    {
      id: record.transactionType.toLowerCase().includes("seller") ? "selling" : "buying",
      label: record.transactionType.toLowerCase().includes("seller") ? "Selling" : "Buying",
      viewLabel: record.viewLabel,
      address: record.address,
      propertyImage: record.propertyImage,
      propertyImageAlt: record.propertyImageAlt,
      transactionType: record.transactionType,
      closingDate: record.closingDate,
      summaryNote: record.summaryNote,
      milestones: record.milestones,
    },
  ];
}

export function normalizePortalRecord(record: ClientPortalRecord): ClientPortalRecord {
  const portalViews = getPortalViews(record);
  const primaryView = portalViews[0];

  return {
    ...record,
    ...primaryView,
    portalViews,
  };
}
