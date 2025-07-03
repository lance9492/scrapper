import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { stripePromise } from '../lib/stripe';
import { PaymentForm } from './PaymentForm';

interface PlaceBidProps {
  listingId: string;
  currentPrice: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const PlaceBid = ({ listingId, currentPrice, onClose, onSuccess }: PlaceBidProps) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState(currentPrice);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('bids')
        .insert({
          listing_id: listingId,
          user_id: user.id,
          amount,
          message
        });

      if (error) throw error;

      setShowPayment(true);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        {showPayment ? (
          <Elements stripe={stripePromise}>
            <PaymentForm
              amount={amount}
              onSuccess={handlePaymentSuccess}
              onClose={onClose}
            />
          </Elements>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Place Bid</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bid Amount (ZAR)
                </label>
                <input
                  type="number"
                  required
                  min={currentPrice}
                  step="0.01"
                  className="w-full rounded-lg border-gray-300"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border-gray-300"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add any additional information or questions about your bid"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#FF3B81] text-white rounded-lg hover:bg-pink-600 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Continue to Payment'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};