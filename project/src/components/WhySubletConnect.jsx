import React from 'react';
import { Building2, Shield, Clock } from 'lucide-react';

const WhySubletConnect = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why SubletConnect?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The trusted platform for University of Waterloo students to find and list subleases, 
            designed specifically for co-op terms and academic schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Building2 className="h-8 w-8" />}
            title="Student-Focused"
            description="Exclusively for UWaterloo students, ensuring relevant listings near campus and student hotspots."
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8" />}
            title="Co-op Term Friendly"
            description="4-month lease terms aligned with co-op schedules, making it easy to find or sublet during work terms."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Verified Listings"
            description="All listings are from verified UWaterloo students, ensuring safety and reliability."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
      <div className="inline-block p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default WhySubletConnect; 