import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star, MapPin } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TrendingListing {
  id: string;
  type: 'recycle' | 'salvage';
  title: string;
  description: string;
  image: string;
  price: number;
  location: string;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  daysRemaining: number;
}

const trendingListings: TrendingListing[] = [
  {
    id: '1',
    type: 'recycle',
    title: 'Premium Copper Wire - 2 Tons',
    description: 'High-grade copper wire, stripped and sorted. Ideal for recycling.',
    image: 'https://cdn.pixabay.com/photo/2013/05/31/19/30/plastic-bottles-115069_1280.jpg',
    price: 85000,
    location: 'Cape Town, Western Cape',
    seller: {
      name: 'Cape Metal Recyclers',
      rating: 4.9,
      verified: true
    },
    daysRemaining: 8
  },
  {
    id: '2',
    type: 'salvage',
    title: '2020 Volvo FH16 for Parts',
    description: 'Complete truck available for stripping. All parts in excellent condition.',
    image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg',
    price: 450000,
    location: 'Johannesburg, Gauteng',
    seller: {
      name: 'Truck Salvage Pro',
      rating: 4.8,
      verified: true
    },
    daysRemaining: 6
  },
  {
    id: '3',
    type: 'recycle',
    title: 'Industrial Aluminum Scrap - 5 Tons',
    description: 'Clean industrial aluminum scrap, sorted and ready for processing.',
    image: 'https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg',
    price: 125000,
    location: 'Durban, KwaZulu-Natal',
    seller: {
      name: 'Durban Metal Hub',
      rating: 4.7,
      verified: true
    },
    daysRemaining: 9
  }
];

const TrendingListings = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Trending</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {trendingListings.map((listing) => (
            <SwiperSlide key={listing.id}>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      listing.type === 'recycle'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {listing.type === 'recycle' ? 'RecycleMart' : 'SalvageHub'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{listing.description}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {listing.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-semibold">R {listing.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{listing.seller.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500">{listing.daysRemaining} days left</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TrendingListings;