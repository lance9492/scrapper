import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Wrench, Cog, PenTool as Tool, Star, MapPin, Shield, Clock, Plus, Settings, Zap } from 'lucide-react';
import { CreateListing } from '../components/CreateListing';
import { ListingCard } from '../components/ListingCard';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  created_at: string;
  user_id: string;
  profiles?: {
    first_name: string;
    last_name: string;
    company_name: string;
  };
}

const SalvageHub = () => {
  const { user } = useAuth();
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('listings')
        .select(`
          id,
          title,
          description,
          price,
          location,
          images,
          created_at,
          user_id,
          profiles!listings_user_id_profiles_fkey (
            first_name,
            last_name,
            company_name
          )
        `)
        .eq('type', 'salvage')
        .eq('status', 'active')
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Fetch error:', fetchError);
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
  }, []);

  const handleCreateListingSuccess = () => {
    fetchListings(); // Refresh listings after creating a new one
  };

  const formatSellerName = (listing: Listing) => {
    if (listing.profiles?.company_name) {
      return listing.profiles.company_name;
    }
    if (listing.profiles?.first_name || listing.profiles?.last_name) {
      return `${listing.profiles.first_name || ''} ${listing.profiles.last_name || ''}`.trim();
    }
    return 'Anonymous Seller';
  };

  return (
    <div className="pt-24 pb-8">
      {/* Professional Header Section with pink and black gradient */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-pink-600 overflow-hidden">
        {/* Industrial watermarks background */}
        <div className="absolute inset-0 opacity-5">
          {/* Vehicle watermarks */}
          <div className="absolute top-10 left-10 transform rotate-12">
            <Truck className="w-24 h-24 text-white" />
          </div>
          <div className="absolute top-32 right-20 transform -rotate-12">
            <Truck className="w-32 h-32 text-white" />
          </div>
          <div className="absolute bottom-20 left-1/4 transform rotate-45">
            <Truck className="w-20 h-20 text-white" />
          </div>
          
          {/* Engine/machinery watermarks */}
          <div className="absolute top-20 left-1/3 transform -rotate-45">
            <Settings className="w-28 h-28 text-white" />
          </div>
          <div className="absolute bottom-32 right-1/4 transform rotate-12">
            <Settings className="w-36 h-36 text-white" />
          </div>
          <div className="absolute top-1/2 left-16 transform -rotate-12">
            <Cog className="w-24 h-24 text-white" />
          </div>
          <div className="absolute bottom-10 right-10 transform rotate-45">
            <Cog className="w-20 h-20 text-white" />
          </div>
          
          {/* Mining equipment watermarks */}
          <div className="absolute top-40 right-1/3 transform rotate-30">
            <Zap className="w-26 h-26 text-white" />
          </div>
          <div className="absolute bottom-40 left-1/2 transform -rotate-30">
            <Wrench className="w-30 h-30 text-white" />
          </div>
          <div className="absolute top-1/3 right-12 transform rotate-60">
            <Tool className="w-22 h-22 text-white" />
          </div>
          
          {/* Additional scattered elements */}
          <div className="absolute top-16 left-2/3 transform -rotate-15">
            <Wrench className="w-18 h-18 text-white" />
          </div>
          <div className="absolute bottom-16 left-20 transform rotate-75">
            <Zap className="w-16 h-16 text-white" />
          </div>
          <div className="absolute top-2/3 right-1/2 transform -rotate-60">
            <Settings className="w-22 h-22 text-white" />
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-400/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="mb-8">
              {/* Icon with pink accent */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl mb-6 shadow-2xl border border-pink-400/20">
                <Tool className="w-10 h-10 text-white" />
              </div>
              
              {/* Main title with pink accent */}
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                <span className="bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                  SalvageHub
                </span>
              </h1>
              
              {/* Pink accent line */}
              <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-pink-400 mx-auto mb-6 rounded-full shadow-lg"></div>
              
              {/* Description with enhanced contrast */}
              <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
                South Africa's premier marketplace for quality used vehicles, machinery, and parts. 
                All items verified by professional assessors.
              </p>
              
              {/* Call to action button with pink theme */}
              {user && (
                <button
                  onClick={() => setShowCreateListing(true)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-xl border border-pink-400/20"
                >
                  <Plus className="w-5 h-5" />
                  Post New Listing
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Listings Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Listings</h2>
            <div className="text-sm text-gray-500">
              {listings.length} {listings.length === 1 ? 'listing' : 'listings'} available
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                  <div className="w-full h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Tool className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No listings found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Be the first to post a salvage listing and connect with buyers across South Africa.
              </p>
              {user && (
                <button
                  onClick={() => setShowCreateListing(true)}
                  className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create First Listing
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map(listing => (
                <ListingCard
                  key={listing.id}
                  id={listing.id}
                  title={listing.title}
                  description={listing.description || ''}
                  image={listing.images?.[0] || 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg'}
                  price={listing.price}
                  location={listing.location}
                  seller={{
                    name: formatSellerName(listing),
                    rating: 4.5, // This should come from a ratings system
                    verified: true // This should be based on verification status
                  }}
                  type="salvage"
                  onBidPlaced={fetchListings}
                />
              ))}
            </div>
          )}
        </div>

        {/* Trust Indicators with pink accents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose SalvageHub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We ensure quality, security, and reliability in every transaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verified Sellers</h3>
              <p className="text-gray-600 text-sm">
                All sellers undergo strict verification. Business credentials and track record checked.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600 text-sm">
                Professional assessment of all listed items. Detailed condition reports available.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Trading</h3>
              <p className="text-gray-600 text-sm">
                Protected payments and verified transactions. Full buyer protection on all purchases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Listing Modal */}
      {showCreateListing && (
        <CreateListing
          type="salvage"
          onClose={() => setShowCreateListing(false)}
          onSuccess={handleCreateListingSuccess}
        />
      )}
    </div>
  );
};

export default SalvageHub;