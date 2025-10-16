export default function ThirdSlide() {
  return (
    <div className="absolute max-w-8xl text-white p-15">
      <div className="flex flex-col lg:flex-row md:flex-col pb-10 justify-evenly">
        <div className="p-2">
          <h1 className="text-[15px] lg:text-4xl md:text-3xl font-medium text-start tracking-wide">
            The Globe Life companies combined have more than 17 million policies
            in force{" "}
            <span className="text-yellow-300">
              {" "}
              more than any other life insurance company in the country.
            </span>
          </h1>
        </div>

        <span className="lg:w-2 md:w-full sm:w-full bg-amber-300 border-1 border-amber-300 lg:mr-5 hidden lg:block md:hidden  "></span>

        <div className="p-2">
          <h1 className="text-[15px] lg:text-4xl md:text-3xl font-medium text-start tracking-wide">
            The Globe Life companies issue{" "}
            <span className="text-yellow-300">
              more than life insurance policies each year than any other company
              in the country.
            </span>
          </h1>
        </div>
      </div>
      <h1 className="lg:text-lg md:text-sm text-xs">
        Source:*Excluding reinsurance companies | S&P Global Market Intelligence
      </h1>
    </div>
  );
}
