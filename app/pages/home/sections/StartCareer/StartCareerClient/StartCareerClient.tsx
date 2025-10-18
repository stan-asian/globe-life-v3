"use client";

import { useState } from "react";

import ModalPortal from "@/app/components/ModalPortal";
import CareerModal from "@/app/shared/CareerModal/CareerModal";

export default function NewCareerSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full bg-gradient-to-r from-[#004D73] to-[#0076A3] text-white overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-18 gap-14">
        {/* Left side - Heading */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-xl lg:text-4xl md:text-3xl font-semibold mb-3 drop-shadow-md">
            Are you ready to start a
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-end justify-center items-center lg:justify-start flex-wrap leading-none">
            <h1 className="text-[3rem] md:text-[6rem] lg:text-[9rem] font-extrabold tracking-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] sm:mr-2 md:mr-3 italic">
              new
            </h1>
            <h1 className="text-[3rem] md:text-[6rem] lg:text-[9rem] font-extrabold tracking-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] flex items-end italic">
              career
              <span className="text-[3rem] md:text-[6rem] lg:text-[9rem] font-extrabold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] ml-4 sm:ml-3">
                ?
              </span>
            </h1>
          </div>
        </div>

        {/* Right side - Text + Button */}
        <div className="flex-1 max-w-lg text-center lg:text-left relative z-20">
          <p className="text-sm sm:text-lg md:text-xl leading-relaxed text-gray-50 drop-shadow-sm mb-10">
            We’re looking for a select group of leaders, entrepreneurs, and high
            achievers who see the value in our opportunity of a lifetime. Say
            yes to AIL and we’ll give you the ability to have an outstanding
            income and a whole new lifestyle. A career with Globe Life American
            Income Division gives you freedom. The choice is yours.
          </p>

          {/* Trigger button */}
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#00558C] text-white px-10 py-2 text-xs lg:text-sm rounded-lg hover:bg-[#00558C]/20 mt-2"
          >
            Get Started Now!
          </button>
          {/* Modal */}
          {isOpen && (
            <ModalPortal>
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                role="dialog"
                aria-modal="true"
              >
                <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl mx-3">
                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
                    aria-label="Close"
                  >
                    ✕
                  </button>

                  <CareerModal />
                </div>
              </div>
            </ModalPortal>
          )}

          <p className="mt-6 italic text-sm text-gray-200 drop-shadow-sm">
            Reihaneh Majidi,{" "}
            <span className="not-italic font-medium">Business Owner</span>
          </p>
        </div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#003B57]/70 to-transparent pointer-events-none" />
    </section>
  );
}
