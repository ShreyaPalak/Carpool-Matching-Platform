import { RideRequestData } from "@/types/ride";

// lib/api.ts
export const submitRideRequest = async (data: RideRequestData): Promise<{ message: string }> => {
  const response = await fetch('/api/rides', {
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