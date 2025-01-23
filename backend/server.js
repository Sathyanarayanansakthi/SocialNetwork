//imports 
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv'; 
import mongoose from 'mongoose';

//config
dotenv.config()
const app = express();

// Middleware
app.use(express.json());

// Use the auth routes
app.use('/', authRoutes);

//mongodb connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  });     

//Porting connection 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

