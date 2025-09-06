'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { 
  User, 
  Package, 
  Heart, 
  ShoppingCart, 
  Settings, 
  MapPin, 
  CreditCard,
  Star,
  TrendingUp,
  Calendar,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import OrderStatus from '@/components/orders/OrderStatus';
import { formatPrice } from '@/lib/utils';

// Mock data
const mockStats = {
  totalOrders: 12,
  totalSpent: 2499.99,
  wishlistItems: 8,
  reviews: 5
};

const mockRecentOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered' as const,
    total: 299.99,
    productName: 'Chanel No. 5'
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'shipped' as const,
    total: 189.99,
    productName: 'Dior Sauvage'
  }
];

const mockRecentActivity = [
  {
    type: 'order',
    message: 'Order ORD-001 delivered',
    date: '2024-01-15',
    icon: Package
  },
  {
    type: 'wishlist',
    message: 'Added Tom Ford Tobacco Vanille to wishlist',
    date: '2024-01-14',
    icon: Heart
  },
  {
    type: 'review',
    message: 'Left a 5-star review for Chanel No. 5',
    date: '2024-01-13',
    icon: Star
  }
];

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const user = useAppSelector(state => state.auth.user);

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access your dashboard</h1>
            <p className="text-gray-600 mb-6">You need to be signed in to view your account dashboard.</p>
            <Link href="/auth/signin"><Button>Sign In</Button></Link>
          </div>
        </div>
      </Layout>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalOrders}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(mockStats.totalSpent)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.wishlistItems}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.reviews}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <Star className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/products">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
              <ShoppingCart className="w-6 h-6 mb-2 text-primary-600" />
              <span className="text-sm">Shop Now</span>
            </Button>
          </Link>
          
          <Link href="/orders">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
              <Package className="w-6 h-6 mb-2 text-blue-600" />
              <span className="text-sm">View Orders</span>
            </Button>
          </Link>
          
          <Link href="/wishlist">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
              <Heart className="w-6 h-6 mb-2 text-red-600" />
              <span className="text-sm">Wishlist</span>
            </Button>
          </Link>
          
          <Link href="/profile">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
              <Settings className="w-6 h-6 mb-2 text-gray-600" />
              <span className="text-sm">Settings</span>
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent Orders & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link href="/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-3">
            {mockRecentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.productName}</p>
                  <p className="text-sm text-gray-500">{order.id} • {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{formatPrice(order.total)}</p>
                  <OrderStatus status={order.status} compact showLabels={false} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          
          <div className="space-y-3">
            {mockRecentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-primary-100 rounded-full">
                    <Icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'orders':
        return (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">View All Orders</h3>
            <p className="text-gray-600 mb-6">Manage and track all your orders in one place.</p>
            <Link href="/orders"><Button>View Orders</Button></Link>
          </div>
        );
      case 'wishlist':
        return (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your Wishlist</h3>
            <p className="text-gray-600 mb-6">Save your favorite products for later.</p>
            <Link href="/wishlist"><Button>View Wishlist</Button></Link>
          </div>
        );
      case 'profile':
        return (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Settings</h3>
            <p className="text-gray-600 mb-6">Update your personal information and preferences.</p>
            <Link href="/profile"><Button>Edit Profile</Button></Link>
          </div>
        );
      case 'addresses':
        return (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Addresses</h3>
            <p className="text-gray-600 mb-6">Add and manage your delivery addresses.</p>
            <Link href="/profile"><Button>Manage Addresses</Button></Link>
          </div>
        );
      case 'payment':
        return (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Methods</h3>
            <p className="text-gray-600 mb-6">Manage your saved payment methods.</p>
            <Link href="/profile"><Button>Manage Payments</Button></Link>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Manage your account, track orders, and view your activity</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 inline mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </Layout>
  );
};

export default DashboardPage;
