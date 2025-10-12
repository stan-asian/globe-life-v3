import Image from "next/image";

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

interface HeroData {
  agent: Agent;
}

export default function HeroClient({ data }: { data: HeroData }) {
  const { agent } = data;
  const { officeInfo, specialization } = agent;

  if (!agent) return <p>No agent data found.</p>;

  return (
    <section className="relative w-full bg-white">
      {/* Hero Background */}
      <div className="relative h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden">
        <Image
          src={agent.backgroundImage}
          alt={`${agent.name} background`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Agent Section */}
      <div className="max-w-7xl mx-auto relative -mt-20 sm:-mt-28 md:-mt-32 px-4 sm:px-6 lg:px-8 z-10">
        <div className="shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10">
            {/* Agent Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">
              <Image
                src={agent.profileImage}
                alt={`Agent ${agent.name}`}
                width={180}
                height={180}
                className="rounded-full border-4 border-white shadow-lg object-cover sm:mt-1"
              />

              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug tracking-tight sm:mt-25">
                  {agent.name}
                </h1>
                <p className="italic text-gray-600 text-sm sm:text-base mt-1">
                  {agent.title}
                </p>
                <p className="text-gray-500 text-sm sm:text-base font-medium mt-0.5">
                  {agent.organization}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10 text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                {agent.description.headline}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base max-w-1xl mx-auto sm:mx-0 sm:text-justify">
                {agent.description.body}
              </p>

              <button className="mt-6 bg-[#00558C] text-white px-6 py-2.5 rounded-md hover:bg-[#004673] transition font-medium text-sm tracking-wide shadow-sm hover:shadow-md">
                Learn more about this opportunity
              </button>
            </div>

            {/* Quote Section */}
            <div className="w-full flex justify-center sm:justify-start mt-10">
              <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-[#00558C] rounded-lg shadow p-5 sm:p-6 max-w-2xl">
                <div className="flex items-start justify-center sm:justify-start gap-3">
                  <i className="fa-solid fa-quote-left text-[#00558C] text-lg sm:text-2xl mt-1 opacity-70"></i>
                  <p className="text-sm sm:text-lg text-gray-700 italic font-serif leading-relaxed text-center sm:text-left">
                    “{agent.quote}”
                  </p>
                  <i className="fa-solid fa-quote-right text-[#00558C] text-lg sm:text-2xl mt-1 opacity-70"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section (Office Info + Specialization) */}
          <aside className="w-full lg:w-[370px] bg-gray-100 border-t lg:border-t-0 lg:border-l border-gray-200 p-6 flex flex-col gap-8">
            {/* Office Info */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 text-xl sm:text-2xl text-center lg:text-left">
                Office Info
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                {/* Phone */}
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-phone text-[#00558C] text-sm mt-0.5 shrink-0"></i>
                  <span>
                    {officeInfo.phone.map((p, i) => (
                      <span key={i}>
                        {p}
                        <br />
                      </span>
                    ))}
                  </span>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-location-dot text-[#00558C] text-sm mt-0.5 shrink-0"></i>
                  <address className="not-italic whitespace-pre-line">
                    {officeInfo.address}
                  </address>
                </div>

                {/* Languages */}
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-comment-dots text-[#00558C] text-sm mt-0.5 shrink-0"></i>
                  <span>Languages: {officeInfo.languages.join(", ")}</span>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-clock text-[#00558C] text-sm mt-0.5 shrink-0"></i>
                  <span>{officeInfo.hours}</span>
                </div>

                {/* Map */}
                <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 aspect-video">
                  <iframe
                    title="Office location on Google Maps"
                    src={officeInfo.mapEmbedUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Specialization Section (moved here) */}
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200 w-full">
              <span className="font-semibold italic text-gray-800 text-xs sm:text-sm text-center block mb-3">
                Specializing In:
              </span>

              <div className="flex flex-col items-center w-full gap-2">
                {specialization.map((item, i) => (
                  <div
                    key={i}
                    className="
          border-3 border-[#00558C] rounded-lg
          px-3 py-2 sm:px-4 sm:py-2
          w-full max-w-[250px]
          flex flex-col items-center justify-center
          hover:shadow transition bg-white
        "
                  >
                    <i
                      className={`fa-solid ${item.icon} text-[#00558C] text-sm sm:text-base mb-1`}
                    ></i>
                    <p className="text-[12px] sm:text-[13px] font-medium text-[#00558C] text-center leading-tight">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
