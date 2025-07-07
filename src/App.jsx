
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const visitSite = import.meta.env.VITE_SITE;
const visitLink = visitSite + '/create-checkout-session';

function App() {
  const handleCheckout = async () => {
    const res = await fetch(visitLink, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();

    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div>
      <h1>Stripe Payment</h1>
      <button onClick={handleCheckout}>Pay $20</button>
    </div>
  );
}

export default App;
