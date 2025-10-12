"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SliderClient() {
  const slides = [
    {
      id: 1,
      image: "/assets/image/background/Background.jpg",
      title:
        "Nearly 1,000 kids will be reported missing today in the U.S. and Canada.*",
      description:
        "The statistics can be alarming, but you can take an extra step right now to help you act quickly if the need arises.",
      button: "Get your no-cost Child Safe Kit today",
      footer:
        "Your Child Safe Kit® will help you record and save vital information about your child including: Height & Weight, Blood Type, Fingerprints, a DNA Sample, and more.",
    },
    {
      id: 2,
      image: "/assets/image/background/Background.jpg",
      title: "Be prepared, stay informed, and keep your family safe.",
      description:
        "Child safety starts with awareness. Learn how our Child Safe Kit can help you and your loved ones stay protected.",
      button: "Order your free kit now",
      footer:
        "Our safety program is trusted by thousands of families across the U.S. and Canada.",
    },
    {
      id: 3,
      image: "/assets/image/background/Background.jpg",
      title: "Every second counts when a child goes missing.",
      description:
        "With our Child Safe Kit, you’ll have critical details ready to share with authorities immediately.",
      button: "Get your free safety kit",
      footer:
        "Don’t wait until it’s too late—prepare today for peace of mind tomorrow.",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full max-w-7xl h-[420px] mx-auto rounded-lg overflow-hidden bg-gray-200 shadow-lg m-10">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-12 text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 max-w-3xl">
              {slide.title}
            </h2>
            <p className="max-w-2xl mb-5 text-sm sm:text-base">
              {slide.description}
            </p>
            <button className="bg-[#2EA24F] text-white font-semibold px-6 py-2.5 rounded-md hover:bg-[#004673] transition">
              {slide.button}
            </button>
            <p className="mt-5 bg-black/50 px-4 py-2 text-xs sm:text-sm max-w-3xl rounded-md">
              {slide.footer}
            </p>
          </div>
        </div>
      ))}

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
