import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export interface Bid {
  id: string;
  created_at: string;
  listing_id: string;
  user_id: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  profiles?: {
    first_name: string;
    last_name: string;
    company_name: string;
  };
}

export const useBids = (listingId?: string) => {
  const { user } = useAuth();
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBids = async () => {
    if (!listingId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('bids')
        .select(`
          id,
          created_at,
          listing_id,
          user_id,
          amount,
          status,
          message,
          profiles!bids_user_id_fkey (
            first_name,
            last_name,
            company_name
          )
        `)
        .eq('listing_id', listingId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setBids(data || []);
    } catch (err: any) {
      console.error('Error fetching bids:', err);
      setError('Failed to load bids. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const placeBid = async (bidData: {
    listing_id: string;
    amount: number;
    message?: string;
  }) => {
    if (!user) {
      return { success: false, error: 'You must be logged in to place a bid' };
    }

    try {
      const { data, error } = await supabase
        .from('bids')
        .insert({
          ...bidData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      setBids(prev => [data, ...prev]);

      return { success: true, data };
    } catch (err: any) {
      console.error('Error placing bid:', err);
      return { success: false, error: err.message };
    }
  };

  const updateBidStatus = async (bidId: string, status: Bid['status']) => {
    try {
      const { error } = await supabase
        .from('bids')
        .update({ status })
        .eq('id', bidId);

      if (error) throw error;

      // Update local state
      setBids(prev => prev.map(bid => 
        bid.id === bidId ? { ...bid, status } : bid
      ));

      return { success: true };
    } catch (err: any) {
      console.error('Error updating bid status:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    if (listingId) {
      fetchBids();
    }
  }, [listingId]);

  return {
    bids,
    loading,
    error,
    refetch: fetchBids,
    placeBid,
    updateBidStatus
  };
};