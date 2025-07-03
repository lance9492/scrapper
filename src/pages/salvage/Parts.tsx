import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const partsListings = [
  {
    id: '1',
    title: 'Mercedes-Benz OM 460 LA Engine',
    description: 'Complete engine assembly, low hours, perfect for rebuilding.',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
    price: 55000,
    location: 'Cape Town, Western Cape',
    condition: 'Used - Good',
    category: 'Engine Parts',
    seller: {
      name: 'Truck Parts Pro',
      rating: 4.7,
      verified: true
    }
  },
  // Add more parts listings here
];

const Parts = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Parts & Components</h1>
        <Link
          to="/salvage"
          className="text-[#FF3B81] hover:text-pink-700"
        >
          ← Back to SalvageHub
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {partsListings.map((part) => (
          <div key={part.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={part.image}
              alt={part.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{part.title}</h3>
                  <p className="text-gray-600">{part.description}</p>
                </div>
                {part.seller.verified && (
                  <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded">
                    Verified Seller
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold">R {part.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold">{part.category}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{part.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>{part.seller.rating}</span>
                  <span className="ml-2 text-gray-500">{part.seller.name}</span>
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

export default Parts;