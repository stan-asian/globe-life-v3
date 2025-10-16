export default function FirstSlide() {
  return (
    <div className="relative max-w-7xl text-white p-10">
      {/* Big background "A" */}
      <h1 className="absolute -right-40 -top-30 text-yellow-300/20 font-extrabold text-[700px] leading-none z-0 select-none">
        A
      </h1>

      {/* Foreground content */}
      <div className="relative z-10">
        <h1 className="text-2xl lg:text-5xl md:text-3xl font-bold text-yellow-300 mb-3">
          A Company You Can Trust
        </h1>
        <p className="text-xs md:text-lg lg:text-lg">
          No matter what tomorrow brings, our customers have protection when
          they need it most. Globe Life has helped protect this promise since
          our roots began in 1900.
        </p>
        <div className="py-5">
          <ul className="list-disc pl-5 space-y-3">
            <li className="text-gray-200 text-xs md:text-lg lg:text-lg">
              Globe Life has earned the{" "}
              <span className="text-yellow-300">A (Excellent)</span> Financial
              Strength Rating from A.M Best Company (as of 10/24). Globe Life
              has maintained a rating of A rating or higher for over 50 years.
              For the latest Best's Credit Rating, access{" "}
              <a href="https://www.ambest.com" className="underline">
                AMBest.com
              </a>
              .
            </li>
            <li className="text-gray-200 text-xs md:text-lg lg:text-lg">
              <span className="text-yellow-300">AA- or "Very Strong"</span>
              Financial Strength Rating From Standard & Poor's (as of 3/24).
            </li>
            <li className="text-gray-200 text-xs md:text-lg lg:text-lg">
              <span className="text-yellow-300">A+ or "Strong"</span> for
              Insurer Financial Strength by Fitch (as of 9/24).
            </li>
            <li className="text-gray-200 text-xs md:text-lg lg:text-lg">
              <span className="text-yellow-300">A+ Rating</span> from the Better
              Business Bureau.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
