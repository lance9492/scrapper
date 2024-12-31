import crypto from 'crypto-js';

const PAYFAST_MERCHANT_ID = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || '';
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY || '';
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE || '';

interface PaymentData {
  amount: number;
  item_name: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  email_address: string;
}

export function generatePaymentSignature(data: PaymentData): string {
  const payload = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: data.return_url,
    cancel_url: data.cancel_url,
    notify_url: data.notify_url,
    amount: data.amount.toFixed(2),
    item_name: data.item_name,
    email_address: data.email_address,
  };

  // Sort the object by key
  const sortedPayload = Object.keys(payload)
    .sort()
    .reduce((acc: Record<string, string>, key) => {
      acc[key] = payload[key as keyof typeof payload];
      return acc;
    }, {});

  // Create the signature string
  const signatureString = Object.entries(sortedPayload)
    .map(([key, value]) => `${key}=${encodeURIComponent(value.toString())}`)
    .join('&');

  // Generate signature using MD5
  return crypto.MD5(signatureString + PAYFAST_PASSPHRASE).toString();
}

export function createPaymentForm(data: PaymentData) {
  const signature = generatePaymentSignature(data);
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? 'https://www.payfast.co.za' : 'https://sandbox.payfast.co.za';

  return {
    url: `${baseUrl}/eng/process`,
    fields: {
      merchant_id: PAYFAST_MERCHANT_ID,
      merchant_key: PAYFAST_MERCHANT_KEY,
      return_url: data.return_url,
      cancel_url: data.cancel_url,
      notify_url: data.notify_url,
      amount: data.amount.toFixed(2),
      item_name: data.item_name,
      email_address: data.email_address,
      signature,
    },
  };
}