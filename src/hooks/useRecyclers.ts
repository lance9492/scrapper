import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface Recycler {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  website: string;
  materials: string[];
  verified: boolean;
  latitude: number;
  longitude: number;
  service_offerings: string[];
  container_types: string[];
  minimum_weight: number;
  payment_terms: string;
  operating_hours: string;
}

export const useRecyclers = (filters?: {
  province?: string;
  material?: string;
  searchTerm?: string;
}) => {
  const [recyclers, setRecyclers] = useState<Recycler[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecyclers = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('recyclers')
        .select('*')
        .order('name');

      if (filters?.province && filters.province !== 'All Provinces') {
        query = query.eq('province', filters.province);
      }

      if (filters?.material && filters.material !== 'All Materials') {
        query = query.contains('materials', [filters.material]);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      let filteredData = data || [];

      // Apply search filter on client side for better performance
      if (filters?.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        filteredData = filteredData.filter(recycler =>
          recycler.name.toLowerCase().includes(searchLower) ||
          recycler.city.toLowerCase().includes(searchLower) ||
          recycler.description.toLowerCase().includes(searchLower)
        );
      }

      setRecyclers(filteredData);
    } catch (err: any) {
      console.error('Error fetching recyclers:', err);
      setError('Failed to load recyclers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecyclers();
  }, [filters?.province, filters?.material]);

  // Refetch when search term changes (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (filters?.searchTerm !== undefined) {
        fetchRecyclers();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters?.searchTerm]);

  return {
    recyclers,
    loading,
    error,
    refetch: fetchRecyclers
  };
};