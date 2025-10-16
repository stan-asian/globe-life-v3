export default function FirstSlide() {
  return (
    <div className="absolute max-w-7xl text-white p-10">
      {/* Main Heading */}
      <h1 className="text-2xl md:text-5xl font-bold mb-4">
        Nearly 1,000 kids will be reported missing today in the U.S. and
        Canada.*
      </h1>

      {/* Subheading */}
      <p className="mb-6 text-xs md:text-sm">
        The statistics can be alarming, but you can take an extra step right now
        to help you act quickly if the need arises.
      </p>

      {/* Button */}
      <button className="bg-green-600 hover:bg-green-700 text-[10px] md:text-sm text-white font-semibold px-3 py-2 rounded mb-4">
        Get your no-cost Child Safe Kit today
      </button>

      {/* Additional Info */}
      <p className="text-xs md:text-sm bg-black/50 p-2 rounded">
        Your Child Safe Kit® will help you record and save vital information
        about your child including: Height & Weight, Blood Type, Fingerprints, a
        DNA Sample, and more.
      </p>

      {/* Disclaimer */}
      <p className="text-[10px] md:text-[12px] mt-2">
        *U.S. Department of Justice's Federal Bureau of Investigation,{" "}
        <a
          className="underline"
          href="https://www.fbi.gov/file-repository/cjis/2022-ncic-missing-person-and-unidentified-person-statistics.pdf/view"
        >
          2022 NCIC Missing Person and Unidentified Person Statistics
        </a>
        , and Government of Canada,{" "}
        <a
          className="underline"
          href="https://canadasmissing.ca/pubs/2022/index-eng.htm"
        >
          Canada's Missing – 2022 Fast Fact Sheet
        </a>
      </p>
    </div>
  );
}
