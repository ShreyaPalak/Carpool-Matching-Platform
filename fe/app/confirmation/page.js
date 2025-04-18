'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaCheckCircle, 
  FaCar, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUserAlt, 
  FaPhone, 
  FaStar, 
  FaSuitcase, 
  FaPaw, 
  FaWheelchair 
} from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RideConfirmation() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [rideDetails, setRideDetails] = useState(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const storedDetails = localStorage.getItem('rideDetails');
      if (storedDetails) {
        setRideDetails(JSON.parse(storedDetails));
      }
      setIsLoading(false);
    }

    const timer = setTimeout(() => {
      router.push('/');
    }, 30000);
    
    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading || !rideDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-blue-800">Loading ride details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Rest of your confirmation UI */}
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
            <FaCheckCircle className="mx-auto text-5xl text-white mb-4" />
            <h1 className="text-2xl font-bold text-white">Ride Confirmed!</h1>
            <p className="text-white/90 mt-2">Your {rideDetails.rideType} ride is booked</p>
          </div>

          {/* Display all ride details here */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Ride Summary</h2>
            <div className="space-y-3">
              <p><strong>Pickup:</strong> {rideDetails.pickup}</p>
              <p><strong>Destination:</strong> {rideDetails.destination}</p>
              <p><strong>Time:</strong> {rideDetails.departureTime}</p>
              {/* Add other details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}