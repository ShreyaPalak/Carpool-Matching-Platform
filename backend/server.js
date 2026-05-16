import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rideRoutes from './routes/rides.js';
import connectDB from './db.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rides', rideRoutes);

// MongoDB Connection
(async () => {
	try {
		await connectDB();
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('MongoDB connection error:', err);
	}
})();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));