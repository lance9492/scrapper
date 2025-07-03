import React from 'react';
import { FileText, AlertTriangle, Scale, TrendingUp } from 'lucide-react';

const MaterialsGuide = () => {
  return (
    <div className="pt-24 pb-8"> {/* Added pt-24 for navbar spacing */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold mb-4">Materials Trading Guide</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn about the different materials you can trade on our platform, including grading standards and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <FileText className="w-8 h-8 text-purple-800 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Documentation</h3>
            <p className="text-gray-600">
              Learn about required documentation for different materials and trading volumes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <AlertTriangle className="w-8 h-8 text-purple-800 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Safety Guidelines</h3>
            <p className="text-gray-600">
              Important safety information for handling and transporting materials.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <Scale className="w-8 h-8 text-purple-800 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Grading Standards</h3>
            <p className="text-gray-600">
              Understanding material grades and quality assessment criteria.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <TrendingUp className="w-8 h-8 text-purple-800 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
            <p className="text-gray-600">
              Stay updated with market trends and pricing information.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-16">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Material Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Ferrous Metals</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-purple-800 rounded-full mr-2"></span>
                    HMS 1 & 2 (Heavy Melting Steel)
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-purple-800 rounded-full mr-2"></span>
                    Cast Iron
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-purple-800 rounded-full mr-2"></span>
                    Steel Plate & Structural
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Non-Ferrous Metals</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-purple-800 rounded-full mr-2"></span>
                    Copper (Various Grades)
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-purple-800 rounded-full mr-2"></span>
                    Aluminum (Clean & Cast)
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-purple-800 rounded-full mr-2"></span>
                    Brass & Bronze
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Trading Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Quality Assessment</h3>
              <p className="text-gray-600">
                Always inspect materials thoroughly before trading. Document any quality issues with photos and detailed descriptions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Pricing Strategy</h3>
              <p className="text-gray-600">
                Research current market rates and factor in transportation costs when setting prices or making offers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-gray-600">
                Keep detailed records of all transactions, including weight tickets, quality certificates, and payment receipts.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Transportation</h3>
              <p className="text-gray-600">
                Ensure proper loading and securing of materials. Use licensed transporters and maintain proper insurance coverage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsGuide;