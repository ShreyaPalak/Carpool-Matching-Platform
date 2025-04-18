"use client";
import { useRouter } from 'next/navigation';  // Add this import


import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaCar, FaStar, FaUser, FaClock, FaMusic } from "react-icons/fa";
import { Slider } from "@/components/ui/slider";

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(
  () => import("../components/ui/MapComponent"),
  { ssr: false }
);

export default function CarpoolingUI() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [rideComfort, setRideComfort] = useState("Standard");
  const [musicPreference, setMusicPreference] = useState(false);
  const [detourTolerance, setDetourTolerance] = useState(5);
  const [seatAvailability, setSeatAvailability] = useState(1);

  // Dummy data
  const dummyCars = [
    {
      id: 1,
      lat: 37.7749,
      lng: -122.4194,
      driver: "John Doe",
      car: "Tesla Model 3",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/37138/model-3-exterior-left-front-three-quarter.jpeg?isig=0&q=80",
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
      image: "https://www.financialexpress.com/wp-content/uploads/2022/11/2023-toyota-prius-2-2.jpg",
      rating: 4.8,
      seats: 4,
      departureTime: "08:30 AM",
      gender: "Female",
      comfort: "Standard",
      music: false,
      detour: 5, // in km
      price: "$8",
    },
    {
      id: 3,
      lat: 37.7949,
      lng: -122.3994,
      driver: "Alice Johnson",
      car: "Honda Civic",
      image: "https://europeanlifemedia.com/wp-content/uploads/2022/03/featured-image-luxury-cars-900.jpg",
      rating: 4.7,
      seats: 2,
      departureTime: "09:00 AM",
      gender: "Female",
      comfort: "Luxury",
      music: true,
      detour: 3, // in km
      price: "$12",
    },
    {
      id: 4,
      lat: 37.8049,
      lng: -122.3894,
      driver: "Bob Brown",
      car: "Ford Mustang",
      image: "https://hips.hearstapps.com/hmg-prod/images/2025-ford-mustang-60th-anniversary-exterior-66227932bb88e.jpg?crop=0.793xw:1.00xh;0.106xw,0&resize=1200:*",
      rating: 4.6,
      seats: 2,
      departureTime: "09:15 AM",
      gender: "Male",
      comfort: "Standard",
      music: false,
      detour: 4, // in km
      price: "$9",
    },
    {
      id: 5,
      lat: 37.8149,
      lng: -122.3794,
      driver: "Charlie Davis",
      car: "Chevrolet Bolt",
      image: "https://di-uploads-pod9.dealerinspire.com/blossomchevy/uploads/2021/04/2022-Chevy-Bolt-EUV-LT-Model-Left.jpg",
      rating: 4.9,
      seats: 3,
      departureTime: "09:30 AM",
      gender: "Male",
      comfort: "Standard",
      music: true,
      detour: 1, // in km
      price: "$11",
    },
    {
      id: 6,
      lat: 37.8249,
      lng: -122.3694,
      driver: "Diana Evans",
      car: "Nissan Leaf",
      image: "https://hips.hearstapps.com/hmg-prod/images/2025-nissan-leaf-122-66904631c3472.jpg?crop=0.729xw:0.668xh;0.105xw,0.191xh&resize=980:*",
      rating: 4.4,
      seats: 4,
      departureTime: "09:45 AM",
      gender: "Female",
      comfort: "Luxury",
      music: false,
      detour: 6, // in km
      price: "$7",
    },
    // ... (include all your other dummy cars here)
  ];

  // Filtered cars state
  const [filteredCars, setFilteredCars] = useState(dummyCars);

  // Apply filters whenever they change
  useEffect(() => {
    const filtered = dummyCars.filter((car) => {
      return (
        car.seats >= seatAvailability &&
        car.detour <= detourTolerance &&
        (genderPreference === "" || car.gender === genderPreference) &&
        (rideComfort === "" || car.comfort === rideComfort) &&
        (musicPreference === null || car.music === musicPreference)
      );
    });
    setFilteredCars(filtered
      
    );
  }, [seatAvailability, detourTolerance, genderPreference, rideComfort, musicPreference]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#100d32] to-[#2c3e50] text-white flex items-center justify-center">
      <div className="w-[1280px] h-[720px] bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 overflow-y-auto">
        {/* Search Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Find a Carpool Ride</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Enter pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="p-3 border border-gray-300/20 bg-white/10 text-white placeholder-gray-300 rounded-lg"
            />
            <Input
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="p-3 border border-gray-300/20 bg-white/10 text-white placeholder-gray-300 rounded-lg"
            />
            <Input
              type="time"
              placeholder="Departure Time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="p-3 border border-gray-300/20 bg-white/10 text-white placeholder-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Seat Availability */}
            <div>
              <label className="block text-gray-300 mb-2">Seats Needed</label>
              <Input
                type="number"
                min="1"
                max="4"
                value={seatAvailability}
                onChange={(e) => setSeatAvailability(Number(e.target.value))}
                className="p-3 border border-gray-300/20 bg-white/10 text-white rounded-lg"
              />
            </div>
            
            {/* Detour Tolerance */}
            <div>
              <label className="block text-gray-300 mb-2">Max Detour (km)</label>
              <Slider
                min={0}
                max={10}
                step={1}
                value={[detourTolerance]}
                onValueChange={([value]) => setDetourTolerance(value)}
                className="w-full"
              />
              <span className="text-gray-300">{detourTolerance} km</span>
            </div>
            
            {/* Gender Preference */}
            <div>
              <label className="block text-gray-300 mb-2">Driver Gender</label>
              <select
                value={genderPreference}
                onChange={(e) => setGenderPreference(e.target.value)}
                className="p-3 border border-gray-300/20 bg-white/10 text-white rounded-lg w-full"
              >
                <option value="">No Preference</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            
            {/* Ride Comfort */}
            <div>
              <label className="block text-gray-300 mb-2">Comfort Level</label>
              <select
                value={rideComfort}
                onChange={(e) => setRideComfort(e.target.value)}
                className="p-3 border border-gray-300/20 bg-white/10 text-white rounded-lg w-full"
              >
                <option value="">Any</option>
                <option value="Standard">Standard</option>
                <option value="Comfort">Comfort</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
            
            {/* Music Preference */}
            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                checked={musicPreference}
                onChange={(e) => setMusicPreference(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-300">Music Allowed</span>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="h-64 w-full rounded-xl overflow-hidden shadow-lg mb-6">
          <MapWithNoSSR 
            center={[37.7749, -122.4194]} 
            zoom={13}
            markers={filteredCars}
          />
        </div>

        {/* Available Rides */}
        <h2 className="text-2xl font-semibold text-white mb-4">
          Available Rides ({filteredCars.length})
        </h2>
        
        {filteredCars.length === 0 ? (
          <div className="text-center py-8 text-gray-300">
            No rides match your current filters. Try adjusting your preferences.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCars.map((car) => (
              <Card key={car.id} className="bg-white/10 backdrop-blur-md">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={car.image} 
                      alt={car.car} 
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg">{car.driver}</h3>
                        <span className="text-green-400">{car.price}</span>
                      </div>
                      <p className="text-gray-300">{car.car}</p>
                      
                      <div className="flex items-center mt-2 gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          {car.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaUser />
                          {car.gender}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCar />
                          {car.comfort}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock />
                          {car.departureTime}
                        </span>
                        {car.music && (
                          <span className="flex items-center gap-1">
                            <FaMusic />
                            Music
                          </span>
                        )}
                      </div>
                      
                      <Button 
  className="w-full mt-4 bg-green-600 hover:bg-green-700"
  onClick={() => router.push('/request-ride')}
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
      </div>
    </div>
  );
}
