import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

if(!process.env.STRIPE_SECRET_KEY) {
    notFound();
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req:NextRequest) {
  const { userId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Meeting with User',
            },
            unit_amount: 5000, // $50.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Adjust these URLs as needed
      cancel_url: 'http://localhost:3000/cancel',
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error : any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
