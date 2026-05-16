import { Schema, model } from 'mongoose';

const rideSchema = new Schema({
  driver: String,
  car: String,
  image: String,
  rating: Number,
  seats: Number,
  departureTime: String,
  gender: String,
  comfort: String,
  music: Boolean,
  detour: Number,
  price: Number,
  lat: Number,
  lng: Number,
  from: String,  // Pickup location
  to: String     // Destination
});

export default model('Ride', rideSchema);