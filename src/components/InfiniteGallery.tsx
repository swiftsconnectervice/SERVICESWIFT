"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface InfiniteGalleryProps {
  images: { src: string; alt?: string }[];
  className?: string;
}

export default function InfiniteGallery({
  images,
  className = "h-[600px] w-full",
}: InfiniteGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const DEPTH = 1200;
  const COUNT = 12;

  const generatePositions = useCallback(() => {
    const positions = [];
    for (let i = 0; i < COUNT; i++) {
      const imgData = images[i % images.length];
      const angle = (i * 2.618) % (Math.PI * 2);
      const radius = 80 + (i % 3) * 120;
      positions.push({
        src: imgData.src,
        alt: imgData.alt || "",
        x: Math.sin(angle) * radius,
        y: Math.cos(angle * 0.7) * 60 + (i % 2 === 0 ? -30 : 30),
        z: (DEPTH / COUNT) * i,
        opacity: 1,
        blur: 0,
        scale: 1,
      });
    }
    return positions;
  }, [images]);

  const [items, setItems] = useState(() => generatePositions());

  useEffect(() => {
    setItems(generatePositions());
  }, [generatePositions]);

  useEffect(() => {
    const speed = 0.5;

    const animate = () => {
      setItems((prev) =>
        prev.map((item) => {
          let z = item.z - speed * 2;
          if (z < -200) z += DEPTH + 200;
          if (z > DEPTH) z -= DEPTH + 200;

          const nz = (z + 200) / (DEPTH + 200);
          const opacity =
            nz < 0.15 ? nz / 0.15 : nz > 0.85 ? (1 - nz) / 0.15 : 1;
          const blur =
            nz < 0.1
              ? (1 - nz / 0.1) * 6
              : nz > 0.9
              ? ((nz - 0.9) / 0.1) * 6
              : 0;
          const scale = 0.4 + nz * 0.8;

          return {
            ...item,
            z,
            opacity: Math.max(0, Math.min(1, opacity)),
            blur,
            scale,
          };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${className} relative overflow-hidden`}
      style={{ perspective: "800px" }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 pointer-events-none"
          style={{
            transform: `translate3d(${item.x - 160}px, ${item.y - 100}px, ${
              item.z - DEPTH / 2
            }px) scale(${item.scale})`,
            opacity: item.opacity,
            filter: item.blur > 0.1 ? `blur(${item.blur}px)` : "none",
            willChange: "transform, opacity, filter",
          }}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="max-w-[320px] h-auto object-contain rounded-lg shadow-2xl shadow-black/50 border border-white/10"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
