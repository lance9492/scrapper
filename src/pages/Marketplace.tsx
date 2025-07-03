import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { ChevronDown, ChevronRight, LineChart, Package, Users, Truck, Scale, Clock, Shield, Search, Menu as MenuIcon, Plus, Recycle, Settings, Cog, Wrench, PenTool as Tool, Zap, ArrowLeft } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { CreateListing } from '../components/CreateListing';
import { ListingCard } from '../components/ListingCard';
import { AgentAssistant } from '../components/AgentAssistant';
import { useAuth } from '../context/AuthContext';
import { useScrollDirection } from '../hooks/useScrollDirection';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ContainerRequest {
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

interface ContainerInventory {
  type: string;
  total: number;
  available: number;
  in_use: number;
}

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

const inventory: ContainerInventory[] = [
  { type: 'Bags (100L)', total: 1000, available: 750, in_use: 250 },
  { type: '240L Bins', total: 500, available: 300, in_use: 200 },
  { type: '6m³ Skips', total: 50, available: 30, in_use: 20 },
  { type: '12m³ Skips', total: 25, available: 15, in_use: 10 }
];

const containerOptions = [
  {
    type: '100L Bags',
    image: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg',
    capacity: '100 Liters',
    description: 'Durable bags perfect for collecting and storing recyclable materials.',
    price: 'Free'
  },
  {
    type: '240L Bins',
    image: 'https://images.pexels.com/photos/2682683/pexels-photo-2682683.jpeg',
    capacity: '240 Liters',
    description: 'Wheeled bins for easy handling and transportation of recyclables.',
    price: 'Free'
  },
  {
    type: '6m³ Skips',
    image: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg',
    capacity: '6 Cubic Meters',
    description: 'Industrial-grade skips for large-scale recycling operations.',
    price: 'Contact Us'
  }
];

const features = [
  {
    title: 'Free Delivery',
    description: 'We deliver containers to your location at no cost',
    icon: Truck
  },
  {
    title: 'Competitive Rates',
    description: 'Get the best market rates for your materials',
    icon: Scale
  },
  {
    title: 'Flexible Collection',
    description: 'We collect when your containers are full',
    icon: Clock
  },
  {
    title: 'Secure Storage',
    description: 'Keep your recyclables safe until collection',
    icon: Shield
  }
];

const metalTypes = {
  Copper: [
    'Bright Copper (Millberry)',
    'Heavy Copper (Berry)',
    'Light Copper',
    'Insulated Copper Wire (ICW)',
  ],
  Aluminum: ['Clean Aluminum', 'Cast Aluminum', 'Aluminum Cans'],
  Steel: ['HMS 1', 'HMS 2', '304 Stainless Steel', '316 Stainless Steel'],
  Brass: ['Yellow Brass', 'Red Brass', 'Mixed Brass'],
  Paper: ['White Paper', 'Common Mixed Paper', 'Cardboard (K4)', 'Mixed Cardboard'],
  Plastics: ['HDPE Natural', 'PET Clear', 'LDPE Clear', 'PP Mixed Colors'],
  'Used Oil': ['Motor Oil', 'Industrial Oil', 'Transformer Oil', 'Mixed Oil'],
};

const Marketplace = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [selectedListingForAgent, setSelectedListingForAgent] = useState<string | null>(null);
  const location = useLocation();
  const itemsPerPage = 10;
  const { scrollDirection, isAtTop } = useScrollDirection();

  // Check if we're on any marketplace page
  const isMarketplacePage = location.pathname.startsWith('/marketplace');
  const isMainMarketplacePage = location.pathname === '/marketplace';

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const pages = Array.from({ length: 5 }, (_, i) => i + 1);

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
          profiles (
            first_name,
            last_name,
            company_name
          )
        `)
        .eq('type', 'recycle')
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
    if (isMainMarketplacePage) {
      fetchListings();
    }
  }, [isMainMarketplacePage]);

  const handleMobileNavClick = () => {
    setShowMobileNav(!showMobileNav);
  };

  const handleNavLinkClick = () => {
    setShowMobileNav(false);
  };

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

  const handleContainerRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const { error } = await supabase
        .from('container_requests')
        .insert({
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
          address: formData.get('address') as string,
          container_type: formData.get('container_type') as string,
          quantity: parseInt(formData.get('quantity') as string),
          notes: formData.get('notes') as string || null
        });

      if (error) throw error;

      alert('Container request submitted successfully!');
      setShowRequestForm(false);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    }
  };

  // If not a marketplace page, don't render anything
  if (!isMarketplacePage) {
    return null;
  }

  return (
    <div className="pt-24"> {/* Added pt-24 for navbar spacing */}
      {/* RecycleMart Header - ALWAYS visible on ALL marketplace pages */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">RecycleMart</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                South Africa's premier marketplace for recyclable materials
              </p>
            </div>
            {user && isMainMarketplacePage && (
              <button
                onClick={() => setShowCreateListing(true)}
                className="flex items-center gap-2 bg-[#FF3B81] text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition shadow-sm lg:self-start mx-auto lg:mx-0"
              >
                <Plus className="w-5 h-5" />
                Post Listing
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs with Beautiful Headers and Watermarks */}
      <div 
        className={`
          sticky top-16 z-30 transition-transform duration-300 ease-in-out
          ${scrollDirection === 'down' && !isAtTop ? '-translate-y-full' : 'translate-y-0'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Navigation with Beautiful Headers */}
          <div className="hidden md:flex">
            {/* Trading Tab */}
            <Link
              to="/marketplace"
              className={`flex-1 relative overflow-hidden rounded-tl-xl rounded-tr-xl ${
                location.pathname === '/marketplace'
                  ? 'shadow-lg'
                  : 'hover:bg-pink-50'
              }`}
            >
              {/* Background with watermarks */}
              <div className={`absolute inset-0 ${
                location.pathname === '/marketplace'
                  ? 'bg-gradient-to-r from-green-600 to-green-700'
                  : 'bg-white'
              }`}>
                {/* Watermarks */}
                {location.pathname === '/marketplace' && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1 left-4 transform rotate-12">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-1 right-4 transform -rotate-12">
                      <Recycle className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-2 right-1/3 transform rotate-45">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className={`relative flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                location.pathname === '/marketplace'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-green-600'
              }`}>
                <Package className="w-5 h-5" />
                <span>Trading</span>
                {location.pathname === '/marketplace' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </Link>
            
            {/* Live Prices Tab */}
            <Link
              to="/marketplace/prices"
              className={`flex-1 relative overflow-hidden ${
                location.pathname === '/marketplace/prices'
                  ? 'shadow-lg'
                  : 'hover:bg-pink-50'
              }`}
            >
              {/* Background with watermarks */}
              <div className={`absolute inset-0 ${
                location.pathname === '/marketplace/prices'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700'
                  : 'bg-white'
              }`}>
                {/* Watermarks */}
                {location.pathname === '/marketplace/prices' && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1 left-4 transform rotate-12">
                      <LineChart className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-1 right-4 transform -rotate-12">
                      <Scale className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-2 right-1/3 transform rotate-45">
                      <LineChart className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className={`relative flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                location.pathname === '/marketplace/prices'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}>
                <LineChart className="w-5 h-5" />
                <span>Live Prices</span>
                {location.pathname === '/marketplace/prices' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </Link>
            
            {/* Materials Tab */}
            <Link
              to="/marketplace/materials"
              className={`flex-1 relative overflow-hidden ${
                location.pathname === '/marketplace/materials'
                  ? 'shadow-lg'
                  : 'hover:bg-pink-50'
              }`}
            >
              {/* Background with watermarks */}
              <div className={`absolute inset-0 ${
                location.pathname === '/marketplace/materials'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700'
                  : 'bg-white'
              }`}>
                {/* Watermarks */}
                {location.pathname === '/marketplace/materials' && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1 left-4 transform rotate-12">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-1 right-4 transform -rotate-12">
                      <Cog className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-2 right-1/3 transform rotate-45">
                      <Wrench className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className={`relative flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                location.pathname === '/marketplace/materials'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-amber-600'
              }`}>
                <Package className="w-5 h-5" />
                <span>Materials</span>
                {location.pathname === '/marketplace/materials' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </Link>
            
            {/* Recyclers Tab */}
            <Link
              to="/marketplace/recyclers"
              className={`flex-1 relative overflow-hidden rounded-tr-xl rounded-tl-xl ${
                location.pathname === '/marketplace/recyclers'
                  ? 'shadow-lg'
                  : 'hover:bg-pink-50'
              }`}
            >
              {/* Background with watermarks */}
              <div className={`absolute inset-0 ${
                location.pathname === '/marketplace/recyclers'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700'
                  : 'bg-white'
              }`}>
                {/* Watermarks */}
                {location.pathname === '/marketplace/recyclers' && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1 left-4 transform rotate-12">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-1 right-4 transform -rotate-12">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-2 right-1/3 transform rotate-45">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className={`relative flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                location.pathname === '/marketplace/recyclers'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-purple-600'
              }`}>
                <Users className="w-5 h-5" />
                <span>Recyclers</span>
                {location.pathname === '/marketplace/recyclers' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </Link>
          </div>

          {/* Mobile Navigation - Fixed to prevent dropdown interference */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-px bg-gray-100">
              <Link
                to="/marketplace"
                className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                  location.pathname === '/marketplace'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                    : 'bg-white text-gray-600 hover:text-green-600'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Trading</span>
              </Link>
              <Link
                to="/marketplace/prices"
                className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                  location.pathname === '/marketplace/prices'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                    : 'bg-white text-gray-600 hover:text-blue-600'
                }`}
              >
                <LineChart className="w-4 h-4" />
                <span>Prices</span>
              </Link>
              <Link
                to="/marketplace/materials"
                className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                  location.pathname === '/marketplace/materials'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                    : 'bg-white text-gray-600 hover:text-amber-600'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Materials</span>
              </Link>
              <Link
                to="/marketplace/recyclers"
                className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                  location.pathname === '/marketplace/recyclers'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                    : 'bg-white text-gray-600 hover:text-purple-600'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Recyclers</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Show main marketplace content only on the main page */}
        {isMainMarketplacePage ? (
          <>
            {/* Recycle Under Us Section with GREEN and BLACK gradient + Industrial Watermarks */}
            <div className="relative bg-gradient-to-r from-black via-gray-900 to-green-600 rounded-lg overflow-hidden mb-12">
              {/* Industrial watermarks background for RecycleMart */}
              <div className="absolute inset-0 opacity-5">
                {/* Recycling symbol watermarks */}
                <div className="absolute top-8 left-12 transform rotate-15">
                  <Recycle className="w-24 h-24 text-white" />
                </div>
                <div className="absolute top-32 right-20 transform -rotate-20">
                  <Recycle className="w-32 h-32 text-white" />
                </div>
                <div className="absolute bottom-20 left-1/4 transform rotate-45">
                  <Recycle className="w-20 h-20 text-white" />
                </div>
                <div className="absolute top-1/2 right-1/3 transform -rotate-30">
                  <Recycle className="w-28 h-28 text-white" />
                </div>
                
                {/* Container/bin watermarks */}
                <div className="absolute top-16 left-1/3 transform -rotate-40">
                  <Package className="w-26 h-26 text-white" />
                </div>
                <div className="absolute bottom-32 right-1/4 transform rotate-15">
                  <Package className="w-36 h-36 text-white" />
                </div>
                <div className="absolute top-2/3 left-16 transform -rotate-10">
                  <Package className="w-24 h-24 text-white" />
                </div>
                <div className="absolute bottom-12 right-12 transform rotate-50">
                  <Package className="w-20 h-20 text-white" />
                </div>
                
                {/* Truck/collection watermarks */}
                <div className="absolute top-24 right-1/5 transform rotate-25">
                  <Truck className="w-22 h-22 text-white" />
                </div>
                <div className="absolute bottom-40 left-1/2 transform -rotate-35">
                  <Truck className="w-30 h-30 text-white" />
                </div>
                <div className="absolute top-1/3 right-8 transform rotate-65">
                  <Truck className="w-18 h-18 text-white" />
                </div>
                
                {/* Scale/weighing watermarks */}
                <div className="absolute top-40 left-2/3 transform -rotate-25">
                  <Scale className="w-20 h-20 text-white" />
                </div>
                <div className="absolute bottom-24 left-1/5 transform rotate-40">
                  <Scale className="w-16 h-16 text-white" />
                </div>
                <div className="absolute top-1/5 right-2/3 transform -rotate-55">
                  <Scale className="w-24 h-24 text-white" />
                </div>
                
                {/* Additional recycling elements */}
                <div className="absolute top-12 left-2/3 transform -rotate-12">
                  <Recycle className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-16 left-20 transform rotate-70">
                  <Package className="w-14 h-14 text-white" />
                </div>
                <div className="absolute top-2/5 right-1/2 transform -rotate-45">
                  <Truck className="w-18 h-18 text-white" />
                </div>
                <div className="absolute bottom-1/3 right-1/5 transform rotate-30">
                  <Scale className="w-22 h-22 text-white" />
                </div>
                <div className="absolute top-3/4 left-8 transform -rotate-20">
                  <Recycle className="w-26 h-26 text-white" />
                </div>
              </div>

              <div className="relative p-8 text-white">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Recycle Under Us</h2>
                  <p className="text-lg opacity-90">
                    Get free containers, store your recyclables, and we'll collect when you're ready. 
                    Earn competitive rates for your materials.
                  </p>
                </div>
                
                {/* Container Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {containerOptions.map((container) => (
                    <div key={container.type} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
                      <img
                        src={container.image}
                        alt={container.type}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-semibold mb-2">{container.type}</h3>
                      <p className="text-sm opacity-90 mb-2">Capacity: {container.capacity}</p>
                      <p className="text-sm opacity-90 mb-4">{container.description}</p>
                      <p className="text-lg font-bold text-green-400">{container.price}</p>
                    </div>
                  ))}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {features.map((feature) => (
                    <div key={feature.title} className="text-center">
                      <feature.icon className="w-8 h-8 mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm opacity-90">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="text-center mt-8">
                  <button 
                    onClick={() => setShowRequestForm(true)}
                    className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                  >
                    Request Containers
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-8">
                {error}
              </div>
            )}

            {/* Marketplace Listings */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Marketplace Listings</h2>
              
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
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
                  <p className="text-gray-600 mb-6">Be the first to post a recycling listing!</p>
                  {user && (
                    <button
                      onClick={() => setShowCreateListing(true)}
                      className="bg-[#FF3B81] text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
                    >
                      Create First Listing
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map(listing => (
                    <div key={listing.id} className="relative">
                      <ListingCard
                        id={listing.id}
                        title={listing.title}
                        description={listing.description || ''}
                        image={listing.images?.[0] || 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg'}
                        price={listing.price}
                        location={listing.location}
                        seller={{
                          name: formatSellerName(listing),
                          rating: 4.5, // This should come from a ratings system
                          verified: true // This should be based on verification status
                        }}
                        type="recycle"
                        onBidPlaced={fetchListings}
                      />
                      {/* Show agent assistant for user's own listings */}
                      {user && listing.user_id === user.id && (
                        <button
                          onClick={() => setSelectedListingForAgent(listing.id)}
                          className="absolute top-2 right-2 bg-pink-500 text-white p-2 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
                          title="Chat with your sales agent"
                        >
                          <Users className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          /* For all other marketplace pages (prices, materials, recyclers), show the outlet content */
          <div>
            {/* Back button for sub-pages */}
            <div className="mb-6">
              <Link 
                to="/marketplace" 
                className="inline-flex items-center gap-2 text-[#FF3B81] hover:text-pink-700 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to RecycleMart</span>
              </Link>
            </div>
            <Outlet />
          </div>
        )}
      </div>

      {/* Container Request Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Request Containers</h3>
              <form onSubmit={handleContainerRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B81] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B81] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B81] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B81] focus:border-transparent"
                    rows={3}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Container Type *
                  </label>
                  <select 
                    name="container_type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B81] focus:border-transparent" 
                    required
                  >
                    <option value="">Select a container type</option>
                    <option value="100L Bags">100L Bags</option>
                    <option value="240L Bins">240L Bins</option>
                    <option value="6m³ Skips">6m³ Skips</option>
                    <option value="12m³ Skips">12m³ Skips</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B81] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B81] focus:border-transparent"
                    rows={2}
                    placeholder="Any special requirements or notes..."
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#FF3B81] text-white rounded-lg hover:bg-pink-600"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Listing Modal */}
      {showCreateListing && (
        <CreateListing
          type="recycle"
          onClose={() => setShowCreateListing(false)}
          onSuccess={handleCreateListingSuccess}
        />
      )}

      {/* Agent Assistant */}
      {selectedListingForAgent && (
        <AgentAssistant
          listingId={selectedListingForAgent}
          onClose={() => setSelectedListingForAgent(null)}
        />
      )}
    </div>
  );
};

export default Marketplace;