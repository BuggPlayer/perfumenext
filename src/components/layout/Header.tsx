"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { totalItems: cartItems } = useAppSelector(state => state.cart);
  const { totalItems: wishlistItems } = useAppSelector(state => state.wishlist);
  const { user } = useAppSelector(state => state.auth);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Brands', href: '/brands' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-yellow-400">PerfumeLux</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-yellow-400 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search fragrances..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 text-gray-300 hover:text-yellow-400 transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/checkout" className="relative p-2 text-gray-300 hover:text-yellow-400 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
                           {user ? (
                 <div className="relative group">
                   <button className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors">
                     <User className="w-5 h-5" />
                     <span className="hidden sm:block">{user.name}</span>
                   </button>
                   
                   {/* User Dropdown Menu */}
                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                     <div className="py-2">
                       <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                         Dashboard
                       </Link>
                       <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                         Profile
                       </Link>
                       <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                         Orders
                       </Link>
                       <Link href="/addresses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                         Addresses
                       </Link>
                       <Link href="/payment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                         Payment Methods
                       </Link>
                       <div className="border-t border-gray-200 my-1"></div>
                       <button 
                         onClick={() => dispatch(logout())}
                         className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                       >
                         Sign Out
                       </button>
                     </div>
                   </div>
                 </div>
            ) : (
              <Link href="/auth/signin">
                <Button variant="outline" size="sm" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search fragrances..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

