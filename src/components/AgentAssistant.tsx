import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Star, Send, X, User, Clock } from 'lucide-react';
import { useAgentAssignment } from '../hooks/useAgentAssignment';
import { formatRelativeTime } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';

interface AgentAssistantProps {
  listingId: string;
  onClose?: () => void;
}

export const AgentAssistant: React.FC<AgentAssistantProps> = ({ listingId, onClose }) => {
  const { assignment, communications, loading, error, sendMessage } = useAgentAssignment(listingId);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const result = await sendMessage(newMessage.trim());
    
    if (result.success) {
      setNewMessage('');
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">
          No sales agent assigned yet. An agent will be assigned shortly to assist you.
        </p>
      </div>
    );
  }

  const { agent } = assignment;

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-pink-400/20"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{communications.filter(c => c.from_agent).length}</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">{agent.name}</h3>
                <p className="text-sm opacity-90">Your Sales Agent</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">{agent.rating}</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Agent Info */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <a
                href={`tel:${agent.phone}`}
                className="flex items-center gap-1 text-pink-600 hover:text-pink-700"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a
                href={`mailto:${agent.email}`}
                className="flex items-center gap-1 text-pink-600 hover:text-pink-700"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
            <div className="text-gray-500">
              Specializes in: {agent.specialization.slice(0, 2).join(', ')}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-64 overflow-y-auto p-4 space-y-3">
          {communications.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No messages yet. Say hello to your agent!</p>
            </div>
          ) : (
            communications.map((comm) => (
              <div
                key={comm.id}
                className={`flex ${comm.from_agent ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    comm.from_agent
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                  }`}
                >
                  <p className="text-sm">{comm.message}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 opacity-60" />
                    <span className="text-xs opacity-60">
                      {formatRelativeTime(comm.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || sending}
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-2 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};