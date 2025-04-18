// types/ride.ts
export interface RideRequestData {
  pickup: string;
  destination: string;
  departureTime: string;
  seatsNeeded: number;
  contactNumber: string;
  specialRequests?: string;
}