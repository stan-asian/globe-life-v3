"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { First, Second, Third, Fourth } from "./Slides/export";

interface Slide {
  id: number;
  URL: string;
  alt?: string;
  content: React.ReactNode; // ✅ FIXED: Replaces 'any'
}

const slides: Slide[] = [
  {
    id: 1,
    URL: "/assets/video/Slider-Video.mp4",
    alt: "Slide 1",
    content: <First />,
  },
  {
    id: 2,
    URL: "/assets/image/background/Family.jpg",
    alt: "Slide 2",
    content: <Second />,
  },
  {
    id: 3,
    URL: "/assets/image/background/Building.jpg",
    alt: "Slide 3",
    content: <Third />,
  },
  {
    id: 4,
    URL: "/assets/image/background/Blue.jpg",
    alt: "Slide 4",
    content: <Fourth />,
  },
];

const isVideoUrl = (url: string) => /\.mp4($|\?)/i.test(url);

export default function SliderClient() {
  // start at first *real* slide (index 1)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const delay = 8000; // 8 seconds per slide

  // Create extended array with clones at both ends
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  // ---- Auto Slide Logic ----
  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      goToNext();
    }, delay);

    return () => resetTimeout();
  }, [currentIndex]);

  // ---- Infinite Loop Reset Logic ----
  useEffect(() => {
    if (currentIndex === extendedSlides.length - 1) {
      // After last clone, snap back to first real slide
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 700); // matches transition duration
      setTimeout(() => setIsTransitioning(true), 750);
    }

    if (currentIndex === 0) {
      // Before first clone, snap to last real slide
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(slides.length);
      }, 700);
      setTimeout(() => setIsTransitioning(true), 750);
    }
  }, [currentIndex]);

  // ---- Navigation Handlers ----
  const goToNext = () => setCurrentIndex((prev) => prev + 1);
  // const goToPrev = () => setCurrentIndex((prev) => prev - 1);

  // ---- Render ----
  return (
    <div className="relative w-full mx-auto overflow-hidden lg:rounded-lg">
      {/* Slides container */}
      <div
        className={`flex ${
          isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {extendedSlides.map((slide, index) => {
          const isVideo = isVideoUrl(slide.URL);
          const isActive = index === currentIndex;

          return (
            <div
              key={`${slide.id}-${index}`}
              className="w-full flex-shrink-0 relative"
            >
              {isVideo ? (
                <video
                  src={slide.URL}
                  className="w-full h-[600px] md:h-[500px] object-cover"
                  autoPlay={isActive}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <Image
                  src={slide.URL}
                  alt={slide.alt || `Slide ${index + 1}`}
                  width={1000}
                  height={1000}
                  className="w-full h-[600px] md:h-[500px] object-cover"
                  priority={index === currentIndex}
                />
              )}

              <div
                className={`absolute top-0 left-0 w-full h-full ${
                  slide.id === 1
                    ? "bg-black/40"
                    : "bg-gradient-to-r from-[#005478]/30 to-[#005478]/90"
                }`}
              />

              <div className="absolute top-0 flex justify-center items-center w-full h-full">
                {slide.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => {
          // Adjust index to match real slides (1..slides.length)
          const realIndex = index + 1;
          const isActive = currentIndex === realIndex;

          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(realIndex)}
              className={`w-7 h-1 md:w-20 md:h-2 transition-all ${
                isActive ? "bg-white" : "bg-white/50"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
