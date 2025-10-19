"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios, { AxiosError } from "axios";

interface Country {
  name: string;
  code: string;
}

interface CareerModalClientProps {
  onClose?: () => void;
}

interface FormDataState {
  name: string;
  lastName: string;
  address: string;
  city: string;
  email: string;
  country: string;
  authorized: string;
  felony: string;
  comments: string;
  resume: File | null;
}

export default function CareerModalClient({ onClose }: CareerModalClientProps) {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
    country: "",
    authorized: "",
    felony: "",
    comments: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ✅ Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("/api/countries", { timeout: 60000 });
        const data = res.data;
        if (Array.isArray(data)) {
          setCountries(data);
        } else if (data && Array.isArray(data.countries)) {
          setCountries(data.countries);
        } else {
          console.warn("Unexpected country data format:", data);
        }
      } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching countries:", err.message);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // ✅ Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  // ✅ Validate form data
  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.lastName.trim()) return "Last name is required.";
    if (!formData.city.trim()) return "City is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Please enter a valid email address.";
    if (!formData.country.trim()) return "Country is required.";
    if (!formData.authorized)
      return "Please answer the work authorization question.";
    if (!formData.felony) return "Please answer the felony question.";

    if (formData.resume) {
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(formData.resume.type))
        return "Résumé must be a .pdf or .docx file.";
      if (formData.resume.size > 2 * 1024 * 1024)
        return "Résumé must be less than 2MB.";
    }

    return null;
  };

  // ✅ Submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      (Object.keys(formData) as Array<keyof FormDataState>).forEach((key) => {
        const value = formData[key];
        if (value !== null) {
          if (value instanceof File) {
            formDataToSend.append(key, value);
          } else {
            formDataToSend.append(key, value);
          }
        }
      });

      const res = await fetch("/api/career", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) throw new Error("Failed to submit form.");

      // ✅ Success
      setSuccess(true);
      setFormData({
        name: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
        country: "",
        authorized: "",
        felony: "",
        comments: "",
        resume: null,
      });

      // ✅ Auto-close after short delay
      setTimeout(() => {
        if (onClose) {
          onClose();
        } else {
          const modal = document.getElementById("hs-career-modal");
          if (modal) modal.classList.add("hidden");
        }
      }, 2000);
    } catch (error) {
      const err = error as Error;
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 text-left overflow-y-auto max-h-[90vh]">
      {!success ? (
        <>
          <h3 className="text-xl lg:text-2xl font-medium text-[#00558C] mb-1 uppercase">
            Enter your contact information
          </h3>
          <p className="text-gray-600 text-xs lg:text-sm mb-6">
            Tell us about yourself and how to contact you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-900 p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-900 p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Address & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-900 p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-900 p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email & Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-900 p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-900 p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">
                    {loadingCountries
                      ? "Loading Countries..."
                      : "Select a country"}
                  </option>
                  {!loadingCountries &&
                    countries.map((c) => (
                      <option key={c.code || c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <h4 className="text-lg font-semibold mt-4">
                Upload Résumé (Optional)
              </h4>
              <p className="text-sm text-gray-500 mb-2">
                Must be .pdf or .docx, less than 2MB.
              </p>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="w-full border border-gray-900 p-2"
              />
            </div>

            {/* Radio Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium mb-1">
                  Authorized to work in the US/Canada? *
                </p>
                <div className="flex gap-4">
                  {["yes", "no"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="authorized"
                        value={val}
                        checked={formData.authorized === val}
                        onChange={handleChange}
                        required
                      />
                      <span>{val.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">
                  Have you ever been convicted of a felony? *
                </p>
                <div className="flex gap-4">
                  {["yes", "no"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="felony"
                        value={val}
                        checked={formData.felony === val}
                        onChange={handleChange}
                        required
                      />
                      <span>{val.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Additional Comments
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-900 p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 ${
                  loading
                    ? "bg-gray-100 text-black"
                    : "bg-green-600 hover:bg-green-700"
                } text-white font-medium rounded-md`}
              >
                {loading ? "Submitting..." : "Submit Form"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-semibold text-green-600">
            ✅ Sent Successfully!
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Your application has been received.
          </p>
        </div>
      )}
    </div>
  );
}
