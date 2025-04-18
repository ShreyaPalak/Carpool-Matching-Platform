// File: /pages/api/rides.js

require('dotenv').config();
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import rideRoutes from './routes/rides';

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api/rides', rideRoutes);

// MongoDB Connection
connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));