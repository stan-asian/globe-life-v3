"use client";

import { useState, useEffect } from "react";

type Tab = "about" | "locations" | null;

interface AgentProfileProps {
  data: {
    about: {
      intro: string;
      achievements: string;
      details: string[];
      closing: string;
    };
    location: {
      type: string;
      city: string;
      phone: string;
      fax: string;
      website: string;
    };
  };
}

export default function AgentProfile({ data }: AgentProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Detect screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTab = (tab: Tab) => {
    if (isMobile) setActiveTab((prev) => (prev === tab ? null : tab));
    else setActiveTab(tab);
    setIsExpanded(false);
  };

  if (!data) return <p>No agent data found.</p>;

  // ─── Contents ─────────────────────────────
  const aboutContent = (
    <div className="text-gray-700 leading-relaxed text-justify">
      <p>{data.about.intro}</p>

      <p className="mt-4">{data.about.achievements}</p>

      {isExpanded && (
        <>
          {data.about.details.map((detail, index) => (
            <p key={index} className="mt-4">
              {detail}
            </p>
          ))}
          <p className="mt-4">{data.about.closing}</p>
        </>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 text-sm font-medium rounded-md transition-colors duration-300"
      >
        {isExpanded ? "read less" : "read more"}
      </button>
    </div>
  );

  const locationContent = (
    <div className="p-4 bg-gray-50 border-l-4 border-cyan-400 rounded-md text-gray-800">
      <h4 className="font-semibold mb-1">{data.location.type}</h4>
      <p>{data.location.city}</p>
      <p>p: {data.location.phone}</p>
      <p>f: {data.location.fax}</p>
      <a
        href={data.location.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-700 font-medium mt-2 inline-block hover:underline"
      >
        visit site
      </a>
    </div>
  );

  // ─── UI ─────────────────────────────
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* ───── Desktop Tabs ───── */}
      {!isMobile && (
        <>
          <div className="flex gap-3 border-b-4 border-[#00558C] mb-6">
            {["about", "locations"].map((tab) => (
              <button
                key={tab}
                onClick={() => toggleTab(tab as Tab)}
                className={`px-6 py-2 text-white font-semibold rounded-t-md transition-all duration-300
                  ${
                    activeTab === tab
                      ? "bg-[#00558C] scale-105"
                      : "bg-[#00558C]/50 hover:bg-[#00558C]"
                  }`}
              >
                {tab === "about" ? "About" : "Locations"}
              </button>
            ))}
          </div>

          <div className="transition-opacity duration-500 ease-in-out opacity-100">
            {activeTab === "about" ? aboutContent : locationContent}
          </div>
        </>
      )}

      {/* ───── Mobile Accordion ───── */}
      {isMobile && (
        <div className="space-y-2">
          {[
            { key: "about", label: "About", content: aboutContent },
            { key: "locations", label: "Locations", content: locationContent },
          ].map(({ key, label, content }) => (
            <div key={key}>
              <button
                onClick={() => toggleTab(key as Tab)}
                className="w-full flex justify-between items-center bg-green-600 text-white font-semibold px-4 py-1 rounded-md transition-all duration-300"
              >
                {label}
                <span className="text-xl">{activeTab === key ? "×" : "+"}</span>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  activeTab === key
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 bg-gray-50 rounded-md">{content}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
