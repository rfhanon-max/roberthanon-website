import { LegacyCarousel } from "@/components/site/legacy-carousel";

type LegacyFeatureProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: readonly string[];
};

const legacyImages = [
  {
    src: "/history/Hanon Sign.jpg",
    alt: "Vintage Hanon Inc. Realtors for sale sign",
    caption: "The Hanon name has been part of the local real estate landscape for decades.",
    imageClassName: "object-cover object-[center_24%]",
    frameClassName: "bg-stone-100",
  },
  {
    src: "/history/4 generations.jpg",
    alt: "Four generations of the Hanon family together in a portrait",
    caption:
      "Back row: Dwayne Hanon (Grandpa), Sy Hanon (Great Grandpa), Glenn Hanon (Dad). Front row: Robert Hanon (me!), Paul Hanon (talented brother!).",
    imageClassName: "object-cover object-[center_15%]",
    frameClassName: "bg-stone-100",
  },
  {
    src: "/history/Grandpa Sy and Dwayne.jpg",
    alt: "Historic Hanon newspaper clipping featuring Grandpa Sy and Dwayne",
    caption: "A Hanon newspaper clipping from the business archive.",
    imageClassName: "object-contain p-6",
    frameClassName: "bg-[#efe1cd]",
  },
  {
    src: "/history/hanon building.jpg",
    alt: "Historic Hanon office building photo",
    caption: "An earlier Hanon office sign and building from the family archive.",
    imageClassName: "object-contain p-6",
    frameClassName: "bg-[#f2eadf]",
  },
] as const;

export function LegacyFeature({
  eyebrow,
  title,
  description,
  highlights,
}: LegacyFeatureProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
      <div className="rounded-[2.5rem] border border-line bg-[linear-gradient(180deg,#fffdf9_0%,#f6efe4_100%)] p-8 shadow-panel md:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-muted">{eyebrow}</p>
            <h2 className="mt-5 max-w-2xl font-display text-4xl leading-tight text-navy md:text-5xl">
              {title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{description}</p>

            <div className="mt-8 grid gap-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[1.35rem] border border-line/90 bg-white/70 px-4 py-3 text-sm leading-7 text-muted"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <LegacyCarousel slides={legacyImages} />
        </div>
      </div>
    </section>
  );
}
