import redisClient from '../config/redisClient';

export interface SyncSession {
  pin: string;
  type: 'text' | 'image';
  content: string;
  createdAt: number;
  expiresAt: number;
  consumed: boolean;
}

export interface CreateSessionParams {
  type: 'text' | 'image';
  content: string;
  ttlSeconds?: number;
}

export interface CreateSessionResult {
  pin: string;
  expiresIn: number;
}

export interface FetchSessionResult {
  type: 'text' | 'image';
  content: string;
}

// Generate a random 6-digit PIN
function generatePin(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// Check if a PIN already exists in Redis
async function pinExists(pin: string): Promise<boolean> {
  const key = `sync:${pin}`;
  const exists = await redisClient.exists(key);
  return exists === 1;
}

// Create a new sync session
export async function createSession(
  params: CreateSessionParams
): Promise<CreateSessionResult> {
  const { type, content, ttlSeconds = 600 } = params;

  // Validate input
  if (!type || !content) {
    throw new Error('type and content are required');
  }

  if (!['text', 'image'].includes(type)) {
    throw new Error('type must be either text or image');
  }

  // Generate unique PIN
  let pin = generatePin();
  let attempts = 0;
  const maxAttempts = 10;

  while (await pinExists(pin)) {
    pin = generatePin();
    attempts++;
    if (attempts >= maxAttempts) {
      throw new Error('Failed to generate unique PIN');
    }
  }

  const now = Date.now();
  const session: SyncSession = {
    pin,
    type,
    content,
    createdAt: now,
    expiresAt: now + ttlSeconds * 1000,
    consumed: false,
  };

  // Store in Redis with TTL
  const key = `sync:${pin}`;
  await redisClient.setEx(key, ttlSeconds, JSON.stringify(session));

  return {
    pin,
    expiresIn: ttlSeconds,
  };
}

// Fetch a sync session by PIN
export async function fetchSession(pin: string): Promise<FetchSessionResult> {
  if (!pin) {
    throw new Error('PIN is required');
  }

  const key = `sync:${pin}`;
  const data = await redisClient.get(key);

  if (!data) {
    const error: any = new Error('PIN expired or not found');
    error.statusCode = 404;
    throw error;
  }

  const session: SyncSession = JSON.parse(data);
  const now = Date.now();

  // Check if expired (additional check beyond Redis TTL)
  if (session.expiresAt <= now) {
    await redisClient.del(key);
    const error: any = new Error('PIN expired or not found');
    error.statusCode = 404;
    throw error;
  }

  // Check if already consumed
  if (session.consumed) {
    const error: any = new Error('Data already consumed');
    error.statusCode = 410;
    throw error;
  }

  // Mark as consumed and delete immediately
  await redisClient.del(key);

  return {
    type: session.type,
    content: session.content,
  };
}

// Delete a session (for optional "Delete now" feature)
export async function deleteSession(pin: string): Promise<void> {
  const key = `sync:${pin}`;
  await redisClient.del(key);
}
