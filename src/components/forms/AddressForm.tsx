import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';

export interface Address {
  id?: string;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

interface AddressFormProps {
  address: Address;
  onChange: (address: Address) => void;
  title?: string;
  showType?: boolean;
  className?: string;
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onChange,
  title = 'Address Information',
  showType = true,
  className = ''
}) => {
  const handleChange = (field: keyof Address, value: string) => {
    onChange({
      ...address,
      [field]: value
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          {title}
        </h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {showType && (
          <Select
            label="Address Type"
            value={address.type}
            onChange={(e) => handleChange('type', e.target.value)}
            options={[
              { value: 'home', label: 'Home' },
              { value: 'work', label: 'Work' },
              { value: 'other', label: 'Other' }
            ]}
          />
        )}
        
        <Input
          label="First Name"
          value={address.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          required
        />
        
        <Input
          label="Last Name"
          value={address.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          required
        />
      </div>

      <Input
        label="Company (Optional)"
        value={address.company || ''}
        onChange={(e) => handleChange('company', e.target.value)}
      />

      <Input
        label="Address Line 1"
        value={address.addressLine1}
        onChange={(e) => handleChange('addressLine1', e.target.value)}
        required
      />

      <Input
        label="Address Line 2 (Optional)"
        value={address.addressLine2 || ''}
        onChange={(e) => handleChange('addressLine2', e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="City"
          value={address.city}
          onChange={(e) => handleChange('city', e.target.value)}
          required
        />
        
        <Input
          label="State/Province"
          value={address.state}
          onChange={(e) => handleChange('state', e.target.value)}
          required
        />
        
        <Input
          label="Postal Code"
          value={address.postalCode}
          onChange={(e) => handleChange('postalCode', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Country"
          value={address.country}
          onChange={(e) => handleChange('country', e.target.value)}
          options={[
            { value: 'US', label: 'United States' },
            { value: 'CA', label: 'Canada' },
            { value: 'GB', label: 'United Kingdom' },
            { value: 'AU', label: 'Australia' },
            { value: 'DE', label: 'Germany' },
            { value: 'FR', label: 'France' },
            { value: 'IT', label: 'Italy' },
            { value: 'ES', label: 'Spain' },
            { value: 'JP', label: 'Japan' },
            { value: 'IN', label: 'India' }
          ]}
          required
        />
        
        <Input
          label="Phone Number"
          value={address.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          type="tel"
          required
        />
      </div>
    </div>
  );
};

export default AddressForm;
