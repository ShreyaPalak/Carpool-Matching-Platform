import { Router } from 'express';
import Ride, { find } from '../models/RIDE';
const router = Router();

// Get filtered rides
router.post('/', async (req, res) => {
  try {
    const { from, to, seats, detourTolerance } = req.body;
    
    const rides = await find({
      from: new RegExp(from, 'i'),
      to: new RegExp(to, 'i'),
      seats: { $gte: seats },
      detour: { $lte: detourTolerance }
    });

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
    res.status(400).json({ message: err.message });  }
});

export default router;