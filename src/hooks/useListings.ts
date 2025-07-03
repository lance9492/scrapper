import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: 'recycle' | 'salvage';
  category: string;
  price: number;
  location: string;
  images: string[];
  status: 'active' | 'sold' | 'expired' | 'cancelled';
  created_at: string;
  expires_at: string;
  user_id: string;
  profiles?: {
    first_name: string;
    last_name: string;
    company_name: string;
  };
}

export const useListings = (type?: 'recycle' | 'salvage') => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('listings')
        .select(`
          id,
          title,
          description,
          type,
          category,
          price,
          location,
          images,
          status,
          created_at,
          expires_at,
          user_id,
          profiles!listings_user_id_profiles_fkey (
            first_name,
            last_name,
            company_name
          )
        `)
        .eq('status', 'active')
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setListings(data || []);
    } catch (err: any) {
      console.error('Error fetching listings:', err);
      setError('Failed to load listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [type]);

  return {
    listings,
    loading,
    error,
    refetch: fetchListings
  };
};