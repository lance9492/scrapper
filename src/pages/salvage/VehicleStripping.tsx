import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, PenTool as Tool, Shield, Clock } from 'lucide-react';

const strippers = [
  {
    id: '1',
    name: 'AutoStrip Pro',
    description: 'Professional vehicle stripping service with 15 years experience',
    image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg',
    location: 'Johannesburg, Gauteng',
    specialties: ['Cars', 'Trucks', 'Heavy Machinery'],
    rating: 4.8,
    verified: true,
    completedJobs: 1250,
    turnaroundTime: '24-48 hours'
  },
  // Add more stripping services here
];

const VehicleStripping = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Vehicle Stripping Services</h1>
        <Link
          to="/salvage"
          className="text-[#FF3B81] hover:text-pink-700"
        >
          ← Back to SalvageHub
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {strippers.map((stripper) => (
          <div key={stripper.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <img
                src={stripper.image}
                alt={stripper.name}
                className="w-full h-full object-cover"
              />
              <div className="col-span-2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{stripper.name}</h3>
                    <p className="text-gray-600">{stripper.description}</p>
                  </div>
                  {stripper.verified && (
                    <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded">
                      Verified Pro
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{stripper.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Turnaround: {stripper.turnaroundTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                    <span className="font-semibold">{stripper.rating}</span>
                    <span className="ml-2 text-gray-500">({stripper.completedJobs} jobs)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Tool className="w-4 h-4 mr-2" />
                    <span>{stripper.specialties.join(', ')}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-[#FF3B81] text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition">
                    Request Quote
                  </button>
                  <button className="flex-1 border border-[#FF3B81] text-[#FF3B81] py-2 px-6 rounded-lg hover:bg-pink-50 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-bold mb-6">Why Choose Our Verified Strippers?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start">
            <Shield className="w-8 h-8 text-[#FF3B81] mr-4" />
            <div>
              <h3 className="font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">
                All stripping services are verified and monitored for quality
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Tool className="w-8 h-8 text-[#FF3B81] mr-4" />
            <div>
              <h3 className="font-semibold mb-2">Professional Equipment</h3>
              <p className="text-gray-600">
                Using industry-standard tools and equipment
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="w-8 h-8 text-[#FF3B81] mr-4" />
            <div>
              <h3 className="font-semibold mb-2">Quick Turnaround</h3>
              <p className="text-gray-600">
                Fast and efficient service with clear timelines
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleStripping;