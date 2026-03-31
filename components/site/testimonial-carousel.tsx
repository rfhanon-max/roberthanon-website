"use client";

import { useState } from "react";

type Testimonial = {
  quote: string;
  author: string;
};

type TestimonialCarouselProps = {
  testimonials: readonly Testimonial[];
};

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  if (!activeTestimonial) {
    return null;
  }

  return (
    <div className="rounded-[2rem] border border-line bg-white p-8 shadow-panel md:p-10">
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-full border border-line bg-paper px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-muted">
          Buyer Testimonial
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg leading-none text-navy transition hover:border-navy hover:bg-paper"
            aria-label="Show previous testimonial"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg leading-none text-navy transition hover:border-navy hover:bg-paper"
            aria-label="Show next testimonial"
          >
            ›
          </button>
        </div>
      </div>

      <blockquote className="mt-8">
        <p className="font-display text-2xl leading-relaxed text-navy md:text-3xl">“</p>
        <p className="mt-4 text-lg leading-9 text-muted md:text-[1.35rem] md:leading-10">
          {activeTestimonial.quote}
        </p>
        <footer className="mt-8 text-right text-base font-medium text-navy md:text-lg">
          - {activeTestimonial.author}
        </footer>
      </blockquote>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.author}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition ${
              index === activeIndex ? "w-10 bg-navy" : "w-2.5 bg-line hover:bg-muted/50"
            }`}
            aria-label={`Show testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
