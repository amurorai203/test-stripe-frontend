
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const visitSite = import.meta.env.VITE_SITE;
const visitLink = visitSite + '/create-checkout-session';

console.log(visitLink);

function App() {
  const [amount, setAmount] = useState('');

  const handleCheckout = async () => {
    if (!amount || isNaN(amount) || Number(amount) < 1) {
      alert('Please enter a valid amount');
      return;
    }

    const stripe = await stripePromise;

    const response = await fetch(visitLink, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(Number(amount) * 100) }), // convert to cents
    });

    const data = await response.json();

    if (data.id) {
      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      alert('Error creating checkout session');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Enter Amount to Pay</h2>
      <input
        type="number"
        value={amount}
        placeholder="e.g. 15.99"
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />
      <button onClick={handleCheckout} style={{ padding: 10 }}>
        Pay with Stripe
      </button>
    </div>
  );
}

export default App;
