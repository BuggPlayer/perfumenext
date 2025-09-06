import React from 'react';
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export type OrderStatusType = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderStatusProps {
  status: OrderStatusType;
  currentStep?: number;
  className?: string;
  showLabels?: boolean;
  compact?: boolean;
}

const OrderStatus: React.FC<OrderStatusProps> = ({
  status,
  currentStep = 0,
  className = '',
  showLabels = true,
  compact = false
}) => {
  const steps = [
    { key: 'pending', label: 'Order Placed', icon: Clock, color: 'text-gray-500' },
    { key: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, color: 'text-blue-500' },
    { key: 'processing', label: 'Processing', icon: Package, color: 'text-primary-500' },
    { key: 'shipped', label: 'Shipped', icon: Truck, color: 'text-purple-500' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'text-green-500' }
  ];

  const getCurrentStepIndex = () => {
    const stepIndex = steps.findIndex(step => step.key === status);
    return stepIndex === -1 ? 0 : stepIndex;
  };

  const currentStepIndex = getCurrentStepIndex();

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <div key={step.key} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                isActive 
                  ? 'border-primary-500 bg-primary-500 text-white' 
                  : 'border-gray-300 bg-gray-100 text-gray-400'
              }`}>
                <Icon className={`w-4 h-4 ${isCurrent ? 'animate-pulse' : ''}`} />
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-1 mx-2 ${
                  isActive ? 'bg-primary-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === 'cancelled' ? 'bg-red-100 text-red-800' :
          status === 'delivered' ? 'bg-green-100 text-green-800' :
          'bg-primary-100 text-primary-800'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          
          return (
            <div key={step.key} className="flex items-start mb-6 last:mb-0">
              <div className="flex-shrink-0">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted 
                    ? 'border-green-500 bg-green-500 text-white' 
                  : isCurrent 
                    ? 'border-primary-500 bg-primary-500 text-white animate-pulse' 
                    : 'border-gray-300 bg-gray-100 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              
              <div className="ml-4 flex-1">
                <h4 className={`font-medium ${
                  isActive ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.label}
                </h4>
                {showLabels && (
                  <p className={`text-sm ${
                    isActive ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {isCompleted ? 'Completed' : 
                     isCurrent ? 'In Progress' : 'Pending'}
                  </p>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className={`absolute left-5 top-10 w-0.5 h-12 ${
                  isActive ? 'bg-primary-500' : 'bg-gray-300'
                }`} style={{ marginLeft: '-1px' }} />
              )}
            </div>
          );
        })}
      </div>

      {status === 'cancelled' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-800 text-sm">
              This order has been cancelled. Please contact customer support if you have any questions.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
