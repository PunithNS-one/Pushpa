import { Request, Response } from 'express';
import * as syncService from '../services/syncService';

// POST /api/create
export async function createSessionController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { type, content, ttlSeconds } = req.body;

    // Validate payload size for text
    if (type === 'text' && content && content.length > 10 * 1024) {
      res.status(400).json({ error: 'Text content exceeds 10KB limit' });
      return;
    }

    const result = await syncService.createSession({
      type,
      content,
      ttlSeconds,
    });

    res.json(result);
  } catch (error: any) {
    console.error('Error creating session:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message || 'Internal server error' });
  }
}

// POST /api/fetch
export async function fetchSessionController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { pin } = req.body;

    const result = await syncService.fetchSession(pin);

    res.json(result);
  } catch (error: any) {
    console.error('Error fetching session:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message || 'Internal server error' });
  }
}

// POST /api/delete (optional stretch feature)
export async function deleteSessionController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { pin } = req.body;

    if (!pin) {
      res.status(400).json({ error: 'PIN is required' });
      return;
    }

    await syncService.deleteSession(pin);

    res.json({ message: 'Session deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting session:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message || 'Internal server error' });
  }
}
