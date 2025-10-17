"use client";

import { useState } from "react";
import axios from "axios";

interface MessageState {
  text: string;
  isSuccess: boolean;
}

export default function ContactUsClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
    phoneNumber: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState | null>(null);

  // ✅ Handle input changes and clear message when user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Remove message when user starts typing
    setMessage(null);

    // Validate numeric fields
    if (name === "zipCode" || name === "phoneNumber") {
      // Only allow digits
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validate fields before submitting
  const validate = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.comments
    ) {
      setMessage({
        text: "Please fill in all required fields.",
        isSuccess: false,
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({
        text: "Please enter a valid email address.",
        isSuccess: false,
      });
      return false;
    }
    if (formData.zipCode && !/^\d+$/.test(formData.zipCode)) {
      setMessage({
        text: "ZIP Code must contain only numbers.",
        isSuccess: false,
      });
      return false;
    }
    if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
      setMessage({
        text: "Phone Number must contain only numbers.",
        isSuccess: false,
      });
      return false;
    }
    return true;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/contact", formData);
      if (response.status === 200) {
        setMessage({ text: "Message sent successfully!", isSuccess: true });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          zipCode: "",
          phoneNumber: "",
          comments: "",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        text: "Failed to send message. Please try again later.",
        isSuccess: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-6 md:px-16 bg-gray-200">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start p-4">
        {/* Left Section */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-3">
              Connect with me!
            </h1>
            <p className="text-gray-700 text-base leading-relaxed">
              Have any questions? Please contact me to discuss your needs and
              the solutions we offer. I would love to hear from you.
            </p>
          </div>

          <p className="text-gray-700 text-base">
            Questions about an existing policy? Contact customer service{" "}
            <a href="#" className="text-green-600 font-medium hover:underline">
              here
            </a>
            .
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Office Info
            </h2>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Phone:</span> (513) 671-7220
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Office Hours:</span> Monday -
              Friday, 9:00 am - 5:00 pm
            </p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div>
          {message && (
            <div
              className={`flex justify-center gap-1 rounded-lg items-center text-center border-2 text-sm w-full h-10 ${
                message.isSuccess
                  ? "border-green-400 text-green-400"
                  : "border-red-400 text-red-400"
              } mb-4`}
            >
              <i
                className={`fa-solid ${
                  message.isSuccess ? "fa-paper-plane" : "fa-circle-exclamation"
                }`}
              ></i>
              <p className="font-bold italic">{message.text}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-black bg-white p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-black bg-white p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                className="border border-black bg-white p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code*"
                value={formData.zipCode}
                onChange={handleChange}
                className="border border-black bg-white p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number*"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="border border-black bg-white p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <textarea
              name="comments"
              placeholder="Comments*"
              rows={4}
              value={formData.comments}
              onChange={handleChange}
              className="border border-black bg-white p-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-semibold py-3 hover:bg-green-700 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
