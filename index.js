import express from 'express';
import 'dotenv/config';
import { connectDB } from './data/db.js';
import contactsRouter from './routes/contacts.js';

await connectDB();

const app = express();
app.use(express.json());

// sanity‐check
app.get('/', (req, res) => res.send('Hello World'));

app.use('/contacts', contactsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`🚀 Server listening at http://localhost:${PORT}`)
);
