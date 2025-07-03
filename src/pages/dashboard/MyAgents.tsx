import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MessageCircle, Star, Phone, Mail, Clock, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { formatRelativeTime } from '../../utils/formatters';

interface SalesAgent {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  rating: number;
}

interface Assignment {
  id: string;
  agent: SalesAgent;
  listing: {
    id: string;
    title: string;
    type: 'recycle' | 'salvage';
    category: string;
    price: number;
    created_at: string;
  };
  assignment_type: 'sell' | 'buy';
  status: 'active' | 'completed' | 'cancelled';
  assigned_at: string;
  completed_at?: string;
  last_message?: {
    message: string;
    created_at: string;
    from_agent: boolean;
  };
  unread_count: number;
}

const MyAgents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchAssignments();
  }, [user, navigate]);

  const fetchAssignments = async () => {
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
          sales_agents (
            id,
            name,
            email,
            phone,
            specialization,
            rating
          ),
          listings (
            id,
            title,
            type,
            category,
            price,
            created_at
          )
        `)
        .eq('client_id', user.id)
        .order('assigned_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Get last message and unread count for each assignment
      const assignmentsWithMessages = await Promise.all((data || []).map(async (assignment) => {
        // Get last message
        const { data: lastMessageData } = await supabase
          .from('agent_communications')
          .select('message, created_at, from_agent')
          .eq('assignment_id', assignment.id)
          .order('created_at', { ascending: false })
          .limit(1);

        // Get unread count (messages from agent that user hasn't seen)
        const { count } = await supabase
          .from('agent_communications')
          .select('id', { count: 'exact', head: true })
          .eq('assignment_id', assignment.id)
          .eq('from_agent', true)
          .is('read_at', null);

        return {
          id: assignment.id,
          agent: assignment.sales_agents,
          listing: assignment.listings,
          assignment_type: assignment.assignment_type,
          status: assignment.status,
          assigned_at: assignment.assigned_at,
          completed_at: assignment.completed_at,
          last_message: lastMessageData?.[0] || null,
          unread_count: count || 0
        };
      }));

      setAssignments(assignmentsWithMessages);
    } catch (err: any) {
      console.error('Error fetching assignments:', err);
      setError('Failed to load your agent assignments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (assignmentId: string) => {
    try {
      const { data, error } = await supabase
        .from('agent_communications')
        .select('*')
        .eq('assignment_id', assignmentId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      // Mark messages as read
      await supabase
        .from('agent_communications')
        .update({ read_at: new Date().toISOString() })
        .eq('assignment_id', assignmentId)
        .eq('from_agent', true)
        .is('read_at', null);

      // Refresh assignments to update unread counts
      fetchAssignments();
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment || !newMessage.trim() || sendingMessage) return;

    try {
      setSendingMessage(true);
      const { error } = await supabase
        .from('agent_communications')
        .insert({
          assignment_id: selectedAssignment.id,
          from_agent: false,
          message: newMessage.trim(),
          message_type: 'text'
        });

      if (error) throw error;
      setNewMessage('');
      fetchMessages(selectedAssignment.id);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleAssignmentClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    fetchMessages(assignment.id);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Sales Agents</h1>
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Sales Agents</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assignments List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold">Your Agent Assignments</h2>
            </div>
            
            {assignments.length === 0 ? (
              <div className="p-6 text-center">
                <User className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">No agent assignments yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Agents are assigned when you create listings
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedAssignment?.id === assignment.id ? 'bg-pink-50' : ''
                    }`}
                    onClick={() => handleAssignmentClick(assignment)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                            {assignment.agent.name.charAt(0)}
                          </div>
                          {assignment.unread_count > 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {assignment.unread_count}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{assignment.agent.name}</h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                            <span>{assignment.agent.rating}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        assignment.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : assignment.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-2">
                      <p className="font-medium text-gray-700">{assignment.listing.title}</p>
                      <p>{assignment.listing.type === 'recycle' ? 'RecycleMart' : 'SalvageHub'} • {assignment.listing.category}</p>
                    </div>
                    
                    {assignment.last_message ? (
                      <div className="text-xs text-gray-500">
                        <p className="truncate">
                          {assignment.last_message.from_agent ? 'Agent: ' : 'You: '}
                          {assignment.last_message.message}
                        </p>
                        <p className="text-gray-400 mt-1">
                          {formatRelativeTime(assignment.last_message.created_at)}
                        </p>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400">
                        No messages yet • Assigned {formatRelativeTime(assignment.assigned_at)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="lg:col-span-2">
          {selectedAssignment ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 h-full flex flex-col">
              {/* Agent Header */}
              <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedAssignment.agent.name}</h3>
                      <div className="flex items-center text-xs">
                        <Star className="w-3 h-3 fill-current mr-1" />
                        <span>{selectedAssignment.agent.rating}</span>
                        <span className="mx-2">•</span>
                        <span>{selectedAssignment.agent.specialization.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${selectedAssignment.agent.phone}`}
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      title="Call agent"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${selectedAssignment.agent.email}`}
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      title="Email agent"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Listing Info */}
              <div className="p-3 bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-500">Listing:</span>{' '}
                    <span className="font-medium text-gray-900">{selectedAssignment.listing.title}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Assigned {formatRelativeTime(selectedAssignment.assigned_at)}</span>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto max-h-[400px] bg-gray-50">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">No messages yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Start the conversation with your agent
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.from_agent ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.from_agent
                              ? 'bg-white border border-gray-200 text-gray-800'
                              : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                          }`}
                        >
                          <p>{message.message}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 opacity-60" />
                            <span className="text-xs opacity-60">
                              {formatRelativeTime(message.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    disabled={sendingMessage}
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || sendingMessage}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center h-full flex flex-col items-center justify-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No conversation selected</h3>
              <p className="text-gray-500 max-w-md">
                Select an agent conversation from the list to view messages and communicate with your assigned sales agent.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAgents;