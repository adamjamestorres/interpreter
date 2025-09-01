import { StreamClient } from '@stream-io/node-sdk';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

const streamClient = new StreamClient(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!
);

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing WEBHOOK_SECRET');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = await (await headerPayload).get('svix-id');
  const svix_timestamp = await (await headerPayload).get('svix-timestamp');
  const svix_signature = await (await headerPayload).get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  try {
    const evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;

    const eventType = evt.type;

    switch (eventType) {
      case 'user.created':
      case 'user.updated':
        const userData = evt.data;
        await streamClient.upsertUsers([
          {
            id: userData.id,
            role: 'user',
            name: `${userData.first_name} ${userData.last_name}`,
            custom: {
              username: userData.username,
              email: userData.email_addresses[0].email_address,
            },
            image: userData.image_url,
          },
        ]);
        break;
      default:
        console.log('Unhandled webhook event type:', eventType);
        break;
    }

    return new Response('Webhook processed', { status: 200 });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }
}
