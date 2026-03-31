type ProcessListProps = {
  items: readonly string[];
  variant?: "stack" | "compact";
};

export function ProcessList({ items, variant = "stack" }: ProcessListProps) {
  if (variant === "compact") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={item}
            className="rounded-[1.35rem] border border-line bg-white px-5 py-4 shadow-card"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper font-display text-base text-navy">
                {index + 1}
              </div>
              <p className="pt-1 text-[15px] leading-6 text-muted">{item}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div
          key={item}
          className="grid gap-4 rounded-[1.5rem] border border-line bg-white p-6 shadow-card md:grid-cols-[auto_1fr] md:items-start"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-paper font-display text-lg text-navy">
            {index + 1}
          </div>
          <p className="pt-1 text-base leading-7 text-muted">{item}</p>
        </div>
      ))}
    </div>
  );
}
