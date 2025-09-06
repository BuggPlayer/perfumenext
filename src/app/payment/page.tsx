'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { CreditCard, Plus, Edit, Trash2, Lock, Shield } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import Modal from '@/components/ui/Modal';
import PaymentForm, { PaymentMethod } from '@/components/forms/PaymentForm';

// Mock payment methods data
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    cardNumber: '**** **** **** 1234',
    cardholderName: 'John Doe',
    expiryMonth: '12',
    expiryYear: '2026',
    isDefault: true
  },
  {
    id: '2',
    type: 'paypal',
    isDefault: false
  }
];

const PaymentMethodsPage: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingPayment, setDeletingPayment] = useState<PaymentMethod | null>(null);

  const user = useAppSelector(state => state.auth.user);

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to manage payment methods</h1>
            <p className="text-gray-600 mb-6">You need to be signed in to manage your payment methods.</p>
            <Link href="/auth/signin"><Button>Sign In</Button></Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddPayment = () => {
    setEditingPayment(null);
    setIsModalOpen(true);
  };

  const handleEditPayment = (payment: PaymentMethod) => {
    setEditingPayment(payment);
    setIsModalOpen(true);
  };

  const handleDeletePayment = (payment: PaymentMethod) => {
    setDeletingPayment(payment);
    setIsDeleteModalOpen(true);
  };

  const handleSavePayment = (payment: PaymentMethod) => {
    if (editingPayment) {
      // Update existing payment method
      setPaymentMethods(prev => prev.map(pm => 
        pm.id === editingPayment.id ? payment : pm
      ));
    } else {
      // Add new payment method
      const newPayment = {
        ...payment,
        id: Date.now().toString()
      };
      setPaymentMethods(prev => [...prev, newPayment]);
    }
    setIsModalOpen(false);
    setEditingPayment(null);
  };

  const confirmDeletePayment = () => {
    if (deletingPayment) {
      setPaymentMethods(prev => prev.filter(pm => pm.id !== deletingPayment.id));
      setIsDeleteModalOpen(false);
      setDeletingPayment(null);
    }
  };

  const setDefaultPayment = (paymentId: string) => {
    setPaymentMethods(prev => prev.map(pm => ({
      ...pm,
      isDefault: pm.id === paymentId
    })));
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'paypal':
        return <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">P</div>;
      case 'apple-pay':
        return <div className="w-5 h-5 bg-black rounded text-white flex items-center justify-center text-xs font-bold">A</div>;
      case 'google-pay':
        return <div className="w-5 h-5 bg-gray-100 rounded text-gray-700 flex items-center justify-center text-xs font-bold">G</div>;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const getPaymentTypeLabel = (type: string) => {
    switch (type) {
      case 'card':
        return 'Credit/Debit Card';
      case 'paypal':
        return 'PayPal';
      case 'apple-pay':
        return 'Apple Pay';
      case 'google-pay':
        return 'Google Pay';
      default:
        return 'Payment Method';
    }
  };

  const maskCardNumber = (cardNumber: string) => {
    if (cardNumber.length <= 4) return cardNumber;
    return '**** **** **** ' + cardNumber.slice(-4);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <CreditCard className="w-8 h-8 mr-3 text-primary-600" />
            Payment Methods
          </h1>
          <p className="text-gray-600">Manage your payment methods for faster checkout</p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Your payment information is secure</h3>
              <p className="text-blue-700 text-sm">
                We use industry-standard encryption to protect your payment details. 
                Your card information is never stored on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Add Payment Method Button */}
        <div className="mb-6">
          <Button onClick={handleAddPayment} className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>

        {/* Payment Methods List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentMethods.map((payment) => (
            <Card key={payment.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-full">
                    {getPaymentIcon(payment.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {getPaymentTypeLabel(payment.type)}
                    </h3>
                    {payment.isDefault && (
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
                    onClick={() => handleEditPayment(payment)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePayment(payment)}
                    className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {payment.type === 'card' && (
                  <>
                    <p className="text-gray-600">Card Number</p>
                    <p className="font-medium text-gray-900 font-mono">
                      {payment.cardNumber ? maskCardNumber(payment.cardNumber) : '**** **** **** ****'}
                    </p>
                    <p className="text-gray-600">Cardholder Name</p>
                    <p className="font-medium text-gray-900">{payment.cardholderName}</p>
                    <p className="text-gray-600">Expires</p>
                    <p className="font-medium text-gray-900">
                      {payment.expiryMonth}/{payment.expiryYear}
                    </p>
                  </>
                )}
                
                {payment.type === 'paypal' && (
                  <p className="text-gray-600">You'll be redirected to PayPal during checkout</p>
                )}
                
                {payment.type === 'apple-pay' && (
                  <p className="text-gray-600">Available on compatible Apple devices</p>
                )}
                
                {payment.type === 'google-pay' && (
                  <p className="text-gray-600">Available on compatible Android devices</p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                {!payment.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDefaultPayment(payment.id!)}
                    className="w-full"
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {paymentMethods.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods yet</h3>
            <p className="text-gray-600 mb-6">Add your first payment method to get started.</p>
            <Button onClick={handleAddPayment}>Add Payment Method</Button>
          </div>
        )}

        {/* Add/Edit Payment Method Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPayment(null);
          }}
          title={editingPayment ? 'Edit Payment Method' : 'Add Payment Method'}
        >
          <PaymentForm
            paymentMethod={editingPayment || {
              type: 'card',
              cardNumber: '',
              cardholderName: '',
              expiryMonth: '',
              expiryYear: '',
              cvv: ''
            }}
            onChange={handleSavePayment}
            title=""
          />
          
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingPayment(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => handleSavePayment(editingPayment || {
              type: 'card',
              cardNumber: '',
              cardholderName: '',
              expiryMonth: '',
              expiryYear: '',
              cvv: ''
            })}>
              {editingPayment ? 'Update Payment Method' : 'Add Payment Method'}
            </Button>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingPayment(null);
          }}
          title="Delete Payment Method"
        >
          <div className="text-center py-6">
            <Trash2 className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Are you sure?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. The payment method will be permanently deleted.
            </p>
            
            <div className="flex justify-center space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingPayment(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDeletePayment}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Payment Method
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default PaymentMethodsPage;
