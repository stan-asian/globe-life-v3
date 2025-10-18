"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios, { AxiosError } from "axios";

interface CareerModalClientProps {
  onClose?: () => void;
}

export default function CareerModalClient({ onClose }: CareerModalClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
    country: "",
    authorized: "",
    felony: "",
    comments: "",
    resume: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countries, setCountries] = useState<{ name: string; code: string }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ✅ Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("/api/countries", { timeout: 10000 });
        const data = res.data;

        if (Array.isArray(data)) {
          setCountries(data);
        } else if ("countries" in data) {
          setCountries(data.countries);
        } else {
          console.warn("Unexpected country data format:", data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error fetching countries:", error.message);
        } else if (error instanceof Error) {
          console.error("Error fetching countries:", error.message);
        } else {
          console.error("Unknown error fetching countries");
        }
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

  // ✅ Validate form
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

      // Explicitly narrow types instead of using `as any`
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "string") {
          formDataToSend.append(key, value);
        } else if (value instanceof File) {
          formDataToSend.append(key, value);
        }
      });

      const res = await fetch("/api/career", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) throw new Error("Failed to submit form.");

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

      setTimeout(() => {
        if (onClose) {
          onClose();
        } else {
          const modal = document.getElementById("hs-career-modal");
          if (modal) modal.classList.add("hidden");
        }
      }, 2000);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting.";
      setError(message);
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

            {/* Other fields remain unchanged */}
            {/* ... */}
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
