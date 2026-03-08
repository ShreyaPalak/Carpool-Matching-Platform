'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Dynamically import icons with no SSR
const FaPhone = dynamic(() => import('react-icons/fa').then(mod => mod.FaPhone), { ssr: false });
const FaCar = dynamic(() => import('react-icons/fa').then(mod => mod.FaCar), { ssr: false });
const FaInfoCircle = dynamic(() => import('react-icons/fa').then(mod => mod.FaInfoCircle), { ssr: false });
const FaSuitcase = dynamic(() => import('react-icons/fa').then(mod => mod.FaSuitcase), { ssr: false });
const FaPaw = dynamic(() => import('react-icons/fa').then(mod => mod.FaPaw), { ssr: false });
const FaWheelchair = dynamic(() => import('react-icons/fa').then(mod => mod.FaWheelchair), { ssr: false });
const FaMoneyBillWave = dynamic(() => import('react-icons/fa').then(mod => mod.FaMoneyBillWave), { ssr: false });

export default function RequestRidePage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rideType: 'standard',
    luggage: false,
    pets: false,
    accessibilityNeeds: false,
    paymentMethod: 'cash',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      const response = await fetch('https://script.google.com/macros/s/AKfycbyJ3vXMINq31qSn7FXECC_dkXx-H_zJWVitlFb8TKWx_JpidpC6npmqubypH_pBSswL/exec', {
        method: 'POST',
        body: formPayload
      });

      if (!response.ok) throw new Error('Submission failed');
      alert('Ride request submitted! 🚗');
      router.push('/confirmation');
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your ride request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-peach-50 to-peach-100 flex items-center justify-center">
        <div className="text-peach-800">Loading ride form...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 to-peach-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl border border-peach-200">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-peach-800">Request Your Ride</h1>
            <p className="mt-2 text-peach-600">Complete your booking details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information Section */}
            <div className="bg-peach-50 p-4 rounded-lg border border-peach-100">
              <h2 className="text-lg font-semibold text-peach-800 mb-3">
                Personal Information
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-peach-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-peach-300 rounded-md shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-peach-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-peach-300 rounded-md shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-peach-700 mb-1">
                    <FaPhone className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-peach-300 rounded-md shadow-sm"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Ride Type */}
            <div className="bg-peach-50 p-4 rounded-lg border border-peach-100">
              <label className="block text-sm font-medium text-peach-700 mb-1">
                <FaCar className="inline mr-2" />
                Ride Type
              </label>
              <select
                name="rideType"
                value={formData.rideType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-peach-300 rounded-md shadow-sm"
              >
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="xl">XL (Extra Space)</option>
              </select>
            </div>

            {/* Additional Options */}
            <div className="bg-peach-50 p-4 rounded-lg border border-peach-100">
              <h2 className="text-lg font-semibold text-peach-800 mb-3 flex items-center">
                <FaInfoCircle className="mr-2" /> Additional Options
              </h2>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="luggage"
                    name="luggage"
                    checked={formData.luggage}
                    onChange={handleChange}
                    className="h-4 w-4 text-peach-600 border-peach-300 rounded"
                  />
                  <label htmlFor="luggage" className="ml-2 text-sm text-peach-700 flex items-center">
                    <FaSuitcase className="mr-1" /> I have luggage
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pets"
                    name="pets"
                    checked={formData.pets}
                    onChange={handleChange}
                    className="h-4 w-4 text-peach-600 border-peach-300 rounded"
                  />
                  <label htmlFor="pets" className="ml-2 text-sm text-peach-700 flex items-center">
                    <FaPaw className="mr-1" /> Traveling with pets
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="accessibilityNeeds"
                    name="accessibilityNeeds"
                    checked={formData.accessibilityNeeds}
                    onChange={handleChange}
                    className="h-4 w-4 text-peach-600 border-peach-300 rounded"
                  />
                  <label htmlFor="accessibilityNeeds" className="ml-2 text-sm text-peach-700 flex items-center">
                    <FaWheelchair className="mr-1" /> Accessibility needs
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-peach-700 mb-1">
                    <FaMoneyBillWave className="inline mr-2" />
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-peach-300 rounded-md shadow-sm"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="mobile">Mobile Payment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-peach-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-peach-300 rounded-md shadow-sm"
                    placeholder="Any other special requirements..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 text-lg font-medium text-white bg-gradient-to-r from-peach-500 to-peach-600 rounded-md shadow-sm hover:from-peach-600 hover:to-peach-700 transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Processing...' : 'Submit Ride Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}