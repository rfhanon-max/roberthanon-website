type CardItem = {
  title: string;
  description: string;
};

type CardGridProps = {
  items: readonly CardItem[];
  columns?: 2 | 3;
};

export function CardGrid({ items, columns = 3 }: CardGridProps) {
  const gridClassName = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <div className={`grid gap-6 ${gridClassName}`}>
      {items.map((item) => (
        <article key={item.title} className="rounded-[1.75rem] border border-line bg-white p-8 shadow-card">
          <h3 className="font-display text-2xl text-navy">{item.title}</h3>
          <p className="mt-4 text-base leading-7 text-muted">{item.description}</p>
        </article>
      ))}
    </div>
  );
}
