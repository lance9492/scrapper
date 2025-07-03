import React from 'react';

const Terms = () => {
  return (
    <div className="pt-24 pb-8"> {/* Added pt-24 for navbar spacing */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              These Terms of Service govern your use of Scrapper's platform and services. By accessing or using our services, you agree to be bound by these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <p className="text-gray-600 mb-4">
              To use our services, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Trading Rules</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>All users must comply with local and national regulations regarding scrap metal trading</li>
              <li>Users must provide accurate information about materials being traded</li>
              <li>Payment terms must be clearly stated and agreed upon before transaction</li>
              <li>Prohibited materials must not be listed or traded on the platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Fees and Payments</h2>
            <p className="text-gray-600 mb-4">
              Listing fees, commission rates, and payment terms are subject to change. Current fees will always be displayed on the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
            <p className="text-gray-600 mb-4">
              Users may not engage in fraudulent activities, misrepresent materials, or attempt to circumvent platform fees.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Dispute Resolution</h2>
            <p className="text-gray-600 mb-4">
              All disputes between users should first be attempted to be resolved through our platform's dispute resolution system.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to terminate or suspend accounts that violate these terms or engage in fraudulent activities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of new terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;