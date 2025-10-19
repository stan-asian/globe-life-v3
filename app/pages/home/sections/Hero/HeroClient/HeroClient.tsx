"use client";

import Image from "next/image";
import { useState } from "react";

import ModalPortal from "@/app/components/ModalPortal";
import CareerModal from "@/app/shared/CareerModal/CareerModal";

interface Specialization {
  title: string;
  icon: string;
}

interface OfficeInfo {
  phone: string[];
  address: string;
  languages: string[];
  hours: string;
  mapEmbedUrl: string;
}

interface Description {
  headline: string;
  body: string;
}

interface Agent {
  name: string;
  title: string;
  organization: string;
  profileImage: string;
  backgroundImage: string;
  description: Description;
  officeInfo: OfficeInfo;
  specialization: Specialization[];
  quote: string;
}

export interface HeroData {
  agent: Agent;
}

export default function HeroClient({ data }: { data: HeroData }) {
  const { agent } = data;
  const { officeInfo, specialization } = agent;

  const [isOpen, setIsOpen] = useState(false);

  if (!agent) return <p>No agent data found.</p>;

  return (
    <section className="relative w-full bg-gray-100 pb-10">
      {/* Hero Background */}
      <div className="relative h-[250px] sm:h-[290px] md:h-[300px] overflow-hidden">
        <Image
          src={agent.backgroundImage}
          alt={`${agent.name} background`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Agent Section */}
      <div className="max-w-7xl mx-auto relative -mt-20 sm:-mt-28 md:-mt-32 lg:px-8 z-10">
        <div className="overflow-hidden flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10 lg:pl-0">
            {/* Agent Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">
              <Image
                src={agent.profileImage}
                alt={`Agent ${agent.name}`}
                width={200}
                height={200}
                className="rounded-full border-1 border-[#00558C] shadow-lg object-cover -mt-5"
              />

              <div className="text-center sm:text-left lg:-ml-5">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug tracking-tight sm:mt-28">
                  {agent.name}
                </h1>
                <p className="italic text-gray-500 text-sm lg:text-lg">
                  {agent.title}
                </p>
                <p className="text-gray-500 text-sm sm:text-base font-medium">
                  {agent.organization}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="lg:mt-5 pt-5 text-center sm:text-left lg:border-t-4 lg:border-[#00558C]/40 border-dashed">
              {" "}
              <h2 className="text-lg sm:text-xl font-semibold text-gray-600">
                {" "}
                {agent.description.headline}{" "}
              </h2>{" "}
              <p className="text-gray-700 leading-relaxed text-sm sm:text-lg max-w-1xl mx-auto sm:mx-0 sm:text-justify lg:mt-3 sm: mt-3">
                {" "}
                {agent.description.body}{" "}
              </p>{" "}
              {/* Trigger button */}
              <button
                onClick={() => setIsOpen(true)}
                className="bg-green-600 text-white px-4 py-2 text-xs lg:text-sm rounded-lg hover:bg-green-700 mt-5"
              >
                Learn more about this Opportunity!
              </button>
              {/* Modal */}
              {isOpen && (
                <ModalPortal>
                  <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="relative bg-white shadow-xl w-full max-w-2xl mx-3">
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
            </div>

            {/* Specialization Section (moved here) */}
            <div className="bg-gray-100 w-full flex flex-col sm:items-start items-center gap-5 mt-10">
              <span className="font-semibold italic text-gray-800 text-sm sm:text-lg text-center sm:text-left block">
                Specializing In:
              </span>

              <div className="flex flex-col lg:flex-row items-center w-full gap-2">
                {specialization.map((item, i) => (
                  <div
                    key={i}
                    className="border-3 border-[#00558C] rounded-lg px-10 py-6 sm:h-[100px] w-full flex flex-col items-center justify-center hover:shadow transition bg-white"
                  >
                    <i
                      className={`fa-solid ${item.icon} text-[#00558C] text-sm lg:text-3xl sm:text-base mb-1`}
                    ></i>
                    <p className="text-xs sm:text-sm font-medium text-[#00558C] text-center leading-tight">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Section */}
            <div className="w-full flex justify-center sm:justify-start mt-3">
              <div className="relative bg-gradient-to-r from-gray-200 to-gray-100 border-l-4 border-[#00558C] rounded-lg shadow p-5 sm:p-6 max-w-5xl">
                <div className="flex items-start justify-center sm:justify-start gap-3">
                  <i className="fa-solid fa-quote-left text-[#00558C] text-lg sm:text-2xl mt-1 opacity-70"></i>
                  <p className="text-sm sm:text-lg text-gray-700 italic font-serif leading-relaxed text-center sm:text-left">
                    {agent.quote}
                  </p>
                  <i className="fa-solid fa-quote-right text-[#00558C] text-lg sm:text-2xl mt-1 opacity-70"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section (Office Info + Specialization) */}
          <aside className="w-full lg:w-[360px] bg-gray-100 lg:border-1 lg:border-[#00558C] p-6 lg:mt-5 flex flex-col gap-8">
            {/* Office Info */}
            <div>
              <h3 className="font-semibold text-gray-700 border-b-3 border-[#00558C] mb-3 text-xl sm:text-2xl text-center lg:text-left">
                Office Info
              </h3>

              {/* Google Rating */}
              <div className="flex items-center lg:justify-start mb-8">
                <i className="fa-solid fa-star text-orange-400 text-3xl mr-1"></i>
                <span className="text-gray-800 font-medium text-base">4.9</span>
                <span className="text-gray-500 text-sm ml-1">
                  Google Rating
                </span>
              </div>

              <div className="space-y-6 text-sm text-gray-600">
                {/* Phone */}
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-phone text-[#00558C] text-3xl mt-0.5 shrink-0"></i>
                  <span>
                    {officeInfo.phone.map((p, i) => (
                      <span key={i} className="text-xs sm:text-sm">
                        {p}
                        <br />
                      </span>
                    ))}
                  </span>
                </div>

                {/* Address */}
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-[#00558C] text-3xl mt-0.5 shrink-0"></i>
                  <address className="not-italic whitespace-pre-line text-xs sm:text-sm">
                    {officeInfo.address}
                  </address>
                </div>

                {/* Languages */}
                <div className="flex gap-2 items-center">
                  <i className="fa-solid fa-comment-dots text-[#00558C] text-3xl mt-0.5 shrink-0"></i>
                  <span className="text-xs sm:text-sm">
                    Languages: {officeInfo.languages.join(", ")}
                  </span>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-clock text-[#00558C] text-3xl mt-0.5 shrink-0"></i>
                  <span className="text-xs sm:text-sm">{officeInfo.hours}</span>
                </div>
              </div>
              {/* Map */}
              <div className="flex items-center mt-5 overflow-hidden border border-gray-200 aspect-video lg:w-[310px] lg:h-[60vh] lg:max-h-[400px]">
                <iframe
                  title="Office location on Google Maps"
                  src={officeInfo.mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
