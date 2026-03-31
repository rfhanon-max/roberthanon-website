import { BrokerageSection } from "@/components/site/brokerage-section";
import { CtaBanner } from "@/components/site/cta-banner";
import { HistoryGallery } from "@/components/site/history-gallery";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { imageAssets, siteContent } from "@/lib/site-content";

export default function AboutPage() {
  const content = siteContent.about;

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryCta={{ label: "Connect with Robert", href: "/contact" }}
        image={imageAssets.guidance}
        fullBleed
      />

      <HistoryGallery
        title="A tradition of helping people move through important transitions well."
        description="Experience matters, but the way it is carried matters too. The aim is to bring history, steadiness, and personal attention into every relationship."
      />

      <section className="mx-auto w-full max-w-7xl px-6 pb-12 lg:px-8 lg:pb-20">
        <SectionHeading
          eyebrow="What Clients Can Expect"
          title="What clients can expect from me."
          description="The relationship should feel personal, thoughtful, and well guided from the first conversation onward."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {content.expectations.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-line bg-white px-6 py-6 shadow-card"
            >
              <h3 className="text-lg font-medium text-navy">{item.title}</h3>
              <p className="mt-3 text-base leading-8 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <BrokerageSection
        eyebrow="Shorewest Realtors"
        title="Supported by a respected brokerage, while keeping the relationship personal."
        description="Clients benefit from the strength of Shorewest Realtors and from a process that still feels direct, attentive, and centered on their specific needs."
      />

      <CtaBanner
        title="Real estate works best when the relationship begins with trust."
        description="If you would like to talk through a move, ask questions, or simply get a clearer sense of your options, Robert would be glad to connect."
        action={{ label: "Get in Touch", href: "/contact" }}
      />
    </>
  );
}
