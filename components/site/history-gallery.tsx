import { LegacyCarousel } from "@/components/site/legacy-carousel";

type HistoryGalleryProps = {
  title: string;
  description: string;
};

const historyImages = [
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

export function HistoryGallery({ title, description }: HistoryGalleryProps) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 pb-12 pt-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-20 lg:pt-10">
      <div className="flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.34em] text-muted">Family Legacy</p>
        <h2 className="mt-5 max-w-2xl font-display text-4xl leading-tight text-navy md:text-5xl">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{description}</p>
      </div>

      <LegacyCarousel slides={historyImages} />
    </section>
  );
}
