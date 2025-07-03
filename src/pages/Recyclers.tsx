import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Globe, Search, Filter } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Map from '../components/Map';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Recycler {
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

const provinces = [
  'All Provinces',
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
  'Western Cape'
];

const materials = [
  'All Materials',
  'Ferrous Metals',
  'Non-Ferrous Metals',
  'E-Waste',
  'Paper',
  'Plastic',
  'Glass',
  'Metal Cans',
  'Industrial Waste',
  'Batteries',
  'Used Oil',
  'Electronic Waste'
];

const Recyclers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('All Provinces');
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [recyclers, setRecyclers] = useState<Recycler[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecycler, setSelectedRecycler] = useState<Recycler | null>(null);
  const [mapCenter, setMapCenter] = useState({
    lat: -30.5595,
    lng: 22.9375
  });
  const [mapZoom, setMapZoom] = useState(6);

  useEffect(() => {
    fetchRecyclers();
  }, []);

  const fetchRecyclers = async () => {
    try {
      const { data, error } = await supabase
        .from('recyclers')
        .select('*')
        .order('name');

      if (error) {
        throw error;
      }

      if (data) {
        setRecyclers(data);
      }
    } catch (error) {
      console.error('Error fetching recyclers:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasValidCoordinates = (recycler: Recycler): boolean => {
    return (
      typeof recycler.latitude === 'number' &&
      typeof recycler.longitude === 'number' &&
      !isNaN(recycler.latitude) &&
      !isNaN(recycler.longitude) &&
      recycler.latitude >= -90 &&
      recycler.latitude <= 90 &&
      recycler.longitude >= -180 &&
      recycler.longitude <= 180
    );
  };

  const filteredRecyclers = recyclers.filter(recycler => {
    const matchesSearch = recycler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recycler.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = selectedProvince === 'All Provinces' || recycler.province === selectedProvince;
    const matchesMaterial = selectedMaterial === 'All Materials' || 
      recycler.materials.some(m => m === selectedMaterial);
    return matchesSearch && matchesProvince && matchesMaterial;
  });

  const validRecyclersForMap = filteredRecyclers.filter(hasValidCoordinates);

  const handleRecyclerClick = (recycler: Recycler) => {
    if (hasValidCoordinates(recycler)) {
      setSelectedRecycler(recycler);
      setMapCenter({ lat: recycler.latitude, lng: recycler.longitude });
      setMapZoom(14);
    }
  };

  const handleMapReset = () => {
    setSelectedRecycler(null);
    setMapCenter({ lat: -30.5595, lng: 22.9375 });
    setMapZoom(6);
  };

  return (
    <div className="pt-0"> {/* Removed extra padding since Marketplace component already adds it */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Recycling Facilities</h1>
          <p className="text-gray-600">
            Find verified recycling facilities across South Africa. Filter by location and materials accepted.
          </p>
        </div>

        {/* Map Section */}
        <div className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
          <Map 
            center={mapCenter}
            zoom={mapZoom}
            markers={validRecyclersForMap.map(recycler => ({
              position: { lat: recycler.latitude, lng: recycler.longitude },
              title: recycler.name
            }))}
          />
          {selectedRecycler && (
            <div className="p-4 border-t">
              <button
                onClick={handleMapReset}
                className="text-sm text-purple-800 hover:text-purple-900"
              >
                ← View all facilities
              </button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search recyclers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            {provinces.map(province => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
          <select
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
          >
            {materials.map(material => (
              <option key={material} value={material}>{material}</option>
            ))}
          </select>
        </div>

        {/* Recyclers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-600">Loading recyclers...</p>
            </div>
          ) : filteredRecyclers.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-600">No recyclers found matching your criteria.</p>
            </div>
          ) : (
            filteredRecyclers.map((recycler) => (
              <div
                key={recycler.id}
                className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all ${
                  selectedRecycler?.id === recycler.id ? 'ring-2 ring-purple-800' : ''
                }`}
                onClick={() => handleRecyclerClick(recycler)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{recycler.name}</h3>
                    <p className="text-gray-600">{recycler.description}</p>
                  </div>
                  {recycler.verified && (
                    <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded">
                      Verified
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{recycler.address}, {recycler.city}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{recycler.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{recycler.email}</span>
                  </div>
                  {recycler.website && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <a 
                        href={recycler.website.startsWith('http') ? recycler.website : `https://${recycler.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-800 hover:text-purple-900"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {recycler.website}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {recycler.materials.map((material) => (
                    <span
                      key={material}
                      className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded"
                    >
                      {material}
                    </span>
                  ))}
                </div>

                {selectedRecycler?.id === recycler.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Operating Hours</h4>
                        <p className="text-sm text-gray-600">{recycler.operating_hours}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Minimum Weight</h4>
                        <p className="text-sm text-gray-600">{recycler.minimum_weight}kg</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm mb-1">Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {recycler.service_offerings.map((service) => (
                          <span
                            key={service}
                            className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Recyclers;