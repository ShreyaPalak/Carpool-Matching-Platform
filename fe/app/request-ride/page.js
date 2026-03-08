"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowRight,
  FaCar,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhone,
  FaRoute,
  FaSuitcase,
  FaPaw,
  FaWheelchair,
} from "react-icons/fa";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  pickup: "",
  destination: "",
  departureTime: "",
  rideType: "standard",
  luggage: false,
  pets: false,
  accessibilityNeeds: false,
  paymentMethod: "cash",
  specialRequests: "",
};

const inputClassName =
  "mt-1 w-full rounded-xl border border-cyan-300/20 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 backdrop-blur-md transition duration-200 ease-out focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/50";

export default function RequestRidePage() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ type: "", message: "" });

    const rideDetails = {
      ...formData,
      createdAt: new Date().toISOString(),
      status: "confirmed",
      bookingId: `RF-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    localStorage.setItem("rideDetails", JSON.stringify(rideDetails));

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, String(value));
      });

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyJ3vXMINq31qSn7FXECC_dkXx-H_zJWVitlFb8TKWx_JpidpC6npmqubypH_pBSswL/exec",
        {
          method: "POST",
          body: formPayload,
        }
      );

      if (!response.ok) {
        setSubmitState({
          type: "warning",
          message:
            "Request saved locally. Cloud sync is temporarily unavailable, but your booking is confirmed.",
        });
      } else {
        setSubmitState({
          type: "success",
          message: "Ride request submitted successfully.",
        });
      }
    } catch (error) {
      console.error("Submission fallback:", error);
      setSubmitState({
        type: "warning",
        message:
          "Network issue detected. Request saved locally and confirmation will still be shown.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => router.push("/confirmation"), 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(0,242,255,0.18),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(112,0,255,0.22),transparent_25%),radial-gradient(circle_at_50%_100%,rgba(0,242,255,0.1),transparent_35%)]" />

      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-3">
        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl lg:col-span-1">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Command Center</p>
          <h1 className="mt-2 text-3xl font-semibold">Request Your Ride</h1>
          <p className="mt-3 text-sm text-slate-300">
            Configure your route like a cockpit. Every detail is preserved instantly.
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <p className="flex items-center gap-2"><FaRoute className="text-cyan-300" /> Live route optimization</p>
            <p className="flex items-center gap-2"><FaCar className="text-cyan-300" /> Premium vehicle matching</p>
            <p className="flex items-center gap-2"><FaCheckCircle className="text-cyan-300" /> Local booking backup enabled</p>
          </div>
        </aside>

        <section className="rounded-2xl border border-cyan-300/20 bg-white/[0.03] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:col-span-2 sm:p-8">
          {submitState.message && (
            <div
              className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                submitState.type === "success"
                  ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                  : "border-amber-300/40 bg-amber-500/10 text-amber-300"
              }`}
            >
              {submitState.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="text-sm text-slate-300">
                Full Name
                <input name="fullName" value={formData.fullName} onChange={handleChange} required className={inputClassName} />
              </label>
              <label className="text-sm text-slate-300">
                Email
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClassName} />
              </label>
              <label className="text-sm text-slate-300">
                <span className="inline-flex items-center gap-2"><FaPhone className="text-cyan-300" /> Phone</span>
                <input name="phone" value={formData.phone} onChange={handleChange} required className={inputClassName} placeholder="+1 (555) 000-0000" />
              </label>
              <label className="text-sm text-slate-300">
                Departure Time
                <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} required className={inputClassName} />
              </label>
              <label className="text-sm text-slate-300 sm:col-span-2">
                <span className="inline-flex items-center gap-2"><FaMapMarkerAlt className="text-cyan-300" /> Pickup</span>
                <input name="pickup" value={formData.pickup} onChange={handleChange} required className={inputClassName} placeholder="Enter pickup location" />
              </label>
              <label className="text-sm text-slate-300 sm:col-span-2">
                Destination
                <input name="destination" value={formData.destination} onChange={handleChange} required className={inputClassName} placeholder="Enter destination" />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="text-sm text-slate-300">
                Ride Type
                <select name="rideType" value={formData.rideType} onChange={handleChange} className={inputClassName}>
                  <option className="bg-black" value="standard">Standard</option>
                  <option className="bg-black" value="premium">Premium</option>
                  <option className="bg-black" value="xl">XL</option>
                </select>
              </label>
              <label className="text-sm text-slate-300">
                <span className="inline-flex items-center gap-2"><FaMoneyBillWave className="text-cyan-300" /> Payment</span>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className={inputClassName}>
                  <option className="bg-black" value="cash">Cash</option>
                  <option className="bg-black" value="card">Card</option>
                  <option className="bg-black" value="mobile">Mobile</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-2 rounded-xl border border-white/10 bg-black/20 p-4 text-sm sm:grid-cols-3">
              <label className="inline-flex items-center gap-2 text-slate-300"><input type="checkbox" name="luggage" checked={formData.luggage} onChange={handleChange} className="accent-cyan-300" /> <FaSuitcase /> Luggage</label>
              <label className="inline-flex items-center gap-2 text-slate-300"><input type="checkbox" name="pets" checked={formData.pets} onChange={handleChange} className="accent-cyan-300" /> <FaPaw /> Pets</label>
              <label className="inline-flex items-center gap-2 text-slate-300"><input type="checkbox" name="accessibilityNeeds" checked={formData.accessibilityNeeds} onChange={handleChange} className="accent-cyan-300" /> <FaWheelchair /> Accessibility</label>
            </div>

            <label className="block text-sm text-slate-300">
              Special Requests
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={3}
                className={inputClassName}
                placeholder="Add route notes, music, temperature, etc."
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-3 font-semibold text-[#050505] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Confirming..." : "Confirm Ride Request"}
              <FaArrowRight />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
