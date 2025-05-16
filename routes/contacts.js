import express from 'express';
import { listContacts, getContactById } from '../controllers/contactController.js';

const router = express.Router();

router.get('/', listContacts);
router.get('/:id', getContactById);

export default router;
