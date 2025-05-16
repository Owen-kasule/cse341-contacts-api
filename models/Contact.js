import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName:     { type: String, required: true },
  lastName:      { type: String, required: true },
  email:         { type: String, required: true, unique: true },
  favoriteColor: String,
  birthday:      Date
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
