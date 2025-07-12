
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const visitSite = import.meta.env.VITE_SITE;
const visitLink = visitSite + '/create-checkout-session';

console.log(visitLink);

function App() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('gbp');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount || isNaN(amount) || Number(amount) < 1) {
      alert('Please enter a valid amount');
      return;
    }

    const stripe = await stripePromise;

    const response = await fetch(visitLink, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(parseFloat(amount) * 100), // convert to cents
        currency,
      }),
    });

    const data = await response.json();

    if (data.id) {
      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      alert('Error creating checkout session');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <label>
        Amount:
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Currency:
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="usd">USD</option>
          <option value="gbp">GBP</option>
          <option value="eur">EUR</option>
        </select>
      </label>
      <br />
      <button type="submit">Pay with Stripe</button>
    </form>
  );
}

export default App;
