'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { MapPin, Plus, Edit, Trash2, Home, Building, Map } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import AddressForm, { Address } from '@/components/forms/AddressForm';
import { Address as AddressType } from '@/components/forms/AddressForm';

// Mock addresses data
const mockAddresses: AddressType[] = [
  {
    id: '1',
    type: 'home',
    firstName: 'John',
    lastName: 'Doe',
    company: '',
    addressLine1: '123 Main Street',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US',
    phone: '+1 (555) 123-4567',
    isDefault: true
  },
  {
    id: '2',
    type: 'work',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Tech Corp',
    addressLine1: '456 Business Ave',
    addressLine2: 'Suite 200',
    city: 'New York',
    state: 'NY',
    postalCode: '10002',
    country: 'US',
    phone: '+1 (555) 987-6543',
    isDefault: false
  }
];

const AddressesPage: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressType[]>(mockAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState<AddressType | null>(null);

  const user = useAppSelector(state => state.auth.user);

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to manage addresses</h1>
            <p className="text-gray-600 mb-6">You need to be signed in to manage your delivery addresses.</p>
            <Button href="/auth/signin">Sign In</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (address: AddressType) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDeleteAddress = (address: AddressType) => {
    setDeletingAddress(address);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAddress = (address: AddressType) => {
    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id ? address : addr
      ));
    } else {
      // Add new address
      const newAddress = {
        ...address,
        id: Date.now().toString()
      };
      setAddresses(prev => [...prev, newAddress]);
    }
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const confirmDeleteAddress = () => {
    if (deletingAddress) {
      setAddresses(prev => prev.filter(addr => addr.id !== deletingAddress.id));
      setIsDeleteModalOpen(false);
      setDeletingAddress(null);
    }
  };

  const setDefaultAddress = (addressId: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'work':
        return <Building className="w-5 h-5" />;
      default:
        return <Map className="w-5 h-5" />;
    }
  };

  const getAddressTypeLabel = (type: string) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Work';
      default:
        return 'Other';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <MapPin className="w-8 h-8 mr-3 text-primary-600" />
            My Addresses
          </h1>
          <p className="text-gray-600">Manage your delivery addresses for faster checkout</p>
        </div>

        {/* Add Address Button */}
        <div className="mb-6">
          <Button onClick={handleAddAddress} className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add New Address
          </Button>
        </div>

        {/* Addresses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card key={address.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-full">
                    {getAddressIcon(address.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {getAddressTypeLabel(address.type)} Address
                    </h3>
                    {address.isDefault && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditAddress(address)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteAddress(address)}
                    className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-900">
                  {address.firstName} {address.lastName}
                </p>
                {address.company && (
                  <p className="text-gray-600">{address.company}</p>
                )}
                <p className="text-gray-600">{address.addressLine1}</p>
                {address.addressLine2 && (
                  <p className="text-gray-600">{address.addressLine2}</p>
                )}
                <p className="text-gray-600">
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p className="text-gray-600">{address.country}</p>
                <p className="text-gray-600">{address.phone}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDefaultAddress(address.id!)}
                    className="w-full"
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {addresses.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses yet</h3>
            <p className="text-gray-600 mb-6">Add your first delivery address to get started.</p>
            <Button onClick={handleAddAddress}>Add Address</Button>
          </div>
        )}

        {/* Add/Edit Address Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAddress(null);
          }}
          title={editingAddress ? 'Edit Address' : 'Add New Address'}
        >
          <AddressForm
            address={editingAddress || {
              type: 'home',
              firstName: '',
              lastName: '',
              company: '',
              addressLine1: '',
              addressLine2: '',
              city: '',
              state: '',
              postalCode: '',
              country: 'US',
              phone: ''
            }}
            onChange={handleSaveAddress}
            title=""
            showType={true}
          />
          
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingAddress(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => handleSaveAddress(editingAddress || {
              type: 'home',
              firstName: '',
              lastName: '',
              company: '',
              addressLine1: '',
              addressLine2: '',
              city: '',
              state: '',
              postalCode: '',
              country: 'US',
              phone: ''
            })}>
              {editingAddress ? 'Update Address' : 'Add Address'}
            </Button>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingAddress(null);
          }}
          title="Delete Address"
        >
          <div className="text-center py-6">
            <Trash2 className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Are you sure?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. The address will be permanently deleted.
            </p>
            
            <div className="flex justify-center space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingAddress(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDeleteAddress}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Address
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default AddressesPage;
