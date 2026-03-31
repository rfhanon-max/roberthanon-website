import Link from "next/link";
import { SectionHeading } from "@/components/site/section-heading";

type ClientExperienceSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: readonly { title: string; description: string }[];
};

export function ClientExperienceSection({
  eyebrow,
  title,
  description,
  points,
}: ClientExperienceSectionProps) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
      <div>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-8 space-y-4">
          {points.map((point, index) => (
            <article
              key={point.title}
              className="grid gap-3 rounded-[1.5rem] border border-line bg-white px-5 py-5 shadow-card md:grid-cols-[auto_1fr] md:items-start"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-paper font-display text-lg text-navy">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-medium text-navy">{point.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{point.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-line bg-[#233a5b] p-8 text-white shadow-panel md:p-10">
        <p className="text-xs uppercase tracking-[0.32em] text-white/70">A Different Kind Of Service</p>
        <h3 className="mt-5 max-w-xl font-display text-3xl leading-tight md:text-4xl">
          Calm guidance, carried all the way through the details.
        </h3>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">
          The goal is not simply to answer questions. It is to stay present, organized, and
          responsive from the first conversation through closing, so clients feel well cared for at
          every stage.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
            <p className="text-sm font-medium text-white">Patient communication</p>
            <p className="mt-2 text-sm leading-7 text-white/72">
              Questions are welcomed, timing is respected, and big decisions are never rushed.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
            <p className="text-sm font-medium text-white">Steady follow-through</p>
            <p className="mt-2 text-sm leading-7 text-white/72">
              Once trust is given, the work continues with consistency until the goal is reached.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-[#22395d] transition hover:bg-[#f6efe4]"
            style={{ color: "#22395d" }}
          >
            Start the Conversation
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Read More About Robert
          </Link>
        </div>
      </div>
    </section>
  );
}
