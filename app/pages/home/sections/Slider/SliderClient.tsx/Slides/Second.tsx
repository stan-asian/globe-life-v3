export default function FirstSlide() {
  return (
    <div className="absolute max-w-7xl text-white p-15">
      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 md:mb-10 text-yellow-300">
        Promises Made. Promises Kept.
      </h1>

      {/* Subheading */}
      <p className="mb-6 text-xs md:text-lg hidden md:block">
        We promise to protect our customers and we deliver. Globe Life is
        committed to providing secure life and supplemental health insurance
        protection to our policyholders helping them to thrive and grow.
      </p>

      <div className="lg:flex lg:gap-10 md:flex md:gap-5">
        <div className="py-2">
          <p className="text-[14px]">Total Life Claims Paid:</p>
          <h1 className="text-yellow-300 text-2xl md:text-3xl">$1.1 Billion</h1>
        </div>
        <div className="py-2">
          <p className="text-[14px]">Total Health Claims Paid:</p>
          <h1 className="text-yellow-300 text-2xl md:text-3xl">$676 Million</h1>
        </div>
        <div className="py-2">
          <p className="text-[14px]">Total Claims Paid Overall:</p>
          <h1 className="text-yellow-300 text-2xl md:text-3xl">$1.7 Billion</h1>
        </div>
        <div className="py-2">
          <p className="text-[14px]">Insurance In Force:</p>
          <h1 className="text-yellow-300 text-2xl md:text-3xl">$227 Billion</h1>
        </div>
      </div>
    </div>
  );
}
