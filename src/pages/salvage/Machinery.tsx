import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const machineryListings = [
  {
    id: '1',
    title: '2018 CAT 320 Excavator',
    description: 'Well-maintained excavator with 5000 hours. Full service history available.',
    image: 'https://images.pexels.com/photos/2058131/pexels-photo-2058131.jpeg',
    price: 850000,
    location: 'Johannesburg, Gauteng',
    condition: 'Used - Excellent',
    hours: 5000,
    seller: {
      name: 'Heavy Equipment Solutions',
      rating: 4.9,
      verified: true
    }
  },
  // Add more machinery listings here
];

const Machinery = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Machinery Listings</h1>
        <Link
          to="/salvage"
          className="text-[#FF3B81] hover:text-pink-700"
        >
          ← Back to SalvageHub
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {machineryListings.map((machine) => (
          <div key={machine.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={machine.image}
              alt={machine.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{machine.title}</h3>
                  <p className="text-gray-600">{machine.description}</p>
                </div>
                {machine.seller.verified && (
                  <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded">
                    Verified Seller
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold">R {machine.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hours</p>
                  <p className="font-semibold">{machine.hours}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{machine.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>{machine.seller.rating}</span>
                  <span className="ml-2 text-gray-500">{machine.seller.name}</span>
                </div>
              </div>
              <button className="w-full bg-[#FF3B81] text-white py-2 rounded-lg hover:bg-pink-600 transition">
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Machinery;