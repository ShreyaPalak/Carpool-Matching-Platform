"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaClock, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

export default function RideConfirmation() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [rideDetails, setRideDetails] = useState(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem("rideDetails");
    if (storedDetails) {
      setRideDetails(JSON.parse(storedDetails));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!rideDetails) return;
    const timer = setTimeout(() => router.push("/"), 20000);
    return () => clearTimeout(timer);
  }, [rideDetails, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-cyan-300">
        Loading confirmation...
      </div>
    );
  }

  if (!rideDetails) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 text-center text-slate-200">
        <p className="text-xl font-semibold">No ride details found.</p>
        <button
          onClick={() => router.push("/request-ride")}
          className="mt-4 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-[#050505]"
        >
          Request a new ride
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_10%,rgba(0,242,255,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(112,0,255,0.18),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(0,242,255,0.1),transparent_35%)]" />

      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
        <div className="text-center">
          <FaCheckCircle className="mx-auto text-6xl text-cyan-300" />
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-cyan-300">Booking Confirmed</p>
          <h1 className="mt-2 text-3xl font-semibold">Your Ride Is Locked In</h1>
          <p className="mt-2 text-sm text-slate-300">Cyber-Noir dispatch matched your request successfully.</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-cyan-300/20 bg-black/25 p-4">
            <p className="text-xs uppercase text-slate-400">Booking ID</p>
            <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-cyan-200"><FaTicketAlt /> {rideDetails.bookingId || "RF-NA"}</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-black/25 p-4">
            <p className="text-xs uppercase text-slate-400">Ride Type</p>
            <p className="mt-1 text-lg font-semibold capitalize text-cyan-200">{rideDetails.rideType}</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-black/25 p-4 sm:col-span-2">
            <p className="text-xs uppercase text-slate-400">Route</p>
            <p className="mt-1 flex items-center gap-2 text-slate-100"><FaMapMarkerAlt className="text-cyan-300" /> {rideDetails.pickup} → {rideDetails.destination}</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-black/25 p-4 sm:col-span-2">
            <p className="text-xs uppercase text-slate-400">Departure</p>
            <p className="mt-1 flex items-center gap-2 text-slate-100"><FaClock className="text-cyan-300" /> {rideDetails.departureTime}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => router.push("/")}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-3 font-semibold text-[#050505] transition hover:brightness-110"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => router.push("/request-ride")}
            className="w-full rounded-xl border border-cyan-300/40 bg-white/[0.03] px-4 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
          >
            Book Another Ride
          </button>
        </div>
      </div>
    </div>
  );
}
