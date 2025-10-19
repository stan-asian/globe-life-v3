"use client";

import { useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

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
    captchaToken: "",
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // ✅ Handle input changes and clear message when user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setMessage(null); // clear message on input

    // Only allow digits for numeric fields
    if (name === "zipCode" || name === "phoneNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validate before submitting
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
    if (!captchaToken) {
      setMessage({
        text: "Please verify that you're not a robot.",
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
      const response = await axios.post("/api/contact", {
        ...formData,
        captchaToken,
      });

      if (response.status === 200) {
        setMessage({
          text: "✅ Sent Successfully!",
          isSuccess: true,
        });

        // ✅ Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          zipCode: "",
          phoneNumber: "",
          comments: "",
          captchaToken: "",
        });
        setCaptchaToken(null);

        // ✅ Reset reCAPTCHA
        recaptchaRef.current?.reset();

        // ✅ Automatically remove success message after a few seconds
        setTimeout(() => setMessage(null), 4000);
      }
    } catch (error) {
      console.error(error);
      setMessage({
        text: "❌ Failed to send message. Please try again later.",
        isSuccess: false,
      });

      // Refresh captcha after failed attempt too
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="py-12 px-6 md:px-16 bg-gray-200 scroll-mt-20"
      id="contactUs"
    >
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
            <a
              href="#customerService"
              className="text-green-600 font-medium hover:underline"
            >
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

        {/* Right Section (Form + Alerts) */}
        <div>
          {/* ✅ Success or Failure Message */}
          {message && (
            <div className="flex flex-col items-center justify-center py-8 mb-6 bg-white rounded-lg shadow">
              {message.isSuccess ? (
                <>
                  <h2 className="text-2xl font-semibold text-green-600">
                    ✅ Sent Successfully!
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm text-center">
                    Your message has been received. We’ll get back to you soon!
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-red-500">
                    ❌ Message Failed
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm text-center">
                    {message.text}
                  </p>
                </>
              )}
            </div>
          )}

          {/* ✅ Show Form only if no success message */}
          {!message?.isSuccess && (
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
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="border border-black bg-white p-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
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

              {/* ✅ reCAPTCHA */}
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                onChange={(token) => setCaptchaToken(token)}
                ref={recaptchaRef}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white font-semibold py-3 hover:bg-green-700 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
