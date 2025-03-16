import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import analysisRouter from './src/routes/analysis.routes.js';
import collegeRouter from './src/routes/college.routes.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/analysis', analysisRouter);
app.use('/api/colleges', collegeRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);