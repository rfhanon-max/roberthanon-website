type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const className = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  return (
    <div className={className}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.34em] text-muted">{eyebrow}</p>
      ) : null}
      <h2 className="mt-4 font-display text-3xl leading-tight text-navy md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-muted md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
