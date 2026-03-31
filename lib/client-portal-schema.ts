export type ClientMilestone = {
  title: string;
  deadline: string;
  notes: string;
  completed: boolean;
};

export type ClientPortalRecord = {
  slug: string;
  clientNames: string;
  viewLabel: string;
  address: string;
  propertyImage: string;
  propertyImageAlt: string;
  transactionType: string;
  closingDate: string;
  summaryNote: string;
  email: string;
  accessCode: string;
  milestones: ClientMilestone[];
};

export const portalTemplates = {
  buyer: {
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
} as const;
