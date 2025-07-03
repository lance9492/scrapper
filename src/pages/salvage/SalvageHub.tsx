import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Wrench, Cog, PenTool as Tool, Star, MapPin, Shield, Clock, Plus } from 'lucide-react';
import { CreateListing } from '../../components/CreateListing';
import { ListingCard } from '../../components/ListingCard';
import { supabase } from '../../lib/supabaseClient';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
}

const SalvageHub = () => {
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          id,
          title,
          description,
          price,
          location,
          images,
          profiles (
            first_name,
            last_name,
            company_name
          )
        `)
        .eq('type', 'salvage')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setListings(data.map(listing => ({
          ...listing,
          seller: {
            name: listing.profiles?.company_name || 
              `${listing.profiles?.first_name} ${listing.profiles?.last_name}`,
            rating: 4.5, // This should come from a ratings table
            verified: true // This should be based on verification status
          }
        })));
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Equipment & Parts Shop</h1>
          <p className="text-gray-600 max-w-2xl">
            South Africa's premier marketplace for quality used vehicles, machinery, and parts. 
            All items verified by professional assessors.
          </p>
        </div>
        <button
          onClick={() => setShowCreateListing(true)}
          className="flex items-center gap-2 bg-[#FF3B81] text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Post Listing
        </button>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">Loading listings...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No listings found</p>
          </div>
        ) : (
          listings.map(listing => (
            <ListingCard
              key={listing.id}
              {...listing}
              type="salvage"
              onBidPlaced={fetchListings}
            />
          ))
        )}
      </div>

      {showCreateListing && (
        <CreateListing
          type="salvage"
          onClose={() => setShowCreateListing(false)}
          onSuccess={() => {
            fetchListings();
            setShowCreateListing(false);
          }}
        />
      )}
    </div>
  );
};

export default SalvageHub;