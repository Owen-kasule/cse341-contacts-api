const routes = require('express').Router();

routes.get('/', (req, res) => {res.send('Welcome to the Contacts API!')});

routes.use('/users', require('./users'));

module.exports = routes;