import React from 'react';
import { Shield, Users, Scale, Truck, Target, Globe, Leaf, Recycle, Package, Settings, Cog, Wrench, PenTool as Tool, Zap, Sparkles, CheckCircle, Heart, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 pb-8"> {/* Added pt-24 for navbar spacing */}
      {/* Pink & Black 2-tone background with watermarks */}
      <div className="relative overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-pink-600 opacity-90"></div>
        
        {/* Watermarks - Industrial & Recycling Theme */}
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
          
          {/* Container/packaging watermarks */}
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
          
          {/* Truck/logistics watermarks */}
          <div className="absolute top-24 right-1/5 transform rotate-25">
            <Truck className="w-22 h-22 text-white" />
          </div>
          <div className="absolute bottom-40 left-1/2 transform -rotate-35">
            <Truck className="w-30 h-30 text-white" />
          </div>
          <div className="absolute top-1/3 right-8 transform rotate-65">
            <Truck className="w-18 h-18 text-white" />
          </div>
          
          {/* Industrial machinery watermarks */}
          <div className="absolute top-40 left-2/3 transform -rotate-25">
            <Settings className="w-20 h-20 text-white" />
          </div>
          <div className="absolute bottom-24 left-1/5 transform rotate-40">
            <Cog className="w-16 h-16 text-white" />
          </div>
          <div className="absolute top-1/5 right-2/3 transform -rotate-55">
            <Wrench className="w-24 h-24 text-white" />
          </div>
          <div className="absolute bottom-1/3 right-1/5 transform rotate-30">
            <Tool className="w-22 h-22 text-white" />
          </div>
          <div className="absolute top-3/4 left-8 transform -rotate-20">
            <Zap className="w-26 h-26 text-white" />
          </div>
          
          {/* Additional scattered elements for depth */}
          <div className="absolute top-12 left-2/3 transform -rotate-12">
            <Tool className="w-16 h-16 text-white" />
          </div>
          <div className="absolute bottom-16 left-20 transform rotate-70">
            <Cog className="w-14 h-14 text-white" />
          </div>
          <div className="absolute top-2/5 right-1/2 transform -rotate-45">
            <Wrench className="w-18 h-18 text-white" />
          </div>
          <div className="absolute bottom-1/3 right-1/5 transform rotate-30">
            <Settings className="w-22 h-22 text-white" />
          </div>
          <div className="absolute top-3/4 left-8 transform -rotate-20">
            <Zap className="w-26 h-26 text-white" />
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
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Story</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-pink-400 via-pink-300 to-white mx-auto mb-8 rounded-full shadow-lg"></div>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Founded in 2025, Scrapper has revolutionized South Africa's recycling industry by creating the country's first digital marketplace for recyclable materials. Our platform connects buyers and sellers, making recycling more accessible and efficient.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 -mt-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="w-6 h-6 text-[#FF3B81]" />
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-600">
              To become Africa's leading digital platform for sustainable material trading, driving the circular economy and creating economic opportunities through innovative technology.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-[#FF3B81]" />
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              To revolutionize the recycling industry by providing a secure, efficient platform that connects buyers and sellers, promotes sustainable practices, and creates value for all stakeholders.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">10,000+</h3>
            <p className="text-gray-600">Active Traders</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">50,000+</h3>
            <p className="text-gray-600">Tons Recycled</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">9</h3>
            <p className="text-gray-600">Provinces Covered</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">75,000+</h3>
            <p className="text-gray-600">CO₂ Tons Saved</p>
          </div>
        </div>

        {/* Core Values - ENHANCED WITH BEAUTIFUL POPPING EFFECTS */}
        <div className="relative mb-16 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-2xl"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #FF3B81 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
          </div>
          
          <div className="relative p-10 rounded-2xl shadow-xl border border-pink-100">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Our Core Values</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Innovation Card */}
              <div className="group relative transform transition-all duration-300 hover:scale-105">
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 opacity-0 group-hover:opacity-100 rounded-xl blur transition-opacity duration-300"></div>
                
                {/* Card content */}
                <div className="relative bg-white rounded-xl p-6 shadow-lg border border-pink-100 group-hover:border-pink-300 transition-colors duration-300 text-center">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:to-pink-700 transition-all duration-300">Innovation</h3>
                    
                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                      We continuously innovate to make recycling more efficient and accessible through technology.
                    </p>
                    
                    {/* Animated checkmarks that appear on hover */}
                    <div className="mt-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-pink-500" />
                        <span className="text-sm text-gray-700">Cutting-edge platform</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-pink-500" />
                        <span className="text-sm text-gray-700">Real-time market data</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-pink-500" />
                        <span className="text-sm text-gray-700">Continuous improvement</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                </div>
              </div>
              
              {/* Sustainability Card */}
              <div className="group relative transform transition-all duration-300 hover:scale-105">
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-600 opacity-0 group-hover:opacity-100 rounded-xl blur transition-opacity duration-300"></div>
                
                {/* Card content */}
                <div className="relative bg-white rounded-xl p-6 shadow-lg border border-green-100 group-hover:border-green-300 transition-colors duration-300 text-center">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-teal-500 transition-all duration-300">Sustainability</h3>
                    
                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                      We're committed to promoting sustainable practices and reducing environmental impact.
                    </p>
                    
                    {/* Animated checkmarks that appear on hover */}
                    <div className="mt-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Eco-friendly operations</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Carbon footprint reduction</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Circular economy focus</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-teal-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                </div>
              </div>
              
              {/* Integrity Card */}
              <div className="group relative transform transition-all duration-300 hover:scale-105">
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-100 rounded-xl blur transition-opacity duration-300"></div>
                
                {/* Card content */}
                <div className="relative bg-white rounded-xl p-6 shadow-lg border border-blue-100 group-hover:border-blue-300 transition-colors duration-300 text-center">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300">Integrity</h3>
                    
                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                      We maintain the highest standards of transparency and ethical business practices.
                    </p>
                    
                    {/* Animated checkmarks that appear on hover */}
                    <div className="mt-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-700">Transparent operations</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-700">Honest communication</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-700">Ethical business conduct</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-indigo-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                </div>
              </div>
            </div>
            
            {/* Decorative floating elements */}
            <div className="absolute top-10 right-10 w-12 h-12 bg-pink-100 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-purple-100 rounded-full opacity-30 animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-pink-200 rounded-full opacity-20 animate-pulse delay-300"></div>
            <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-purple-200 rounded-full opacity-20 animate-pulse delay-500"></div>
            
            {/* Sparkle effects */}
            <div className="absolute top-1/4 right-1/3">
              <Sparkles className="w-6 h-6 text-pink-300 animate-pulse" />
            </div>
            <div className="absolute bottom-1/4 left-1/3">
              <Sparkles className="w-5 h-5 text-purple-300 animate-pulse delay-300" />
            </div>
          </div>
        </div>

        {/* Technology & Security - Changed to text-left for better bullet alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Technology</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></span>
                <div>
                  <h3 className="font-semibold mb-1">Real-time Market Data</h3>
                  <p className="text-gray-600">Live pricing updates and market trends</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></span>
                <div>
                  <h3 className="font-semibold mb-1">Smart Matching</h3>
                  <p className="text-gray-600">AI-powered buyer-seller matching system</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></span>
                <div>
                  <h3 className="font-semibold mb-1">Mobile Integration</h3>
                  <p className="text-gray-600">Trade on-the-go with our mobile platform</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Security & Compliance</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></span>
                <div>
                  <h3 className="font-semibold mb-1">Verified Users</h3>
                  <p className="text-gray-600">Strict verification process for all traders</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></span>
                <div>
                  <h3 className="font-semibold mb-1">Secure Transactions</h3>
                  <p className="text-gray-600">Bank-grade security for all payments</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></span>
                <div>
                  <h3 className="font-semibold mb-1">Regulatory Compliance</h3>
                  <p className="text-gray-600">Full compliance with SA recycling regulations</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;