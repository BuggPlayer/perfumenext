import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-dark)] text-[var(--color-light)]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-primary-400">PerfumeLux</span>
            </div>
            <p className="text-textColor-muted text-sm leading-relaxed">
              Discover the world’s finest fragrances from luxury brands. Find your perfect perfume and make every moment unforgettable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-textColor-muted hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-textColor-muted hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-textColor-muted hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-textColor-muted hover:text-primary-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textColor-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textColor-secondary">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textColor-secondary">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-textColor-muted hover:text-primary-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  123 Luxury Avenue<br />
                  Fashion District, NY 10001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <p className="text-gray-300 text-sm">hello@perfumelux.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-6">
              Subscribe to our newsletter for exclusive offers, new arrivals, and fragrance tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-[color-mix(in_oklab,var(--color-dark)_85%,#fff_15%)] border border-gray-700 rounded-lg text-[var(--color-light)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary-500 text-black font-medium rounded-lg hover:bg-primary-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-borderColor-faded py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-textColor-muted text-sm">
              <span>© {currentYear} PerfumeLux. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-textColor-muted hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-textColor-muted hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-textColor-muted hover:text-primary-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center space-x-2 text-textColor-muted text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for fragrance lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

