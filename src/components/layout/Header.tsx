"use client"
import React, { useEffect, useRef, useState } from 'react';
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
    <header className="shadow-lg bg-[var(--color-dark)] text-[var(--color-light)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex mr-4 items-center space-x-2 min-w-0">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">P</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold text-primary-400 truncate">PerfumeLux</span>
          </Link>

          {/* Desktop Navigation (show from lg and up) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[var(--color-light)]/80 hover:text-primary-500 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textColor-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search fragrances..."
                className="w-full pl-10 pr-4 py-2 bg-background-secondary border border-borderColor-faded rounded-lg text-textColor-secondary placeholder:text-textColor-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 text-[var(--color-light)]/80 hover:text-primary-500 transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/checkout" className="relative p-2 text-[var(--color-light)]/80 hover:text-primary-500 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <UserMenu userName={user.name} onLogout={() => dispatch(logout())} />
            ) : (
              <Link href="/auth/signin">
                <Button variant="outline" size="sm" className="border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-black">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[var(--color-light)]/80 hover:text-primary-500 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {/* <div className="lg:hidden pb-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textColor-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search fragrances..."
              className="w-full pl-10 pr-4 py-2 bg-background-secondary border border-borderColor-faded rounded-lg text-textColor-secondary placeholder:text-textColor-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div> */}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--color-dark)] border-t border-borderColor-faded">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-[var(--color-light)]/80 hover:text-primary-500 hover:bg-[color-mix(in_oklab,var(--color-dark)_85%,#fff_15%)] rounded-md transition-colors"
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

// Client-only dropdown with click-outside and Escape handling
const UserMenu: React.FC<{ userName: string; onLogout: () => void }> = ({ userName, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <User className="w-5 h-5" />
        <span className="hidden sm:block">{userName}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
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
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

