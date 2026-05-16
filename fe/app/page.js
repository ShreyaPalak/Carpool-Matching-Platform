"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaCar, FaStar, FaUser, FaClock, FaMusic } from "react-icons/fa";
import { Slider } from "@/components/ui/slider";
import { searchRides } from "@/lib/api";

const MapWithNoSSR = dynamic(() => import("../components/ui/MapComponent"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-slate-800/50" />,
});

const dummyCars = [
  {
    id: 1,
    lat: 37.7749,
    lng: -122.4194,
    driver: "John Doe",
    car: "Tesla Model 3",
    image:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/37138/model-3-exterior-left-front-three-quarter.jpeg?isig=0&q=80",
    rating: 4.5,
    seats: 3,
    departureTime: "08:00 AM",
    gender: "Male",
    comfort: "Comfort",
    music: true,
    detour: 2,
    price: "$10",
  },
  {
    id: 2,
    lat: 37.7849,
    lng: -122.4094,
    driver: "Jane Smith",
    car: "Toyota Prius",
    image:
      "https://www.financialexpress.com/wp-content/uploads/2022/11/2023-toyota-prius-2-2.jpg",
    rating: 4.8,
    seats: 4,
    departureTime: "08:30 AM",
    gender: "Female",
    comfort: "Standard",
    music: false,
    detour: 5,
    price: "$8",
  },
  {
    id: 3,
    lat: 37.7949,
    lng: -122.3994,
    driver: "Alice Johnson",
    car: "Honda Civic",
    image:
      "https://europeanlifemedia.com/wp-content/uploads/2022/03/featured-image-luxury-cars-900.jpg",
    rating: 4.7,
    seats: 2,
    departureTime: "09:00 AM",
    gender: "Female",
    comfort: "Luxury",
    music: true,
    detour: 3,
    price: "$12",
  },
  {
    id: 4,
    lat: 37.8049,
    lng: -122.3894,
    driver: "Bob Brown",
    car: "Ford Mustang",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2025-ford-mustang-60th-anniversary-exterior-66227932bb88e.jpg?crop=0.793xw:1.00xh;0.106xw,0&resize=1200:*",
    rating: 4.6,
    seats: 2,
    departureTime: "09:15 AM",
    gender: "Male",
    comfort: "Standard",
    music: false,
    detour: 4,
    price: "$9",
  },
  {
    id: 5,
    lat: 37.8149,
    lng: -122.3794,
    driver: "Charlie Davis",
    car: "Chevrolet Bolt",
    image:
      "https://di-uploads-pod9.dealerinspire.com/blossomchevy/uploads/2021/04/2022-Chevy-Bolt-EUV-LT-Model-Left.jpg",
    rating: 4.9,
    seats: 3,
    departureTime: "09:30 AM",
    gender: "Male",
    comfort: "Standard",
    music: true,
    detour: 1,
    price: "$11",
  },
  {
    id: 6,
    lat: 37.8249,
    lng: -122.3694,
    driver: "Diana Evans",
    car: "Nissan Leaf",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2025-nissan-leaf-122-66904631c3472.jpg?crop=0.729xw:0.668xh;0.105xw,0.191xh&resize=980:*",
    rating: 4.4,
    seats: 4,
    departureTime: "09:45 AM",
    gender: "Female",
    comfort: "Luxury",
    music: false,
    detour: 6,
    price: "$7",
  },
];

const fieldClassName =
  "h-11 rounded-xl border border-white/15 bg-white/5 text-slate-100 placeholder:text-slate-400 transition duration-200 ease-out focus-visible:border-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]";

const quickStats = [
  { label: "Active rides", value: "120+" },
  { label: "Average rating", value: "4.8★" },
  { label: "Avg wait", value: "6 min" },
];

export default function CarpoolingUI() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [rideComfort, setRideComfort] = useState("");
  const [musicPreference, setMusicPreference] = useState(false);
  const [detourTolerance, setDetourTolerance] = useState(5);
  const [seatAvailability, setSeatAvailability] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState(dummyCars);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    setSearchMessage("");
    setHasSearched(true);

    try {
      const rides = await searchRides({
        from: pickup,
        to: destination,
        seats: seatAvailability,
        detourTolerance,
        genderPreference,
        rideComfort,
        musicPreference,
      });

      setSearchResults(rides);

      if (!rides.length) {
        setSearchMessage("No rides were found for these search criteria.");
      }
    } catch (err) {
      console.error("Ride search failed:", err);
      setSearchMessage("Unable to load rides from the backend. Please try again later.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const displayedCars = searchResults;

  const activeFilters = [
    seatAvailability > 1 ? `${seatAvailability} seats` : null,
    detourTolerance < 10 ? `Detour ≤ ${detourTolerance} km` : null,
    genderPreference || null,
    rideComfort || null,
    musicPreference ? "Music" : null,
  ].filter(Boolean);

  const resetFilters = () => {
    setGenderPreference("");
    setRideComfort("");
    setMusicPreference(false);
    setDetourTolerance(5);
    setSeatAvailability(1);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1b2f5f_0%,#0d1730_35%,#090e1f_100%)] text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b1020]/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">RideFlow</p>
            <h1 className="text-xl font-semibold sm:text-2xl">Find a Carpool Ride</h1>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#" aria-label="Navigate to Find Ride">Find Ride</a>
            <a className="transition hover:text-white" href="#" aria-label="Navigate to Offer Ride">Offer Ride</a>
            <a className="transition hover:text-white" href="#" aria-label="Navigate to Trips">Trips</a>
            <a className="transition hover:text-white" href="#" aria-label="Navigate to Profile">Profile</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 backdrop-blur-xl">
          Home <span className="px-2 text-slate-500">/</span> Find Ride
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickStats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
            >
              <p className="text-sm text-slate-300">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold text-cyan-200">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/7 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold sm:text-2xl">Trip search</h2>
            <Button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="h-10 rounded-xl bg-slate-800 px-4 text-sm text-slate-100 hover:bg-slate-700 md:hidden"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="pickup" className="text-sm text-slate-300">Pickup location</label>
              <Input id="pickup" placeholder="Enter pickup location" value={pickup} onChange={(e) => setPickup(e.target.value)} className={fieldClassName} />
            </div>
            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm text-slate-300">Destination</label>
              <Input id="destination" placeholder="Enter destination" value={destination} onChange={(e) => setDestination(e.target.value)} className={fieldClassName} />
            </div>
            <div className="space-y-2">
              <label htmlFor="departure" className="text-sm text-slate-300">Departure time</label>
              <Input id="departure" type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} className={fieldClassName} />
            </div>
          </div>

          <div className={`${showFilters ? "mt-6 block" : "hidden"} md:mt-6 md:block`}>
            <div className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-[#121a2d]/70 p-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <label className="text-sm text-slate-300" htmlFor="seats">Seats Needed</label>
                <Input id="seats" type="number" min="1" max="4" value={seatAvailability} onChange={(e) => setSeatAvailability(Number(e.target.value) || 1)} className={fieldClassName} />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm text-slate-300">Max Detour ({detourTolerance} km)</label>
                <Slider min={0} max={10} step={1} value={[detourTolerance]} onValueChange={([value]) => setDetourTolerance(value)} className="py-3" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300" htmlFor="gender">Driver Gender</label>
                <select id="gender" value={genderPreference} onChange={(e) => setGenderPreference(e.target.value)} className={`${fieldClassName} w-full px-3`}>
                  <option className="bg-[#0b1020]" value="">No Preference</option>
                  <option className="bg-[#0b1020]" value="Male">Male</option>
                  <option className="bg-[#0b1020]" value="Female">Female</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300" htmlFor="comfort">Comfort Level</label>
                <select id="comfort" value={rideComfort} onChange={(e) => setRideComfort(e.target.value)} className={`${fieldClassName} w-full px-3`}>
                  <option className="bg-[#0b1020]" value="">Any</option>
                  <option className="bg-[#0b1020]" value="Standard">Standard</option>
                  <option className="bg-[#0b1020]" value="Comfort">Comfort</option>
                  <option className="bg-[#0b1020]" value="Luxury">Luxury</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={musicPreference}
                  onChange={(e) => setMusicPreference(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-400 bg-transparent text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-300"
                />
                Music allowed
              </label>
              <Button type="button" variant="outline" onClick={resetFilters} className="rounded-xl border-white/30 bg-transparent text-slate-200 hover:bg-white/10">
                Reset filters
              </Button>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-300">{hasSearched ? searchMessage || `${displayedCars.length} rides found` : "Search rides using the selected filters."}</p>
              <Button
                type="button"
                onClick={handleSearch}
                className="h-11 rounded-xl bg-cyan-500 px-6 text-sm font-semibold text-[#071022] hover:bg-cyan-400"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search rides"}
              </Button>
            </div>
          </div>
        </section>

        {activeFilters.length > 0 && (
          <section className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <span key={filter} className="rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100">
                {filter}
              </span>
            ))}
          </section>
        )}

        <section className="overflow-hidden rounded-3xl border border-white/15 bg-[#121a2d]/70 shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
          <div className="h-72 w-full sm:h-96">
            <MapWithNoSSR center={[37.7749, -122.4194]} zoom={13} markers={displayedCars} />
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold sm:text-2xl">Available Rides ({displayedCars.length})</h2>
          </div>

          {displayedCars.length === 0 ? (
            <div className="rounded-2xl border border-white/15 bg-white/5 px-6 py-10 text-center text-slate-300">
              No rides match your current filters. Try adjusting your preferences.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {displayedCars.map((car) => (
                <Card key={car.id} className="group rounded-2xl border border-white/15 bg-white/7 text-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition duration-220 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="relative h-28 w-full overflow-hidden rounded-xl sm:w-32">
                        <Image
                          src={car.image}
                          alt={car.car}
                          fill
                          sizes="(max-width: 640px) 100vw, 128px"
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{car.driver}</h3>
                          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-300">{car.price}</span>
                        </div>
                        <p className="text-sm text-slate-300">{car.car}</p>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200">
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1"><FaStar className="text-amber-300" /> {car.rating}</span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1"><FaUser /> {car.gender}</span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1"><FaCar /> {car.comfort}</span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1"><FaClock /> {car.departureTime}</span>
                          {car.music && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1"><FaMusic /> Music</span>
                          )}
                        </div>

                        <Button
                          className="mt-4 h-11 w-full rounded-xl bg-cyan-500 text-[#071022] transition duration-150 ease-out hover:bg-cyan-400 active:scale-[0.98]"
                          onClick={() => router.push("/request-ride")}
                        >
                          Request Ride
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
