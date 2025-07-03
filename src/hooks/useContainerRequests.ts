import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface ContainerRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  container_type: string;
  quantity: number;
  status: 'pending' | 'approved' | 'delivered' | 'rejected';
  notes?: string;
}

export const useContainerRequests = () => {
  const [requests, setRequests] = useState<ContainerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('container_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setRequests(data || []);
    } catch (err: any) {
      console.error('Error fetching container requests:', err);
      setError('Failed to load container requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, status: ContainerRequest['status']) => {
    try {
      const { error } = await supabase
        .from('container_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setRequests(prev => prev.map(req => 
        req.id === id ? { ...req, status } : req
      ));

      return { success: true };
    } catch (err: any) {
      console.error('Error updating request status:', err);
      return { success: false, error: err.message };
    }
  };

  const createRequest = async (requestData: Omit<ContainerRequest, 'id' | 'created_at' | 'status'>) => {
    try {
      const { data, error } = await supabase
        .from('container_requests')
        .insert(requestData)
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      setRequests(prev => [data, ...prev]);

      return { success: true, data };
    } catch (err: any) {
      console.error('Error creating container request:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    refetch: fetchRequests,
    updateRequestStatus,
    createRequest
  };
};