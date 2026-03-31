import type { CSSProperties } from "react";
import type { ImageAsset } from "@/lib/site-content";

type ImagePanelProps = {
  image: ImageAsset;
  heightClassName?: string;
};

export function ImagePanel({ image, heightClassName = "min-h-[420px]" }: ImagePanelProps) {
  const encodedImageSrc = encodeURI(image.src);

  const style = {
    backgroundImage: `linear-gradient(rgba(25, 42, 71, 0.2), rgba(25, 42, 71, 0.2)), url("${encodedImageSrc}")`,
    backgroundPosition: image.position ?? "center",
    backgroundSize: "cover",
  } satisfies CSSProperties;

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-line bg-stone-100 shadow-panel ${heightClassName}`}
      style={style}
      aria-label={image.alt}
      role="img"
    >
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-sm">
          {image.label}
        </div>
      </div>
    </div>
  );
}
