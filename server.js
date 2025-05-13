import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import routes from './routes/index.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
let db;
const uri = process.env.MONGO_URI;

async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri, {
      tls: true,
      tlsAllowInvalidCertificates: false
    });
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('project1'); // Use your actual DB name
    return client;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'An error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Connect to MongoDB and start server
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export { app, db };