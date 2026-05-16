import { Router } from 'express';
import Ride from '../models/RIDE.js';

const router = Router();

// Get filtered rides
router.post('/', async (req, res) => {
  try {
    const { from = '', to = '', seats = 1, detourTolerance = Number.MAX_SAFE_INTEGER } = req.body;

    const query = {
      from: new RegExp(from, 'i'),
      to: new RegExp(to, 'i'),
      seats: { $gte: seats },
      detour: { $lte: detourTolerance }
    };

    const rides = await Ride.find(query).exec();

    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new ride (for drivers)
router.post('/create', async (req, res) => {
  const ride = new Ride(req.body);
  try {
    const newRide = await ride.save();
    res.status(201).json(newRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;