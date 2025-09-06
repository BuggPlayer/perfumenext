'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette } from 'lucide-react';

const ThemePreview: React.FC = () => {
  const { currentTheme, themeConfig } = useTheme();

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Theme</h2>
          <p className="text-gray-600">Experience the beauty of {themeConfig.name}</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <Palette className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{themeConfig.name}</h3>
              <p className="text-gray-600">{themeConfig.description}</p>
            </div>
            
            {/* Color Palette Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-primary-500 border border-gray-200"></div>
                <p className="text-sm font-medium text-gray-900">Primary</p>
                <p className="text-xs text-gray-500">{themeConfig.colors.primary[500]}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-primary-400 border border-gray-200"></div>
                <p className="text-sm font-medium text-gray-900">Primary Light</p>
                <p className="text-xs text-gray-500">{themeConfig.colors.primary[400]}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-primary-600 border border-gray-200"></div>
                <p className="text-sm font-medium text-gray-900">Primary Dark</p>
                <p className="text-xs text-gray-500">{themeConfig.colors.primary[600]}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-secondary-500 border border-gray-200"></div>
                <p className="text-sm font-medium text-gray-900">Secondary</p>
                <p className="text-xs text-gray-500">{themeConfig.colors.secondary[500]}</p>
              </div>
            </div>
            
            {/* Theme Info */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Theme Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="ml-2 text-gray-900">{themeConfig.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <span className="ml-2 text-gray-900">{currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Primary Color:</span>
                  <span className="ml-2 text-gray-900">{themeConfig.colors.primary[500]}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Secondary Color:</span>
                  <span className="ml-2 text-gray-900">{themeConfig.colors.secondary[500]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
