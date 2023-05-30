import { stripe } from '@/lib/stipe';
import { NextApiRequest, NextApiResponse } from 'next';

interface Body {
  pricesIds: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed.' });

  const { pricesIds } = req.body as Body;

  if (!pricesIds || pricesIds.length === 0)
    return res.status(400).json({ error: 'Prices IDs not found.' });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: pricesIds.map((priceId) => ({ price: priceId, quantity: 1 })),
    cancel_url: `${process.env.NEXT_URL}/`,
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  return res.status(201).json({ checkoutUrl: checkoutSession.url });
}
