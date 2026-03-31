import { ImagePanel } from "@/components/site/image-panel";
import { SectionHeading } from "@/components/site/section-heading";
import type { ImageAsset } from "@/lib/site-content";

type SplitSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: ImageAsset;
  bullets?: readonly string[];
  reverse?: boolean;
};

export function SplitSection({
  eyebrow,
  title,
  description,
  image,
  bullets,
  reverse = false,
}: SplitSectionProps) {
  return (
    <section
      className={`mx-auto grid w-full max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:items-center lg:px-8 ${
        reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
      }`}
    >
      <ImagePanel image={image} />

      <div>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {bullets ? (
          <div className="mt-8 grid gap-4">
            {bullets.map((bullet) => (
              <div
                key={bullet}
                className="rounded-[1.5rem] border border-line bg-white px-5 py-4 text-sm leading-7 text-muted shadow-card"
              >
                {bullet}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
