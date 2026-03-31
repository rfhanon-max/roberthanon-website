import Link from "next/link";
import { ClientExperienceSection } from "@/components/site/client-experience-section";
import { CtaBanner } from "@/components/site/cta-banner";
import { LegacyFeature } from "@/components/site/legacy-feature";
import { PageHero } from "@/components/site/page-hero";
import { PortalFeatureSection } from "@/components/site/portal-feature-section";
import { imageAssets, siteContent } from "@/lib/site-content";

export default function HomePage() {
  const { hero, serviceCards, legacy, clientExperience, portalFeature } = siteContent.home;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        image={imageAssets.hero}
        framed
      />

      <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-6 lg:px-8 lg:pb-10 lg:pt-8">
        <div className="grid gap-5 md:grid-cols-2">
          {serviceCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[2rem] border border-line bg-white px-8 py-7 shadow-card"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Service</p>
              <h2 className="mt-4 font-display text-3xl text-navy">{card.title}</h2>
              <p className="mt-3 max-w-[28rem] text-base leading-8 text-muted">{card.description}</p>
              <Link
                href={card.href}
                className="mt-6 inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm text-navy transition hover:border-navy"
              >
                Learn More
              </Link>
            </article>
          ))}
        </div>
      </section>

      <LegacyFeature
        eyebrow={legacy.eyebrow}
        title={legacy.title}
        description={legacy.description}
        highlights={legacy.highlights}
      />

      <ClientExperienceSection
        eyebrow={clientExperience.eyebrow}
        title={clientExperience.title}
        description={clientExperience.description}
        points={clientExperience.points}
      />

      <PortalFeatureSection
        eyebrow={portalFeature.eyebrow}
        title={portalFeature.title}
        description={portalFeature.description}
        bullets={portalFeature.bullets}
      />

      <CtaBanner
        title="The next move should feel considered from the very beginning."
        description="If you are thinking about buying, selling, or doing both, a simple conversation is often the right place to start."
        action={{ label: "Contact Robert", href: "/contact" }}
      />
    </>
  );
}
