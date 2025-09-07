import React from 'react';
import Layout from '@/components/layout/Layout';
import { Award, Users, Globe, Heart, Shield, Truck } from 'lucide-react';
import Link from 'next/link';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About PerfumeLux
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are passionate about bringing the world’s finest fragrances to discerning customers 
              who appreciate luxury, quality, and the art of perfumery.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To curate and deliver the most exceptional fragrances from renowned luxury brands, 
                providing our customers with an unparalleled shopping experience and access to 
                scents that define elegance and sophistication.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the premier destination for luxury fragrances, known for our expertise, 
                authenticity, and commitment to helping customers discover their signature scent.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600">
                  We maintain the highest standards in everything we do, from product selection to customer service.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Passion</h3>
                <p className="text-gray-600">
                  Our love for fragrances drives us to continuously discover and share the best scents with our customers.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Authenticity</h3>
                <p className="text-gray-600">
                  We guarantee that every product we sell is authentic and sourced directly from authorized distributors.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Focus</h3>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do, and we strive to exceed their expectations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Reach</h3>
                <p className="text-gray-600">
                  We bring fragrances from around the world, celebrating the diversity and artistry of global perfumery.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <Truck className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliability</h3>
                <p className="text-gray-600">
                  We ensure timely delivery and provide exceptional support throughout your shopping journey.
                </p>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="bg-white p-8 rounded-lg shadow-sm mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Story</h2>
            <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed space-y-4">
              <p>
                PerfumeLux was founded with a simple yet powerful vision: to make the world’s most 
                prestigious fragrances accessible to discerning customers who appreciate the art of perfumery. 
                What began as a small boutique has grown into a trusted destination for luxury fragrances.
              </p>
              
              <p>
                Our journey started when our founder, a passionate fragrance enthusiast, realized that 
                many people were missing out on experiencing truly exceptional scents due to limited 
                access or lack of guidance. This inspired the creation of PerfumeLux, where expertise 
                meets accessibility.
              </p>
              
              <p>
                Today, we continue to build relationships with the world’s most respected fragrance 
                houses, ensuring that our customers have access to authentic, high-quality products. 
                Our team of fragrance experts is dedicated to helping you discover scents that resonate 
                with your personality and lifestyle.
              </p>
              
              <p>
                We believe that a great fragrance has the power to transform not just how you smell, 
                but how you feel. It’s an invisible accessory that speaks volumes about your taste, 
                confidence, and appreciation for the finer things in life.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Luxury Brands</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Fragrances</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Discover Your Signature Scent?
            </h2>
            <p className="text-gray-600 mb-6">
              Explore our collection and find the perfect fragrance that speaks to you.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
