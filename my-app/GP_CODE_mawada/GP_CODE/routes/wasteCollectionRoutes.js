import express from 'express';
import { scheduleWasteCollection, getWasteTypes } from '../controllers/wasteCollectionController.js';

const router = express.Router();

router.post('/schedule', scheduleWasteCollection);
router.get('/types', getWasteTypes);

export default router;
