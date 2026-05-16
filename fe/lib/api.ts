import { RideRequestData } from "@/types/ride";

// lib/api.ts
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export interface RideSearchFilters {
  from: string;
  to: string;
  seats: number;
  detourTolerance: number;
  genderPreference?: string;
  rideComfort?: string;
  musicPreference?: boolean;
}

export const searchRides = async (filters: RideSearchFilters): Promise<any[]> => {
  const response = await fetch(`${BACKEND_URL}/api/rides`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });

  if (!response.ok) {
    throw new Error('Failed to load rides');
  }

  return response.json();
};

export const submitRideRequest = async (data: RideRequestData): Promise<{ message: string; bookingId?: string }> => {
  const response = await fetch(`${BACKEND_URL}/api/rides/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit ride request');
  }

  return response.json();
};