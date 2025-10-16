"use client";
import Image from "next/image";
import { useState } from "react";

export default function CareerClient() {
  const [activeIndex, setActiveIndex] = useState(0);

  const videos = [
    {
      id: 1,
      title: "Achievement Awards",
      src: "/assets/video/placeholder.mp4",
    },
    {
      id: 2,
      title: "Globe Life University",
      src: "/assets/video/placeholder.mp4",
    },
    {
      id: 3,
      title: "12 Million Lives Protected",
      src: "/assets/video/placeholder.mp4",
    },
    { id: 4, title: "Future Vision", src: "/assets/video/placeholder.mp4" },
  ];

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-[#81d5d3] overflow-hidden py-20 max-[1280px]:rounded-none rounded-bl-[15rem]">
      <div className="max-w-6xl mx-auto flex flex-col max-[1280px]:flex-col xl:flex-row justify-between px-10 max-[1280px]:px-6 z-10 xl:mr-20">
        {/* LEFT SIDE */}
        <div className="xl:w-1/2 flex justify-center max-[1280px]:justify-center">
          {/* Large globe behind text */}
          <div className="hidden xl:absolute xl:left-20 xl:-bottom-60 xl:inset-0 xl:flex xl:justify-start scale-125">
            <Image
              src="/assets/image/logo/Logo Icon.png"
              alt="Globe Life Background"
              width={350}
              height={500}
              className="object-contain opacity-90 w-[20vw] hover:w-[21vw] transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Foreground Text */}
          <div className="relative z-10 text-center max-[1280px]:text-center xl:text-right max-w-md mt-0 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl max-[1280px]:text-4xl xl:text-6xl font-bold text-[#00558c] leading-tight sm:leading-snug md:leading-none">
              Make <br className="max-[1280px]:hidden xl:block" /> Tomorrow{" "}
              <br className="max-[1280px]:hidden xl:block" /> Better
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-[1280px]:text-lg xl:text-2xl text-white mt-4 md:mt-6 leading-relaxed md:leading-snug">
              It’s your life. Live it how you want. We can help you make it
              happen with a career at{" "}
              <strong>Globe Life American Income Division.</strong>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="xl:w-1/2 w-full flex flex-col items-center justify-center max-[1280px]:mt-5">
          {/* Main Video */}
          <div className="lg:w-full aspect-video overflow-hidden shadow-2xl z-1">
            <video
              key={videos[activeIndex].id}
              src={videos[activeIndex].src}
              controls
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails carousel */}
          <div className="relative flex items-center justify-center gap-2 mt-2 w-full max-w-xl">
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="z-20 text-[#00558C] text-6xl font-bold hover:scale-110 transition flex-shrink-0"
              aria-label="Previous video"
            >
              ‹
            </button>

            {/* Thumbnails container */}
            <div className="flex overflow-hidden flex-1 mx-1">
              <div
                className="flex gap-1 transition-transform duration-300"
                style={{
                  transform: `translateX(-${activeIndex * (32 + 8)}px)`,
                }}
              >
                {videos.map((vid, idx) => (
                  <button
                    key={vid.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative flex-shrink-0 
          w-35 h-20 
          max-[640px]:w-28 max-[640px]:h-16
          max-[540px]:w-24 max-[540px]:h-14
          max-[430px]:w-20 max-[430px]:h-12
          max-[360px]:w-16 max-[360px]:h-10
          border-3 transition p-1
          ${
            idx === activeIndex
              ? "border-[#00558C] shadow-lg"
              : "border-transparent hover:border-[#00558C]"
          }`}
                  >
                    <video
                      src={vid.src}
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition" />
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="z-20 text-[#00558C] text-6xl font-bold hover:scale-110 transition flex-shrink-0"
              aria-label="Next video"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Mobile decorative globe */}
      <div className="absolute inset-0 flex justify-center items-center xl:hidden opacity-10">
        <Image
          src="/assets/image/logo/Logo Icon.svg"
          alt="Globe Life Background"
          width={400}
          height={400}
          className="object-contain w-full"
        />
      </div>
    </section>
  );
}
