import express from 'express';
import users from './users.js';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the Contacts API!');
});

routes.use('/users', users);

export default routes;