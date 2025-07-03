import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const vehicleListings = [
  {
    id: '1',
    title: '2020 Volvo FH16 Truck',
    description: 'Complete truck available for stripping. All parts in excellent condition.',
    image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg',
    price: 450000,
    location: 'Johannesburg, Gauteng',
    condition: 'Used - Good',
    seller: {
      name: 'Truck Salvage Pro',
      rating: 4.8,
      verified: true
    }
  },
  // Add more vehicle listings here
];

const Vehicles = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Vehicle Listings</h1>
        <Link
          to="/salvage"
          className="text-[#FF3B81] hover:text-pink-700"
        >
          ← Back to SalvageHub
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vehicleListings.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={vehicle.image}
              alt={vehicle.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{vehicle.title}</h3>
                  <p className="text-gray-600">{vehicle.description}</p>
                </div>
                {vehicle.seller.verified && (
                  <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded">
                    Verified Seller
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold">R {vehicle.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="font-semibold">{vehicle.condition}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{vehicle.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>{vehicle.seller.rating}</span>
                  <span className="ml-2 text-gray-500">{vehicle.seller.name}</span>
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

export default Vehicles;