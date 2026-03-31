export type NavItem = {
  label: string;
  href: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  label: string;
  position?: string;
};

// Keep the main site copy here so future edits stay in one place.
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Buying", href: "/buying" },
  { label: "Selling", href: "/selling" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const contactDetails = {
  phone: "262-490-9036",
  email: "rhanon@shorewest.com",
  office: "Shorewest Realtors",
  region: "1296 Summit Ave, Oconomowoc WI 53066",
};

export const imageAssets = {
  hero: {
    src: "/hero/Robert002.jpg",
    alt: "Robert Hanon in a professional portrait",
    label: "Robert Hanon",
    position: "72% 20%",
  },
  heroSecondary: {
    src: "/hero/Robert002.jpg",
    alt: "Robert Hanon in a professional portrait",
    label: "Robert Hanon",
    position: "center 20%",
  },
  legacy: {
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
    alt: "Warm, refined kitchen and entry detail",
    label: "Family legacy section placeholder",
  },
  buyingHero: {
    src: "/buying/Derby Ln-023.jpg",
    alt: "Bright kitchen with natural light and a large island",
    label: "Buying page hero image",
  },
  exterior: {
    src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    alt: "Elegant home exterior at dusk",
    label: "Exterior placeholder",
  },
  sellingHero: {
    src: "/selling/9-print-Harwood Ave-009.jpg",
    alt: "Classic home exterior with mature trees and inviting curb appeal",
    label: "Selling page hero image",
    position: "center 42%",
  },
  guidance: {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80",
    alt: "People sitting together at a table during a meeting",
    label: "Client conversation",
    position: "center 28%",
  },
} satisfies Record<string, ImageAsset>;

export const siteContent = {
  brand: {
    name: "Robert Hanon",
    tagline: "Your Time. Your Life. Your Home.",
    subtitle: "Shorewest Realtors",
  },
  home: {
    hero: {
      eyebrow: "Southeastern Wisconsin Real Estate",
      title:
        "Real estate guidance shaped by legacy, centered on your life.",
      description:
        "Buying or selling a home is rarely just about property. It is about timing, transition, and protecting what matters most. The process should feel calm, well-guided, and deeply considerate of your time, money, and peace of mind.",
      primaryCta: { label: "Start the Conversation", href: "/contact" },
      secondaryCta: { label: "Explore Services", href: "/buying" },
    },
    serviceCards: [
      {
        title: "Buying",
        description:
          "A thoughtful path to finding the right home, understanding value, and moving with clarity.",
        href: "/buying",
      },
      {
        title: "Selling",
        description:
          "Preparation, presentation, pricing, and negotiation handled with steady attention to detail.",
        href: "/selling",
      },
    ],
    legacy: {
      eyebrow: "A Family Tradition",
      title: "Honoring a Hanon Heritage",
      description:
        "For the Hanon family, real estate has never been about moving from one transaction to the next. It has been a way of serving people, staying rooted in Southeastern Wisconsin, and helping neighbors make important decisions well. Robert joined that tradition in 2014 with the intention of building something lasting: trusted relationships, thoughtful guidance, and a way of serving people that still feels meaningful years down the road.",
      highlights: [
        "A legacy measured in trust, not transaction count",
        "Relationships built to last within the same community Robert calls home",
        "Guidance shaped by the belief that longevity in this work means something",
      ],
    },
    clientExperience: {
      eyebrow: "Working With Robert",
      title: "A client experience shaped by patience, steadiness, and real care.",
      description:
        "The best real estate relationships are built on trust. Clients should feel listened to, well-guided, and supported by someone who will stay with the details all the way through.",
      points: [
        {
          title: "Questions are welcomed, never rushed past",
          description:
            "Real estate brings uncertainty, and clients deserve a process where it feels natural to ask, pause, and understand what comes next.",
        },
        {
          title: "Advice stays calm when the stakes feel high",
          description:
            "Major decisions are easier when the guidance is steady, clear, and focused on what truly matters rather than pressure or noise.",
        },
        {
          title: "Follow-through matters just as much as first impressions",
          description:
            "Once clients place their trust in the process, the work continues with consistency, care, and close attention to the details that protect them.",
        },
      ],
    },
    portalFeature: {
      eyebrow: "Professional Support",
      title: "A more organized experience, supported by tools that keep clients informed.",
      description:
        "Personal service is strongest when it is backed by good systems. Alongside the support of Shorewest Realtors, clients also have access to a private portal that keeps key dates, milestones, and next steps easy to find.",
      bullets: [
        "Private login access for each client, so transaction details stay easy to revisit in one place",
        "A clearer view of deadlines, milestones, and what is coming next during the process",
        "A more polished, thoughtful experience that supports communication beyond email alone",
      ],
    },
    principles: [
      {
        title: "Home Matters",
        description:
          "Home is a sacred place where life happens and memories are built. The process should honor that.",
      },
      {
        title: "Guidance Without Noise",
        description:
          "Clear communication and steady advice help keep important decisions calm and manageable.",
      },
      {
        title: "Protection of Time and Money",
        description:
          "Every recommendation should respect your schedule, your resources, and the weight of the move.",
      },
    ],
    featureSections: [
      {
        eyebrow: "A Better Experience",
        title: "Support that feels personal, composed, and deeply considered.",
        description:
          "The best real estate experience is one where you feel informed without being overwhelmed. Thoughtful structure, timely communication, and careful pacing make room for better decisions.",
        image: imageAssets.guidance,
      },
      {
        eyebrow: "Presentation with Restraint",
        title: "Homes presented beautifully, honestly, and with a strong sense of place.",
        description:
          "Good marketing reveals the character of a home without leaning on hype. It should create confidence, not noise.",
        image: imageAssets.exterior,
      },
    ],
  },
  buying: {
    eyebrow: "Buying",
    title: "Buying with Clarity and Confidence.",
    description:
      "Whether this is your first home or your next move, you should feel understood and the process should feel clear, steady, and personal.",
    process: [
      "Clarify your goals and put the right systems in place",
      "Learn the market and understand your options",
      "Write and negotiate with steady guidance",
      "Move through inspections, financing, and closing with confidence",
    ],
    testimonials: [
      {
        quote:
          "I cannot recommend Robert enough! He was fantastic throughout the entirety of the home buying process maintaining a high level of communication and professionalism. He did a great job in early stages informing us of the process and what to expect as well as walk us through what offer strategies looked like. From there he refined our search criteria and worked with us to find locations we felt were appealing. At no point did he feel pushy or rushed and his calm demeanor gave us confidence to make the decision on our own timeline. Once we got to the offer stage, he clearly laid out what he thought would be a competitive and appealing offer and helped us make decision we were comfortable with. You can sense his experience throughout the entirety of the process and we cannot be more thankful we were referred to him!",
        author: "Andrew Zeman and Leah Z",
      },
      {
        quote:
          "I worked with Robert to purchase my first home! He went above and beyond in explaining the process to me at every step of the way. It was clear that Robert cares about his clients and wants to help them find the right fit. Robert was consistently generous with his time and insight, and I was always able to reach him quickly and get answers to any questions I had. His communication was excellent and I felt prepared when it was time to make an offer. Working with Robert was a joy! I would recommend him to anybody (and already have).",
        author: "Abby M",
      },
      {
        quote:
          "Robert was extremely hard working and knowledgeable in seeing our buying of a home through to completion. The Milwaukee real estate market is highly challenging from a buyer's perspective right now. Having a real estate agent who leaves no stone unturned is essential. Robert is that person. We will be recommending him to others. A final thought...Robert became more than a real estate agent during this process. He became a friend to us. As a buyer from another state who had extremely limited access to seeing the real estate in Milwaukee first hand, this friendship originated out of the trust he earned in scouring the area for a potential home in our absence. At the end of this process, we were fortunate to be able to use words like trust, conscientious, knowledgeable and friend in regards to our real estate agent.",
        author: "John Buetow and Jennifer B",
      },
    ],
  },
  selling: {
    eyebrow: "Selling",
    title: "Selling with a clear plan and steady guidance.",
    description:
      "Selling a home is personal. My role is to help you understand the process, make strong decisions along the way, and move forward with a plan that fits your goals.",
    process: [
      "Start with communication, clear goals, and a path forward",
      "Prepare the property so it shows at its best",
      "Launch strongly and pay close attention to the response",
      "Negotiate with clarity, perspective, and good strategy",
      "Stay steady through the details all the way to closing",
    ],
    perspective: {
      eyebrow: "A Seller's Situation Is Personal",
      title: "No two sellers are moving for the same reason.",
      description:
        "Selling is often more complex than it looks from the outside. Every seller is carrying a different set of circumstances, needs, and goals. My job is to understand the full picture, listen carefully to what matters most, and help shape a plan that truly works for the move in front of you.",
      situations: [
        {
          title: "Life changes shape the move",
          description:
            "Some sellers are making a long-planned move. Others are responding to a job change, a growing family, a downsizing decision, or a season of transition that came unexpectedly.",
        },
        {
          title: "Goals can change as the process unfolds",
          description:
            "What feels most important at the beginning is not always what matters most later. Part of the work is staying flexible while keeping the plan grounded in what serves you best.",
        },
        {
          title: "The strategy should fit the person",
          description:
            "There is no one-size-fits-all way to sell a home well. Timing, preparation, pricing, and negotiation all need to reflect the seller's real situation.",
        },
        {
          title: "Care means listening first",
          description:
            "Before making recommendations, I want to understand what is happening in your life, what concerns you have, and what a successful move would actually look like for you.",
        },
      ],
    },
  },
  about: {
    eyebrow: "About",
    title: "Real estate has always been about people for me.",
    description:
      "I joined the family business in 2014. What I found early on was that real estate gave me a way to do what I had always wanted to do: connect with people and help them through important moments in life. Some of those moments are exciting. Some are difficult. In either case, my goal is the same. I want people to feel understood and cared for through the process.",
    expectations: [
      {
        title: "I want clients to feel understood",
        description:
          "Real estate is personal, and people deserve to feel heard, not pushed through a process that does not fit their life or their priorities.",
      },
      {
        title: "I believe informed clients make better decisions",
        description:
          "A big part of my role is helping people understand what is happening, what their options are, and what to expect next so they can move forward with confidence.",
      },
      {
        title: "I use process to create clarity",
        description:
          "Whether someone is buying or selling, I want the experience to feel organized, thoughtful, and well guided from beginning to end.",
      },
      {
        title: "Trust is built in the follow-through",
        description:
          "Good service is not just about getting started well. It is about staying steady through the details all the way to closing.",
      },
    ],
    values: [
      "Help people feel understood, not rushed",
      "Teach the process clearly so clients can make confident decisions",
      "Carry forward a family legacy built on honesty and trustworthiness",
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's connect.",
    description:
      "Whether you are preparing to buy, considering a sale, or simply exploring your options, the first step is a thoughtful conversation about your timing, goals, and what comes next.",
    prompts: [
      "Tell me about your timeline",
      "Share the area or neighborhoods you are considering",
      "Let me know whether you are buying, selling, or both",
    ],
  },
  footer: {
    description:
      "Personal real estate guidance for buyers and sellers in Southeastern Wisconsin, shaped by family legacy, careful service, and a calm, trust-centered process.",
  },
} as const;
