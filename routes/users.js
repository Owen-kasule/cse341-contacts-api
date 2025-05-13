const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const routes = require('.');
routes.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

module.exports = routes;