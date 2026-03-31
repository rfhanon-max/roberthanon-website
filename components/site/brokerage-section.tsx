import Image from "next/image";
import { SectionHeading } from "@/components/site/section-heading";

type BrokerageSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function BrokerageSection({
  eyebrow,
  title,
  description,
}: BrokerageSectionProps) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-16">
      <div>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-8 rounded-[1.5rem] border border-line bg-white px-5 py-4 text-sm leading-7 text-muted shadow-card">
          Shorewest Realtors brings broad market reach and trusted operational support, while
          every client relationship remains direct, personal, and carefully guided.
        </div>
      </div>

      <div className="rounded-[2rem] border border-line bg-white p-8 shadow-panel">
        <div className="relative mx-auto aspect-[16/10] w-full max-w-xl">
          <Image
            src="/history/logo.jpeg"
            alt="Shorewest Realtors logo"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 34vw"
          />
        </div>
      </div>
    </section>
  );
}
