"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type LegacySlide = {
  src: string;
  alt: string;
  caption: string;
  imageClassName: string;
  frameClassName?: string;
};

type LegacyCarouselProps = {
  slides: readonly LegacySlide[];
};

export function LegacyCarousel({ slides }: LegacyCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 8500);

    return () => window.clearInterval(timer);
  }, [isPlaying, slides.length]);

  return (
    <div className="rounded-[1.9rem] border border-line bg-white shadow-card">
      <div className="relative overflow-hidden rounded-t-[1.9rem] bg-stone-100">
        <div className="relative min-h-[420px] sm:min-h-[500px]">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div className={`relative h-full w-full ${slide.frameClassName ?? ""}`}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className={slide.imageClassName}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <div className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white backdrop-blur-sm">
            Family Archive
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((current) => !current)}
              className="rounded-full border border-white/25 bg-white/15 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white/25"
              aria-label={isPlaying ? "Pause legacy slideshow" : "Play legacy slideshow"}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((activeIndex - 1 + slides.length) % slides.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-lg leading-none text-white backdrop-blur-sm transition hover:bg-white/25"
              aria-label="Show previous legacy photo"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((activeIndex + 1) % slides.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-lg leading-none text-white backdrop-blur-sm transition hover:bg-white/25"
              aria-label="Show next legacy photo"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-line px-5 py-4">
        <p className="text-sm leading-6 text-muted">{slides[activeIndex]?.caption}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition ${
                index === activeIndex ? "w-8 bg-navy" : "w-2.5 bg-line hover:bg-muted/50"
              }`}
              aria-label={`Show legacy photo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
