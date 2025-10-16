export default function CustomerCareClient() {
  return (
    <section className="flex flex-col justify-center items-center lg:gap-10 w-full">
      <div className="flex flex-col lg:flex-row lg:max-w-[1380px] w-full h-full bg-white lg:border-l-10 border-t-10 lg:border-t-0 border-[#87d7d5]">
        <div className="flex items-center bg-gray-300 w-full py-5 lg:w-30">
          <div className="lg:rotate-270 text-center w-full lg:h-35 lg:w-40">
            <h1 className="lg:text-3xl text-3xl text-gray-700">Customer</h1>
            <span className="lg:text-6xl text-6xl text-gray-700 font-bold">
              CARE
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center lg:flex-row gap-10 z-10 p-10 bg-gray-200">
          {/* Customer Service */}
          <div className="lg:max-w-[500px] max-w-[700px]">
            <div className="mb-10">
              <h1 className="text-xl lg:text-2xl font-medium lg:mb-5">
                Customer Service
              </h1>
              <p className="text-sm lg:text-lg">
                Need to speak with customer service about your policy? Call us
                Monday through Friday from 8am - 4:30pm Central Standard time.
              </p>
            </div>
            <button className="text-[#00558C] font-bold] border-2 border-[#00558C] py-1 px-6 rounded-sm w-full">
              (800) 433-3405
            </button>
          </div>

          {/* Customer Login */}
          <div className="lg:max-w-[500px] max-w-[700px]">
            <div className="mb-10">
              <h1 className="text-xl lg:text-2xl font-medium lg:mb-5">
                Customer Login
              </h1>
              <p className="text-sm lg:text-lg">
                We&apos;ve made it easy to answer your policy questions 24-hours
                a day — online! To view and manage your policy information,
                click the button below.
              </p>
            </div>
            <button className="text-[#00558C] font-bold] border-2 border-[#00558C] py-1 px-6 rounded-sm w-full">
              Log In
            </button>
          </div>

          {/* File a Claim */}
          <div className="lg:max-w-[500px] max-w-[700px]">
            <div className="mb-10">
              <h1 className="text-xl lg:text-2xl font-medium lg:mb-5">
                File a Claim
              </h1>
              <p className="text-sm lg:text-lg">
                On our &lsquo;Claims&rsquo; page, you will find helpful
                information regarding the claims filing process for various
                types of benefits, filing instructions, printable forms, and
                more.
              </p>
            </div>
            <button className="text-[#00558C] font-bold] border-2 border-[#00558C] py-1 px-6 rounded-sm w-full">
              File a Claim
            </button>
          </div>
        </div>
      </div>

      {/* SECOND SECTION */}
      <div className="flex items-center justify-center bg-gray-100 p-10 w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:max-w-[1300px] max-w-[600px] lg:p-10">
          {/* One */}
          <div>
            <div className="mb-5">
              <h1 className="font-medium lg:text-2xl text-xl lg:mb-5">
                About AIL
              </h1>
              <p className="lg:text-lg text-sm">
                Globe Life American Income Division has served working class
                families since 1951 with life, supplemental health, and accident
                insurance products to help protect members of labor unions,
                credit unions, associations, and their families.
              </p>
            </div>
            <button className="lg:mt-5 border-1 w-full bg-[#2EA24F] lg:text-xl p-2 text-white rounded-md">
              Learn More
            </button>
          </div>
          {/* Two */}
          <div>
            <div className="mb-5">
              <h1 className="font-medium lg:text-2xl text-xl lg:mb-5">
                Insurance Products
              </h1>
              <p className="lg:text-lg text-sm">
                We help consumers determine what types of insurance coverage
                will best help meet their needs. With life insurance,
                supplemental health, and accident insurance available, let AIL
                help you be more prepared to face the future.
              </p>
            </div>
            <button className="lg:mt-5 border-1 w-full bg-[#2EA24F] lg:text-xl p-2 text-white rounded-md">
              Explore Coverage
            </button>
          </div>
          {/* Three */}
          <div>
            <div className="mb-5">
              <h1 className="font-medium lg:text-2xl text-xl lg:mb-5">
                No-Cost Products
              </h1>
              <p className="lg:text-lg text-sm">
                Globe Life American Income Division offers several no-cost
                products to help provide valuable protection for you and your
                family such as our no-cost <span>Child Safe Kit®</span> and our
                no-cost partners program.
              </p>
            </div>
            <button className="lg:mt-5 border-1 w-full bg-[#2EA24F] lg:text-xl p-2 text-white rounded-md">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
