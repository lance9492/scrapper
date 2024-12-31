import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto-js';

const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE || '';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const signature = data.get('signature');

    // Verify the payment signature
    const signatureString = Array.from(data.entries())
      .filter(([key]) => key !== 'signature')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${encodeURIComponent(value.toString())}`)
      .join('&');

    const calculatedSignature = crypto.MD5(signatureString + PAYFAST_PASSPHRASE).toString();

    if (signature !== calculatedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Process the payment notification
    const paymentStatus = data.get('payment_status');
    const merchantPaymentId = data.get('m_payment_id');

    if (paymentStatus === 'COMPLETE') {
      // Update the listing status in your database
      // Activate the listing
      // Send confirmation email to the seller
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Payment notification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}