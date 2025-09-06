'use client';

import React, { useState } from 'react';
import { Palette, Settings, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Button from './Button';
import { ThemeVariant } from '@/contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, themeConfig, setTheme, resetTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { variant: ThemeVariant; name: string; description: string; preview: string[] }[] = [
    {
      variant: 'premium',
      name: 'Premium Black & Gold',
      description: 'Luxury black and golden theme',
      preview: ['bg-black', 'bg-yellow-500', 'bg-gray-800', 'bg-yellow-400']
    },
    {
      variant: 'elegant',
      name: 'Elegant Purple & Silver',
      description: 'Sophisticated purple and silver theme',
      preview: ['bg-purple-600', 'bg-blue-500', 'bg-gray-700', 'bg-purple-400']
    },
    {
      variant: 'modern',
      name: 'Modern Blue & White',
      description: 'Clean and contemporary blue theme',
      preview: ['bg-blue-600', 'bg-green-500', 'bg-gray-600', 'bg-blue-400']
    },
    {
      variant: 'classic',
      name: 'Classic Red & Gold',
      description: 'Traditional red and gold theme',
      preview: ['bg-red-600', 'bg-yellow-500', 'bg-gray-700', 'bg-red-400']
    },
    {
      variant: 'custom',
      name: 'Custom Theme',
      description: 'Your personalized color scheme',
      preview: ['bg-gradient-to-r from-pink-500 to-purple-500', 'bg-gradient-to-r from-blue-500 to-green-500', 'bg-gray-600', 'bg-gradient-to-r from-yellow-400 to-orange-500']
    }
  ];

  const handleThemeChange = (theme: ThemeVariant) => {
    setTheme(theme);
    setIsOpen(false);
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
        title="Change Theme"
      >
        <Palette className="w-6 h-6 text-gray-700" />
      </button>

      {/* Theme Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Palette className="w-6 h-6 text-gray-700" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Choose Your Theme</h2>
                  <p className="text-sm text-gray-600">Customize the look and feel of your website</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Current Theme Info */}
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Current Theme</h3>
                  <p className="text-sm text-gray-600">{themeConfig.name}</p>
                </div>
                <Button
                  onClick={resetTheme}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Reset to Default
                </Button>
              </div>
            </div>

            {/* Theme Options */}
            <div className="p-6 space-y-4">
              {themes.map((theme) => (
                <div
                  key={theme.variant}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    currentTheme === theme.variant
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleThemeChange(theme.variant)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{theme.name}</h4>
                      <p className="text-sm text-gray-600">{theme.description}</p>
                    </div>
                    {currentTheme === theme.variant && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Color Preview */}
                  <div className="flex space-x-2">
                    {theme.preview.map((colorClass, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-lg ${colorClass} border border-gray-200`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Theme changes are saved automatically and will persist across sessions.
                </p>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-700 hover:bg-gray-800 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSwitcher;
