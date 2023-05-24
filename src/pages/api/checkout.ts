import { stripe } from '@/lib/stipe';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed.' });

  const { priceId } = req.body;

  if (!priceId) return res.status(400).json({ error: 'Price not found.' });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    cancel_url: `${process.env.NEXT_URL}/`,
    success_url: `${process.env.NEXT_URL}/success`,
  });

  return res.status(201).json({ checkoutUrl: checkoutSession.url });
}
