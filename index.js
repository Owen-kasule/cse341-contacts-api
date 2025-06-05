import express from 'express';
import 'dotenv/config';
import { connectDB } from './data/db.js';
import contactsRouter from './routes/contacts.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

await connectDB();

const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts information'
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://cse341-contacts-api-mofz.onrender.com'
          : 'http://localhost:8080'
      }
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.get('/', (req, res) => res.send('Hello World'));
app.use('/contacts', contactsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`🚀 Server listening at http://localhost:${PORT}`)
);
