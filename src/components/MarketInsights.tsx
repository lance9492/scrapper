import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import TrendingListings from './TrendingListings';

interface TopBuyer {
  rank: number;
  name: string;
  province: string;
  rating: number;
}

const topBuyers: TopBuyer[] = [
  { rank: 1, name: 'Metro Recyclers', province: 'Gauteng', rating: 4.9 },
  { rank: 2, name: 'SA Metals', province: 'Western Cape', rating: 4.8 },
  { rank: 3, name: 'Cape Scrap', province: 'Western Cape', rating: 4.7 }
];

interface PollOption {
  text: string;
  percentage: number;
}

const pollOptions: PollOption[] = [
  { text: 'Prices will rise', percentage: 45 },
  { text: 'Prices will stay stable', percentage: 35 },
  { text: 'Prices will fall', percentage: 20 }
];

export const MarketInsights = () => {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleVote = (index: number) => {
    if (!voted) {
      setSelectedOption(index);
    }
  };

  const submitVote = () => {
    if (selectedOption !== null && !voted) {
      setVoted(true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 py-12">
        {/* Top Buyers Card */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-[#FF3B81]" />
            <h2 className="text-xl font-semibold text-gray-900">Top Buyers This Month</h2>
          </div>
          <div className="space-y-4">
            {topBuyers.map((buyer) => (
              <div 
                key={buyer.rank}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#FF3B81] font-bold">#{buyer.rank}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{buyer.name}</h3>
                    <p className="text-sm text-gray-500">{buyer.province}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-900">{buyer.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Sentiment Poll */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Market Sentiment</h2>
          <p className="text-gray-600 mb-6">
            How do you expect scrap metal prices to move in the next month?
          </p>
          <div className="space-y-4">
            {pollOptions.map((option, index) => (
              <div 
                key={option.text} 
                className={`cursor-pointer transition-all duration-200 ${
                  !voted && 'hover:scale-[1.01]'
                }`}
                onClick={() => handleVote(index)}
              >
                <div className="flex justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedOption === index 
                        ? 'border-[#FF3B81] bg-[#FF3B81]' 
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === index && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                      )}
                    </div>
                    <span className={`font-medium ${
                      selectedOption === index ? 'text-[#FF3B81]' : 'text-gray-900'
                    }`}>
                      {option.text}
                    </span>
                  </div>
                  <span className="text-gray-500">{option.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      voted ? 'bg-[#FF3B81]' : 
                      selectedOption === index ? 'bg-[#FF3B81] bg-opacity-50' : 'bg-[#FF3B81] bg-opacity-20'
                    }`}
                    style={{ 
                      width: `${voted ? option.percentage : selectedOption === index ? '100%' : '0%'}%`,
                      transition: 'width 0.5s ease-in-out'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={submitVote}
            disabled={voted || selectedOption === null}
            className={`w-full mt-6 py-2 rounded-lg text-white transition-colors ${
              voted 
                ? 'bg-gray-400 cursor-not-allowed' 
                : selectedOption !== null
                  ? 'bg-[#FF3B81] hover:bg-opacity-90'
                  : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {voted ? 'Vote Submitted' : 'Cast Your Vote'}
          </button>
        </div>
      </div>

      {/* Trending Listings Section */}
      <TrendingListings />
    </>
  );
};