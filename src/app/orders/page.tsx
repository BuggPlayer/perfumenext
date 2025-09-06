'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Package, Search, Filter, Eye } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import OrderStatus from '@/components/orders/OrderStatus';
import OrderSummary from '@/components/orders/OrderSummary';
import { formatPrice } from '@/lib/utils';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered' as const,
    total: 299.99,
    items: [
      {
        product: {
          id: '1',
          name: 'Chanel No. 5',
          brand: 'Chanel',
          price: 299.99,
          images: ['/images/products/chanel-no5-1.jpg'],
          size: '100ml'
        },
        quantity: 1,
        price: 299.99
      }
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      addressLine1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US'
    },
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'shipped' as const,
    total: 189.99,
    items: [
      {
        product: {
          id: '2',
          name: 'Dior Sauvage',
          brand: 'Dior',
          price: 189.99,
          images: ['/images/products/dior-sauvage-1.jpg'],
          size: '100ml'
        },
        quantity: 1,
        price: 189.99
      }
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      addressLine1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US'
    },
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-003',
    date: '2024-01-05',
    status: 'processing' as const,
    total: 159.99,
    items: [
      {
        product: {
          id: '3',
          name: 'Tom Ford Tobacco Vanille',
          brand: 'Tom Ford',
          price: 159.99,
          images: ['/images/products/tom-ford-tobacco-1.jpg'],
          size: '50ml'
        },
        quantity: 1,
        price: 159.99
      }
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      addressLine1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US'
    }
  }
];

const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const user = useAppSelector(state => state.auth.user);

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your orders</h1>
            <p className="text-gray-600 mb-6">You need to be signed in to access your order history.</p>
            <Button href="/auth/signin">Sign In</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => 
                           item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.product.brand.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOrderClick = (orderId: string) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Package className="w-8 h-8 mr-3 text-primary-600" />
            My Orders
          </h1>
          <p className="text-gray-600">Track your orders and view order history</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                label="Search Orders"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by order ID, product name, or brand..."
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="w-full md:w-48">
              <Select
                label="Status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: 'all', label: 'All Orders' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'confirmed', label: 'Confirmed' },
                  { value: 'processing', label: 'Processing' },
                  { value: 'shipped', label: 'Shipped' },
                  { value: 'delivered', label: 'Delivered' },
                  { value: 'cancelled', label: 'Cancelled' }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'You haven\'t placed any orders yet'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button href="/products">Start Shopping</Button>
              )}
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        <p>Order ID: <span className="font-medium text-gray-900">{order.id}</span></p>
                        <p>Placed: <span className="font-medium text-gray-900">
                          {new Date(order.date).toLocaleDateString()}
                        </span></p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(order.total)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOrderClick(order.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {selectedOrder === order.id ? 'Hide' : 'View'} Details
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                {selectedOrder === order.id && (
                  <div className="p-4 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Order Status */}
                      <div>
                        <OrderStatus status={order.status} />
                      </div>

                      {/* Order Summary */}
                      <div>
                        <OrderSummary
                          items={order.items}
                          subtotal={order.total * 0.9}
                          shipping={order.total * 0.05}
                          tax={order.total * 0.05}
                          total={order.total}
                          compact
                        />
                      </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Shipping Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Name</p>
                          <p className="font-medium text-gray-900">
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Address</p>
                          <p className="font-medium text-gray-900">
                            {order.shippingAddress.addressLine1}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                          </p>
                        </div>
                        {order.trackingNumber && (
                          <div>
                            <p className="text-gray-600">Tracking Number</p>
                            <p className="font-medium text-gray-900">{order.trackingNumber}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;
