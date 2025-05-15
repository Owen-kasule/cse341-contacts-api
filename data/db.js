import mongoose from 'mongoose';
import 'dotenv/config';

const uri = process.env.MONGO_URI;
if (!uri) throw new Error('Missing MONGO_URI in .env');

export async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser:    true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
}
