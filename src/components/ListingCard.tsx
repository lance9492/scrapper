import React, { useState } from 'react';
import { Star, MapPin, Users } from 'lucide-react';
import { PlaceBid } from './PlaceBid';
import { AgentAssistant } from './AgentAssistant';
import { useAuth } from '../context/AuthContext';

interface Seller {
  name: string;
  rating: number;
  verified: boolean;
}

interface ListingCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  location: string;
  seller: Seller;
  type: 'recycle' | 'salvage';
  onBidPlaced?: () => void;
}

export const ListingCard = ({
  id,
  title,
  description,
  image,
  price,
  location,
  seller,
  type,
  onBidPlaced
}: ListingCardProps) => {
  const { user } = useAuth();
  const [showBidModal, setShowBidModal] = useState(false);
  const [showAgentChat, setShowAgentChat] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
          {seller.verified && (
            <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded">
              Verified Seller
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-semibold">R {price.toLocaleString()}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span>{seller.rating}</span>
            <span className="ml-2 text-gray-500">{seller.name}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBidModal(true)}
            className="flex-1 bg-[#FF3B81] text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Place Bid
          </button>
          {user && (
            <button
              onClick={() => setShowAgentChat(true)}
              className="bg-purple-800 text-white p-2 rounded-lg hover:bg-purple-900 transition"
              title="Get agent assistance"
            >
              <Users className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {showBidModal && (
        <PlaceBid
          listingId={id}
          currentPrice={price}
          onClose={() => setShowBidModal(false)}
          onSuccess={() => {
            setShowBidModal(false);
            onBidPlaced?.();
          }}
        />
      )}

      {showAgentChat && (
        <AgentAssistant
          listingId={id}
          onClose={() => setShowAgentChat(false)}
        />
      )}
    </div>
  );
};