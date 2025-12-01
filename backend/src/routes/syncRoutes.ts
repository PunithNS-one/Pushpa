import { Router } from 'express';
import * as syncController from '../controllers/syncController';

const router = Router();

// Create a new sync session
router.post('/create', syncController.createSessionController);

// Fetch a sync session by PIN
router.post('/fetch', syncController.fetchSessionController);

// Delete a sync session (optional)
router.post('/delete', syncController.deleteSessionController);

export default router;
