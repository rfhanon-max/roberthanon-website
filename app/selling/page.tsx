import { CtaBanner } from "@/components/site/cta-banner";
import { PageHero } from "@/components/site/page-hero";
import { ProcessList } from "@/components/site/process-list";
import { SectionHeading } from "@/components/site/section-heading";
import { imageAssets, siteContent } from "@/lib/site-content";

export default function SellingPage() {
  const content = siteContent.selling;

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryCta={{ label: "Discuss Your Sale", href: "/contact" }}
        image={imageAssets.sellingHero}
        fullBleed
      />

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="The Selling Process"
          title="What selling with Robert looks like."
          description="The goal is to keep the process clear, thoughtful, and steady from the first conversation through closing."
        />
        <ProcessList items={content.process} variant="compact" />
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="rounded-[2rem] border border-line bg-white px-8 py-10 shadow-panel md:px-12 md:py-14">
          <SectionHeading
            eyebrow={content.perspective.eyebrow}
            title={content.perspective.title}
            description={content.perspective.description}
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {content.perspective.situations.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-line bg-paper px-5 py-5 shadow-card"
              >
                <h3 className="text-lg font-medium text-navy">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Thinking about selling starts with understanding your options."
        description="A well-informed strategy conversation can help you decide when to move, how to prepare, and what to expect from the market."
        action={{ label: "Start the Conversation", href: "/contact" }}
      />
    </>
  );
}
