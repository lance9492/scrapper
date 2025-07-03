import React from 'react';
import { Clipboard, Truck, CreditCard, UserCheck } from 'lucide-react';

const steps = [
  {
    icon: UserCheck,
    title: 'Create an Account',
    description: 'Register as an individual or business. Verify your identity and complete your profile.',
    details: [
      'Choose between individual or business account',
      'Provide required documentation',
      'Complete verification process',
      'Set up your trading preferences'
    ]
  },
  {
    icon: Clipboard,
    title: 'List or Browse',
    description: 'Post your materials for sale or browse available listings.',
    details: [
      'Create detailed listings with photos',
      'Set competitive prices',
      'Browse available materials',
      'Filter by location and material type'
    ]
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Use our secure payment system for all transactions.',
    details: [
      'Multiple payment options',
      'Escrow service available',
      'Transparent pricing',
      'Payment protection'
    ]
  },
  {
    icon: Truck,
    title: 'Collection & Delivery',
    description: 'Arrange transport or collection of materials.',
    details: [
      'Coordinate pickup times',
      'Track deliveries',
      'Verify material quality',
      'Complete transaction'
    ]
  }
];

const HowItWorks = () => {
  return (
    <div className="pt-24 pb-8"> {/* Added pt-24 for navbar spacing */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold mb-4">How Scrapper Works</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to buy and sell recyclable materials. Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-purple-800 text-white rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="mb-4 pt-2">
                  <step.icon className="w-8 h-8 text-purple-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="text-sm text-gray-500 flex items-center">
                      <span className="w-1.5 h-1.5 bg-purple-800 rounded-full mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">How much does it cost to use Scrapper?</h3>
              <p className="text-gray-600">
                Creating an account is free. Sellers pay R10 per listing, and a small commission is charged on successful transactions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How are payments handled?</h3>
              <p className="text-gray-600">
                We offer secure payment processing through our platform, including bank transfers and escrow services for large transactions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my information secure?</h3>
              <p className="text-gray-600">
                Yes, we use industry-standard security measures to protect your data and verify all users before they can trade.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What materials can I trade?</h3>
              <p className="text-gray-600">
                You can trade various recyclable materials including metals, plastics, paper, and industrial materials. Check our materials guide for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;