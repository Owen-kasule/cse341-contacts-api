import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Ensure dotenv can find the .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { tls: true, tlsAllowInvalidCertificates: false });

let db;
let usersCollection;

async function connectToDb() {
  if (!db) {
    await client.connect();
    db = client.db('project1'); // <-- correct DB name
    usersCollection = db.collection('users'); // <-- correct collection name
  }
}

export const getAll = async (req, res) => {
  try {
    await connectToDb();
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingle = async (req, res) => {
  try {
    await connectToDb();
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};