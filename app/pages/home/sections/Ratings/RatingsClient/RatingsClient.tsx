"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Kevin Johnson",
    rating: 5,
    time: "a week ago",
    review:
      "Reihaneh Majidi was terrific to work with. She gave us a lot of great information and explained in words that even I could understand. We talked several times and she didn’t push for the close. She was a pleasure to work with.",
  },
  {
    id: 2,
    name: "Myla Blancaflor",
    rating: 5,
    time: "a week ago",
    review:
      "Reihaneh was so very helpful to us and helped us to apply for what we really needed for our future. Very kind and courteous.",
  },
  {
    id: 3,
    name: "Jeff Gulka",
    rating: 5,
    time: "2 months ago",
    review:
      "Reihaneh was very kind, patient and easy to work with. She explains the information for what I was looking for. I would definitely recommend her to speak with.",
  },
  {
    id: 4,
    name: "Jeremy Teague",
    rating: 5,
    time: "3 months ago",
    review:
      "Ms. Reihaneh is the most helpful person I ever met. It was an absolute pleasure meeting her and I fully appreciate her services.",
  },
  {
    id: 5,
    name: "Mike Taylor",
    rating: 5,
    time: "3 months ago",
    review:
      "Reihaneh Majidi was great and knowledgeable! Thank you! We enjoyed our meeting with you!",
  },
];

export default function GoogleReviews() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  const review = reviews[current];

  return (
    <section className="w-full mx-auto px-4 sm:px-6 py-12 text-center relative">
      {/* Header */}
      <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-4xl font-bold text-blue-900 mb-4 leading-snug">
        What People Are Saying About Us
      </h2>

      <a
        className="flex justify-center items-center text-gray-700 mb-8 space-x-2"
        href="https://maps.app.goo.gl/CBED2qHmZACFkVgm9"
        target="_"
      >
        <Star className="text-orange-500 fill-orange-500 w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-base sm:text-xl font-semibold">4.9</span>
        <span className="text-gray-600 text-xs sm:text-base">
          Google Rating
        </span>
      </a>
      {/* Slider */}
      <div className="relative flex items-center justify-center w-full bg-gray-100/50">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-gray-700 hover:text-blue-700 transition-colors duration-200"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Review Card */}
        <div className="transition-all duration-500 ease-in-out flex justify-center w-full px-10 sm:px-20 p-10">
          <div className="max-w-xs sm:max-w-md md:max-w-lg w-full min-h-[220px] sm:min-h-[260px] text-left bg-transparent">
            <div>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm sm:text-lg font-semibold mr-3 flex-shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-lg md:text-xl text-gray-900 truncate">
                    {review.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-orange-500 flex-wrap">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 fill-orange-500"
                      />
                    ))}
                    <span className="text-gray-600 ml-2 text-[11px] sm:text-sm">
                      {review.time}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed text-xs xs:text-sm sm:text-base md:text-lg break-words">
                {review.review}
              </p>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-gray-700 hover:text-blue-700 transition-colors duration-200"
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>
    </section>
  );
}
