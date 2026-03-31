import { CtaBanner } from "@/components/site/cta-banner";
import { PageHero } from "@/components/site/page-hero";
import { ProcessList } from "@/components/site/process-list";
import { SectionHeading } from "@/components/site/section-heading";
import { SplitSection } from "@/components/site/split-section";
import { TestimonialCarousel } from "@/components/site/testimonial-carousel";
import { imageAssets, siteContent } from "@/lib/site-content";

export default function BuyingPage() {
  const content = siteContent.buying;

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryCta={{ label: "Schedule a Conversation", href: "/contact" }}
        image={imageAssets.buyingHero}
        fullBleed
      />

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="The Buying Process"
          title="Clear steps, careful pacing, and guidance that never feels rushed."
          description="The goal is to reduce noise, create confidence, and help you move at the right speed for your life and your priorities."
        />
        <ProcessList items={content.process} />
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="What Buyers Say"
          title="What it feels like to buy with Robert."
          description="These client experiences say more than a polished list of promises ever could."
          align="center"
        />
        <div className="mt-12">
          <TestimonialCarousel testimonials={content.testimonials} />
        </div>
      </section>

      <SplitSection
        eyebrow="A Personal Standard"
        title="The right guidance helps you recognize the right home."
        description="Buying is both practical and personal. The work is to help you evaluate each option clearly while staying connected to the life you want that home to support."
        image={imageAssets.heroSecondary}
      />

      <CtaBanner
        title="If buying is on the horizon, the first step can stay simple."
        description="A conversation about timing, goals, and the shape of the market is often enough to bring the process into focus."
        action={{ label: "Reach Out", href: "/contact" }}
      />
    </>
  );
}
