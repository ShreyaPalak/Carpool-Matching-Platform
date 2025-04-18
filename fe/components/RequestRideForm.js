import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaMapMarkerAlt, FaClock, FaUser, FaPhone } from 'react-icons/fa';

export default function RequestRideForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    departureTime: '',
    seatsNeeded: 1,
    contactNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/rides/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save ride');
      router.push('/confirmation');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
    </form>
  );
}