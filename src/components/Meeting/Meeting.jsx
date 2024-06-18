'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Image from 'next/image';
import { hushhprofile } from '../../../public/profile';

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
    <div className='px-6 pt-[22.27px] bg-zinc-100 h-full pb-32 w-full'>

      <div className=' bg-white rounded-lg shadow flex px-3 py-4 justify-between items-center'>
        <div className='flex gap-4'>
          <div>
            <Image src={hushhprofile} alt='profile' width={57} height={57} className=' rounded-full'></Image>
          </div>
          <div>
            <div className="text-zinc-800 text-base font-medium ">Tiana Rhiel Madsen</div>
            <div className="text-slate-500 text-xs font-light">Schedule 30 min meet</div>
            <div className="text-slate-500 text-xs font-light">Charge : $ 20</div>
          </div>
        </div>
        <div>
        <button onClick={handleCheckout} disabled={loading} className='text-white px-4 py-2 bg-gradient-to-l from-rose-600 to-blue-700 rounded-[32px] shadow  justify-center items-center gap-2.5 inline-flex'>
          {loading ? '.....' : 'Pay'}
        </button>
      </div>
      </div>

      {/* after payment confirmation */}

      <div className='flex justify-center'>
        <div className="mt-[24px] h-10 px-4 bg-blue-600 rounded-[39px]  mx-auto justify-center items-center gap-2.5 inline-flex">
          <div className="text-white text-[15px] font-normal ">Connect calendly</div>
        </div>
      </div>
     
    </div>
  );
};

export default MeetingScheduler;
