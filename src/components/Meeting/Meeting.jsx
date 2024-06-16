'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const MeetingScheduler = ({ userId }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    try {
      const response = await axios.post('/api/schedule-meeting', {
        userId,
      });

      const { id: sessionId } = response.data;

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe Checkout error:', error);
        alert('Failed to redirect to Stripe Checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout session creation error:', error);
      alert('Failed to create Checkout session. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Pay & Schedule Meeting'}
      </button>
    </div>
  );
};

export default MeetingScheduler;
