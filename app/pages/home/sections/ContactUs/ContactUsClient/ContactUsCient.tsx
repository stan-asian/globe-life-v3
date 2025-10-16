"use client";
import React from "react";

export default function ContactUsClient() {
  return (
    <div className="py-12 px-6 md:px-16 bg-gray-200">
      <div className="max-w-[800px] lg:max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start p-4">
        {/* Left Section */}
        <div className="space-y-8 w-full">
          <div>
            <h1 className="lg:text-3xl text-xl font-medium text-gray-800 mb-3">
              Connect with me!
            </h1>
            <p className="text-gray-700 lg:text-xl text-sm leading-relaxed">
              Have any questions? Please contact me to discuss your needs and
              the solutions we offer. I would love to hear from you.
            </p>
          </div>

          <p className="text-gray-700 lg:text-xl text-sm">
            Questions about an existing policy? Contact customer service{" "}
            <a href="#" className="text-green-600 font-medium hover:underline">
              here
            </a>
            .
          </p>

          <div>
            <h2 className="lg:text-3xl text-xl font-medium text-gray-800 mb-2">
              Office Info
            </h2>
            <p className="text-gray-700 lg:text-xl text-sm">
              <span className="font-semibold">Phone:</span> (513) 671-7220
            </p>
            <p className="text-gray-700 lg:text-xl text-sm">
              <span className="font-semibold">Office Hours:</span> Monday -
              Friday, 9:00 am - 5:00 pm
            </p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="p-2">
          <form className="space-y-7">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
              <input
                type="text"
                placeholder="First Name*"
                className="border border-gray-400 bg-white p-2 w-full focus:ring-2 placeholder:text-sm focus:ring-green-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name*"
                className="border border-gray-400 bg-white p-2 w-full focus:ring-2 placeholder:text-sm focus:ring-green-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email*"
                className="border border-gray-400 bg-white p-2 w-full focus:ring-2 placeholder:text-sm focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="ZIP Code*"
                className="border border-gray-400 bg-white p-2 w-full placeholder:text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number*"
                className="border border-gray-400 bg-white p-2 w-full placeholder:text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Comments */}
            <textarea
              placeholder="Comments*"
              rows={4}
              className="border border-gray-400 bg-white p-2 w-full placeholder:text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            ></textarea>

            {/* Privacy Notice */}
            <p className="text-sm text-gray-600 italic">
              In order to further protect your privacy, please do not add
              sensitive information, such as your policy number or health
              information, to this message.
            </p>

            {/* reCAPTCHA Placeholder */}
            <div className="border border-gray-400 bg-white p-4 flex items-center justify-center text-gray-500">
              [reCAPTCHA Placeholder]
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
