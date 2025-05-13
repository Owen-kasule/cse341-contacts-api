import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Ensure dotenv can find the .env file (may need to adjust path for your project structure)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

let db;

// Make sure the MongoDB URI exists before trying to connect
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('ERROR: Missing MONGO_URI environment variable');
  process.exit(1);
}

// Setup MongoDB connection
const client = new MongoClient(uri);

// Connect once at module level
async function connectToDb() {
  try {
    await client.connect();
    db = client.db('contacts'); // Replace 'contacts' with your actual database name
    console.log('Connected to MongoDB from controller');
    return db;
  } catch (error) {
    console.error('MongoDB connection error in controller:', error);
    throw error;
  }
}

// Connect to the database first
const dbPromise = connectToDb();

export const getAll = async (req, res) => {
  try {
    // Make sure we're connected before proceeding
    await dbPromise;
    const result = await db.collection('contacts').find().toArray();
    res.send(result);
  } catch (err) {
    console.error('Error in getAll:', err);
    res.status(500).json({ message: err.message });
  }
};

export const getSingle = async (req, res) => {
  try {
    // Make sure we're connected before proceeding
    await dbPromise;
    const result = await db.collection('contacts').findOne({ _id: req.params.id });
    res.send(result);
  } catch (err) {
    console.error('Error in getSingle:', err);
    res.status(500).json({ message: err.message });
  }
};