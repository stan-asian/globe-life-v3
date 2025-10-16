"use client";

import { Star } from "lucide-react";

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
  return (
    <section className="w-full mx-auto px-4 sm:px-6 py-12 text-center relative overflow-hidden">
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
        What People Are Saying About Us
      </h2>

      <a
        className="flex justify-center items-center text-gray-700 mb-8 space-x-2"
        href="https://maps.app.goo.gl/CBED2qHmZACFkVgm9"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Star className="text-orange-500 fill-orange-500 w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-base sm:text-xl font-semibold">4.9</span>
        <span className="text-gray-600 text-xs sm:text-base">
          Google Rating
        </span>
      </a>

      {/* Continuous Scrolling Container */}
      <div className="relative w-full overflow-hidden bg-gray-100/50 py-10">
        <div className="scroll-wrapper flex w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 sm:gap-12 mr-8 sm:mr-12">
              {reviews.map((review) => (
                <div
                  key={`${review.id}-${i}`}
                  className="flex-shrink-0 w-[300px] sm:w-[400px] md:w-[500px] bg-white rounded-2xl shadow-md p-6 text-left"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm sm:text-lg font-semibold mr-3">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-lg md:text-xl text-gray-900">
                        {review.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-orange-500">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star
                            key={j}
                            className="w-3 h-3 sm:w-4 sm:h-4 fill-orange-500"
                          />
                        ))}
                        <span className="text-gray-600 ml-2 text-[11px] sm:text-sm">
                          {review.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">
                    {review.review}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes & Animation */}
      <style jsx>{`
        .scroll-wrapper {
          display: flex;
          animation: scroll-left 45s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .scroll-wrapper:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
