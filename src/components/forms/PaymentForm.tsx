import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { CreditCard, Lock } from 'lucide-react';

export interface PaymentMethod {
  id?: string;
  type: 'card' | 'paypal' | 'apple-pay' | 'google-pay';
  cardNumber?: string;
  cardholderName?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  isDefault?: boolean;
}

interface PaymentFormProps {
  paymentMethod: PaymentMethod;
  onChange: (paymentMethod: PaymentMethod) => void;
  title?: string;
  className?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentMethod,
  onChange,
  title = 'Payment Information',
  className = ''
}) => {
  const handleChange = (field: keyof PaymentMethod, value: string) => {
    onChange({
      ...paymentMethod,
      [field]: value
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return { value: month.toString().padStart(2, '0'), label: month.toString().padStart(2, '0') };
  });

  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-primary-600" />
          {title}
        </h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Payment Method"
          value={paymentMethod.type}
          onChange={(e) => handleChange('type', e.target.value)}
          options={[
            { value: 'card', label: 'Credit/Debit Card' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'apple-pay', label: 'Apple Pay' },
            { value: 'google-pay', label: 'Google Pay' }
          ]}
        />
        
        <Input
          label="Cardholder Name"
          value={paymentMethod.cardholderName || ''}
          onChange={(e) => handleChange('cardholderName', e.target.value)}
          placeholder="John Doe"
          required={paymentMethod.type === 'card'}
        />
      </div>

      {paymentMethod.type === 'card' && (
        <>
          <Input
            label="Card Number"
            value={paymentMethod.cardNumber || ''}
            onChange={(e) => handleChange('cardNumber', e.target.value)}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Expiry Month"
              value={paymentMethod.expiryMonth || ''}
              onChange={(e) => handleChange('expiryMonth', e.target.value)}
              options={months}
              required
            />
            
            <Select
              label="Expiry Year"
              value={paymentMethod.expiryYear || ''}
              onChange={(e) => handleChange('expiryYear', e.target.value)}
              options={years.map(year => ({ value: year.toString(), label: year.toString() }))}
              required
            />
            
            <Input
              label="CVV"
              value={paymentMethod.cvv || ''}
              onChange={(e) => handleChange('cvv', e.target.value)}
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </>
      )}

      {paymentMethod.type === 'paypal' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            You will be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      )}

      {paymentMethod.type === 'apple-pay' && (
        <div className="bg-black text-white rounded-lg p-4 text-center">
          <p className="text-sm">
            Apple Pay will be available at checkout for compatible devices.
          </p>
        </div>
      )}

      {paymentMethod.type === 'google-pay' && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center">
          <p className="text-gray-700 text-sm">
            Google Pay will be available at checkout for compatible devices.
          </p>
        </div>
      )}

      <div className="flex items-center text-sm text-gray-600">
        <Lock className="w-4 h-4 mr-2" />
        <span>Your payment information is encrypted and secure</span>
      </div>
    </div>
  );
};

export default PaymentForm;
