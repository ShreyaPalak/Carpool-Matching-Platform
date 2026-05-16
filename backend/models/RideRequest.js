import { Schema, model } from 'mongoose';

const rideRequestSchema = new Schema({
  fullName: String,
  email: String,
  phone: String,
  pickup: String,
  destination: String,
  departureTime: String,
  rideType: String,
  luggage: Boolean,
  pets: Boolean,
  accessibilityNeeds: Boolean,
  paymentMethod: String,
  specialRequests: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bookingId: String,
  status: {
    type: String,
    default: 'pending',
  },
});

export default model('RideRequest', rideRequestSchema);
