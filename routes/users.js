import express from 'express';
import * as usersController from '../controllers/users.js';

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

export default router;