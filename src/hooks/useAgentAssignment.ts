import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export interface SalesAgent {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  rating: number;
}

export interface AgentAssignment {
  id: string;
  agent: SalesAgent;
  listing_id: string;
  assignment_type: 'sell' | 'buy';
  status: 'active' | 'completed' | 'cancelled';
  assigned_at: string;
  completed_at?: string;
  notes?: string;
}

export interface AgentCommunication {
  id: string;
  from_agent: boolean;
  message: string;
  message_type: 'text' | 'email' | 'call_log';
  created_at: string;
}

export const useAgentAssignment = (listingId?: string) => {
  const { user } = useAuth();
  const [assignment, setAssignment] = useState<AgentAssignment | null>(null);
  const [communications, setCommunications] = useState<AgentCommunication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignment = async () => {
    if (!user || !listingId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('client_agent_assignments')
        .select(`
          id,
          assignment_type,
          status,
          assigned_at,
          completed_at,
          notes,
          sales_agents (
            id,
            name,
            email,
            phone,
            specialization,
            rating
          )
        `)
        .eq('client_id', user.id)
        .eq('listing_id', listingId)
        .eq('status', 'active')
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (data) {
        setAssignment({
          id: data.id,
          agent: data.sales_agents,
          listing_id: listingId,
          assignment_type: data.assignment_type,
          status: data.status,
          assigned_at: data.assigned_at,
          completed_at: data.completed_at,
          notes: data.notes
        });

        // Fetch communications
        const { data: commData, error: commError } = await supabase
          .from('agent_communications')
          .select('*')
          .eq('assignment_id', data.id)
          .order('created_at', { ascending: true });

        if (commError) throw commError;
        setCommunications(commData || []);
      }
    } catch (err: any) {
      console.error('Error fetching agent assignment:', err);
      setError('Failed to load agent assignment');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!assignment || !user) return { success: false, error: 'No active assignment' };

    try {
      const { error } = await supabase
        .from('agent_communications')
        .insert({
          assignment_id: assignment.id,
          from_agent: false,
          message,
          message_type: 'text'
        });

      if (error) throw error;

      // Refresh communications
      await fetchAssignment();

      return { success: true };
    } catch (err: any) {
      console.error('Error sending message:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [user, listingId]);

  return {
    assignment,
    communications,
    loading,
    error,
    sendMessage,
    refetch: fetchAssignment
  };
};