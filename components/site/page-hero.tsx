import Link from "next/link";
import { ImagePanel } from "@/components/site/image-panel";
import type { ImageAsset } from "@/lib/site-content";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: ImageAsset;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  fullBleed?: boolean;
  framed?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  primaryCta,
  secondaryCta,
  fullBleed = false,
  framed = false,
}: PageHeroProps) {
  if (framed) {
    const encodedImageSrc = encodeURI(image.src);

    return (
      <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-14 lg:pt-10">
        <div
          className="relative mx-auto min-h-[68vh] w-full max-w-[75rem] overflow-hidden rounded-[2.5rem] border border-line shadow-panel"
          style={{
            backgroundImage: `linear-gradient(rgba(22, 35, 57, 0.42), rgba(22, 35, 57, 0.42)), url("${encodedImageSrc}")`,
            backgroundPosition: image.position ?? "center",
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto flex min-h-[68vh] w-full max-w-7xl items-end px-6 pb-12 pt-20 lg:px-10 lg:pb-16 lg:pt-24">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.34em] text-white/78">{eyebrow}</p>
              <h1 className="mt-6 font-display text-5xl leading-[1.02] text-white md:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88">{description}</p>

              {(primaryCta || secondaryCta) && (
                <div className="mt-8 flex flex-wrap gap-4">
                  {primaryCta ? (
                    <Link
                      href={primaryCta.href}
                      className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium shadow-sm transition hover:bg-[#f6efe4]"
                      style={{ color: "#22395d" }}
                    >
                      {primaryCta.label}
                    </Link>
                  ) : null}
                  {secondaryCta ? (
                    <Link
                      href={secondaryCta.href}
                      className="inline-flex items-center rounded-full border border-white/35 bg-white/8 px-6 py-3 text-sm text-white transition hover:bg-white/14"
                      style={{ color: "#f8f5ef" }}
                    >
                      {secondaryCta.label}
                    </Link>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (fullBleed) {
    const encodedImageSrc = encodeURI(image.src);

    return (
      <section
        className="relative min-h-[72vh] overflow-hidden border-b border-line"
        style={{
          backgroundImage: `linear-gradient(rgba(22, 35, 57, 0.48), rgba(22, 35, 57, 0.48)), url("${encodedImageSrc}")`,
          backgroundPosition: image.position ?? "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto flex min-h-[72vh] w-full max-w-7xl items-end px-6 pb-14 pt-20 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.34em] text-white/78">{eyebrow}</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] text-white md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88">{description}</p>

            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {primaryCta ? (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium shadow-sm transition hover:bg-[#f6efe4]"
                    style={{ color: "#22395d" }}
                  >
                    {primaryCta.label}
                  </Link>
                ) : null}
                {secondaryCta ? (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center rounded-full border border-white/35 bg-white/8 px-6 py-3 text-sm text-white transition hover:bg-white/14"
                    style={{ color: "#f8f5ef" }}
                  >
                    {secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-16">
      <div className="flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.34em] text-muted">{eyebrow}</p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] text-navy md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{description}</p>

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center rounded-full bg-navy px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-accent"
                style={{ color: "#f8f5ef" }}
              >
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm text-navy transition hover:border-navy"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        )}
      </div>

      <ImagePanel image={image} heightClassName="min-h-[520px]" />
    </section>
  );
}
