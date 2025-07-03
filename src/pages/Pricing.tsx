import React from 'react';
import { ShoppingBag, Store, Zap, Shield, TrendingUp, Package, Recycle, Settings, Cog, Wrench, PenTool as Tool, Truck, Scale, Clock } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="pt-24 pb-8"> {/* Added pt-24 for navbar spacing */}
      {/* Pink & Black 2-tone background with watermarks */}
      <div className="relative overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-gray-900 to-black opacity-90"></div>
        
        {/* Watermarks - Industrial & Recycling Theme */}
        <div className="absolute inset-0 opacity-5">
          {/* Money/pricing watermarks */}
          <div className="absolute top-8 left-12 transform rotate-15">
            <ShoppingBag className="w-24 h-24 text-white" />
          </div>
          <div className="absolute top-32 right-20 transform -rotate-20">
            <Store className="w-32 h-32 text-white" />
          </div>
          <div className="absolute bottom-20 left-1/4 transform rotate-45">
            <TrendingUp className="w-20 h-20 text-white" />
          </div>
          <div className="absolute top-1/2 right-1/3 transform -rotate-30">
            <Shield className="w-28 h-28 text-white" />
          </div>
          
          {/* Recycling watermarks */}
          <div className="absolute top-16 left-1/3 transform -rotate-40">
            <Recycle className="w-26 h-26 text-white" />
          </div>
          <div className="absolute bottom-32 right-1/4 transform rotate-15">
            <Package className="w-36 h-36 text-white" />
          </div>
          <div className="absolute top-2/3 left-16 transform -rotate-10">
            <Truck className="w-24 h-24 text-white" />
          </div>
          <div className="absolute bottom-12 right-12 transform rotate-50">
            <Scale className="w-20 h-20 text-white" />
          </div>
          
          {/* Industrial machinery watermarks */}
          <div className="absolute top-24 right-1/5 transform rotate-25">
            <Settings className="w-22 h-22 text-white" />
          </div>
          <div className="absolute bottom-40 left-1/2 transform -rotate-35">
            <Cog className="w-30 h-30 text-white" />
          </div>
          <div className="absolute top-1/3 right-8 transform rotate-65">
            <Wrench className="w-18 h-18 text-white" />
          </div>
          
          {/* Additional scattered elements for depth */}
          <div className="absolute top-40 left-2/3 transform -rotate-25">
            <Tool className="w-20 h-20 text-white" />
          </div>
          <div className="absolute bottom-24 left-1/5 transform rotate-40">
            <Clock className="w-16 h-16 text-white" />
          </div>
          <div className="absolute top-1/5 right-2/3 transform -rotate-55">
            <Zap className="w-24 h-24 text-white" />
          </div>
          <div className="absolute bottom-1/3 right-1/5 transform rotate-30">
            <Package className="w-22 h-22 text-white" />
          </div>
          <div className="absolute top-3/4 left-8 transform -rotate-20">
            <ShoppingBag className="w-26 h-26 text-white" />
          </div>
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-300/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        
        {/* Hero Section */}
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl mb-6 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500 border border-pink-400/30">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-pink-400 via-pink-300 to-white mx-auto mb-8 rounded-full shadow-lg"></div>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Whether you're buying or selling, our pricing structure is designed to be fair and straightforward.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 -mt-8">
        {/* Seller Pricing - Added mt-12 to increase spacing */}
        <div className="mb-16 mt-12">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <Store className="w-6 h-6 text-[#FF3B81]" />
            <h2 className="text-2xl font-bold">For Sellers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Single Listing */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Single Listing</h3>
                <p className="text-3xl font-bold text-[#FF3B81] mb-2">R10.00</p>
                <p className="text-gray-600">Per item listing</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Basic visibility
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  30-day listing duration
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Standard search placement
                </li>
              </ul>
            </div>

            {/* Catalogue Package */}
            <div className="bg-white rounded-lg p-6 border-2 border-[#FF3B81] relative text-center">
              <div className="absolute -top-3 right-4 bg-[#FF3B81] text-white px-3 py-1 rounded-full text-sm">
                Popular
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Catalogue Package</h3>
                <p className="text-3xl font-bold text-[#FF3B81] mb-2">R50.00</p>
                <p className="text-gray-600">For 10 item listings</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Save 50% on listings
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  45-day listing duration
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Enhanced search visibility
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Bulk upload tools
                </li>
              </ul>
            </div>

            {/* Boost Package */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Boost Package</h3>
                <p className="text-3xl font-bold text-[#FF3B81] mb-2">R20.00</p>
                <p className="text-gray-600">Per item boost</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Featured listing placement
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  7 days of premium visibility
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Priority search ranking
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Buyer Pricing */}
        <div>
          <div className="flex items-center gap-2 mb-8 justify-center">
            <ShoppingBag className="w-6 h-6 text-[#FF3B81]" />
            <h2 className="text-2xl font-bold">For Buyers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard Purchase */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Standard Purchase</h3>
                <p className="text-3xl font-bold text-[#FF3B81] mb-2">R100.00</p>
                <p className="text-gray-600">For items under R3,000</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Secure payment processing
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Basic buyer protection
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Standard support
                </li>
              </ul>
            </div>

            {/* Premium Purchase */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Premium Purchase</h3>
                <p className="text-3xl font-bold text-[#FF3B81] mb-2">R200.00</p>
                <p className="text-gray-600">For items over R3,000</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Enhanced buyer protection
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Priority support
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Quality verification service
                </li>
                <li className="flex items-center justify-center text-gray-600">
                  <span className="w-2 h-2 bg-[#FF3B81] rounded-full mr-2"></span>
                  Escrow payment protection
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <Shield className="w-8 h-8 text-[#FF3B81] mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Secure Trading</h3>
            <p className="text-gray-600">Protected payments and verified users</p>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-[#FF3B81] mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Quick Process</h3>
            <p className="text-gray-600">List and trade items efficiently</p>
          </div>
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-[#FF3B81] mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Market Insights</h3>
            <p className="text-gray-600">Access to real-time market data</p>
          </div>
          <div className="text-center">
            <Package className="w-8 h-8 text-[#FF3B81] mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Quality Control</h3>
            <p className="text-gray-600">Verified materials and sellers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;