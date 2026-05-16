import { RideRequestData } from "@/types/ride";

// lib/api.ts
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const submitRideRequest = async (data: RideRequestData): Promise<{ message: string }> => {
  const response = await fetch(`${BACKEND_URL}/api/rides`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit ride request');
  }

  return response.json() as Promise<{ message: string }>;
};