import { loadStripe } from '@stripe/stripe-js';

// Only initialize Stripe if we have a valid publishable key
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = stripePublishableKey && stripePublishableKey.startsWith('pk_') 
  ? loadStripe(stripePublishableKey)
  : null;

export const createPaymentIntent = async (amount: number) => {
  if (!stripePromise) {
    throw new Error('Stripe is not configured. Please check your VITE_STRIPE_PUBLISHABLE_KEY environment variable.');
  }

  try {
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const processPayment = async (paymentMethodId: string, amount: number) => {
  if (!stripePromise) {
    throw new Error('Stripe is not configured. Please check your VITE_STRIPE_PUBLISHABLE_KEY environment variable.');
  }

  try {
    const response = await fetch('/.netlify/functions/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId,
        amount,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};