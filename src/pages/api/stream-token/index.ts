import { getAuth } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Explicitly check request method
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = await getAuth(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - No user ID' });
    }

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;

    if (!apiKey || !apiSecret) {
      console.error('Stream API credentials missing', { 
        hasApiKey: !!apiKey,
        hasApiSecret: !!apiSecret 
      });
      return res.status(500).json({ error: 'Stream API credentials not configured' });
    }

    // Create a Stream compatible token
    const token = jwt.sign(
      {
        user_id: userId,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour from now
        iat: Math.floor(Date.now() / 1000),
      },
      apiSecret
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error in stream-token endpoint:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
