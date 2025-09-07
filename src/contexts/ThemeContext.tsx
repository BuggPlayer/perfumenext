'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeVariant = 'premium' | 'elegant' | 'modern' | 'classic' | 'custom';

export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  accent: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  dark: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

export interface ThemeConfig {
  name: string;
  description: string;
  colors: ThemeColors;
  cssVariables: Record<string, string>;
}

const defaultThemes: Record<ThemeVariant, ThemeConfig> = {
  premium: {
    name: 'Premium Black & Gold',
    description: 'Luxury black and golden theme for high-end brands',
    colors: {
      primary: {
        50: '#e6c98f',
        100: '#e6c98f',
        200: '#e6c98f',
        300: '#e6c98f',
        400: '#e6c98f',
        500: '#d2a34b',
        600: '#c69544',
        700: '#c69544',
        800: '#c69544',
        900: '#c69544',
        950: '#c69544',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#000000',
      },
      accent: {
        50: '#fdf4ff',
        100: '#fae8ff',
        200: '#f5d0fe',
        300: '#f0abfc',
        400: '#e879f9',
        500: '#d946ef',
        600: '#c026d3',
        700: '#a21caf',
        800: '#86198f',
        900: '#701a75',
        950: '#4a044e',
      },
      dark: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#000000',
      }
    },
    cssVariables: {
      '--color-primary': '#d2a34b',
      '--color-primary-light': '#e6c98f',
      '--color-primary-dark': '#c69544',
      '--color-secondary': '#64748b',
      '--color-accent': '#d946ef',
      '--color-dark': '#000000',
      '--color-light': '#ffffff',
      '--color-background': '#000000',
      '--color-surface': '#121212',
      '--color-text': '#ffffff',
      '--color-text-muted': 'rgba(255, 255, 255, 0.8)',
      '--border-primary': '#d2a34b',
      '--border-faded': 'rgba(210, 163, 75, 0.3)',
      '--bg-primary-transparent': 'rgba(210, 163, 75, 0.1)'
    }
  },
  elegant: {
    name: 'Elegant Purple & Silver',
    description: 'Sophisticated purple and silver theme',
    colors: {
      primary: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
        900: '#581c87',
        950: '#3b0764',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      },
      accent: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
        950: '#082f49',
      },
      dark: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#000000',
      }
    },
    cssVariables: {
      '--color-primary': '#a855f7',
      '--color-primary-light': '#c084fc',
      '--color-primary-dark': '#7c3aed',
      '--color-secondary': '#64748b',
      '--color-accent': '#0ea5e9',
      '--color-dark': '#0f172a',
      '--color-light': '#ffffff',
      '--color-background': '#ffffff',
      '--color-surface': '#f8fafc',
      '--color-text': '#0f172a',
      '--color-text-muted': '#64748b',
    }
  },
  modern: {
    name: 'Modern Blue & White',
    description: 'Clean and contemporary blue theme',
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#172554',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      },
      accent: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
        950: '#052e16',
      },
      dark: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#000000',
      }
    },
    cssVariables: {
      '--color-primary': '#3b82f6',
      '--color-primary-light': '#60a5fa',
      '--color-primary-dark': '#1d4ed8',
      '--color-secondary': '#64748b',
      '--color-accent': '#22c55e',
      '--color-dark': '#0f172a',
      '--color-light': '#ffffff',
      '--color-background': '#ffffff',
      '--color-surface': '#f8fafc',
      '--color-text': '#0f172a',
      '--color-text-muted': '#64748b',
    }
  },
  classic: {
    name: 'Classic Red & Gold',
    description: 'Traditional red and gold theme',
    colors: {
      primary: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
        950: '#450a0a',
      },
      secondary: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
        950: '#422006',
      },
      accent: {
        50: '#fdf4ff',
        100: '#fae8ff',
        200: '#f5d0fe',
        300: '#f0abfc',
        400: '#e879f9',
        500: '#d946ef',
        600: '#c026d3',
        700: '#a21caf',
        800: '#86198f',
        900: '#701a75',
        950: '#4a044e',
      },
      dark: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#000000',
      }
    },
    cssVariables: {
      '--color-primary': '#ef4444',
      '--color-primary-light': '#f87171',
      '--color-primary-dark': '#b91c1c',
      '--color-secondary': '#eab308',
      '--color-accent': '#d946ef',
      '--color-dark': '#0f172a',
      '--color-light': '#ffffff',
      '--color-background': '#ffffff',
      '--color-surface': '#f8fafc',
      '--color-text': '#0f172a',
      '--color-text-muted': '#64748b',
    }
  },
  custom: {
    name: 'Custom Theme',
    description: 'Your personalized color scheme',
    colors: {
      primary: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
        950: '#422006',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#000000',
      },
      accent: {
        50: '#fdf4ff',
        100: '#fae8ff',
        200: '#f5d0fe',
        300: '#f0abfc',
        400: '#e879f9',
        500: '#d946ef',
        600: '#c026d3',
        700: '#a21caf',
        800: '#86198f',
        900: '#701a75',
        950: '#4a044e',
      },
      dark: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#000000',
      }
    },
    cssVariables: {
      '--color-primary': '#eab308',
      '--color-primary-light': '#facc15',
      '--color-primary-dark': '#ca8a04',
      '--color-secondary': '#64748b',
      '--color-accent': '#d946ef',
      '--color-dark': '#000000',
      '--color-light': '#ffffff',
      '--color-background': '#ffffff',
      '--color-surface': '#f8fafc',
      '--color-text': '#0f172a',
      '--color-text-muted': '#64748b',
    }
  }
};

interface ThemeContextType {
  currentTheme: ThemeVariant;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeVariant) => void;
  updateCustomTheme: (colors: Partial<ThemeColors>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>('premium');
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(defaultThemes.premium);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeVariant;
    if (savedTheme && defaultThemes[savedTheme]) {
      setCurrentTheme(savedTheme);
      setThemeConfig(defaultThemes[savedTheme]);
    }
    console.log('[ThemeProvider] loaded savedTheme:', savedTheme || 'none');
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    console.log('[ThemeProvider] applying theme', { currentTheme, themeName: themeConfig.name });
    // Apply CSS variables
    Object.entries(themeConfig.cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Sync full color scales to CSS variables used by Tailwind (primary, secondary, accent)
    const setScale = (prefix: string, scale: ThemeColors['primary']) => {
      root.style.setProperty(`--${prefix}-50`, scale[50]);
      root.style.setProperty(`--${prefix}-100`, scale[100]);
      root.style.setProperty(`--${prefix}-200`, scale[200]);
      root.style.setProperty(`--${prefix}-300`, scale[300]);
      root.style.setProperty(`--${prefix}-400`, scale[400]);
      root.style.setProperty(`--${prefix}-500`, scale[500]);
      root.style.setProperty(`--${prefix}-600`, scale[600]);
      root.style.setProperty(`--${prefix}-700`, scale[700]);
      root.style.setProperty(`--${prefix}-800`, scale[800]);
      root.style.setProperty(`--${prefix}-900`, scale[900]);
      root.style.setProperty(`--${prefix}-950`, scale[950]);
    };

    setScale('primary', themeConfig.colors.primary);
    setScale('secondary', themeConfig.colors.secondary);
    setScale('accent', themeConfig.colors.accent);

    // Apply TailwindCSS classes for dynamic colors
    root.classList.remove('theme-premium', 'theme-elegant', 'theme-modern', 'theme-classic', 'theme-custom');
    root.classList.add(`theme-${currentTheme}`);
    console.log('[ThemeProvider] applied root class & vars', {
      rootClass: root.className,
      primary500: getComputedStyle(root).getPropertyValue('--primary-500').trim(),
      colorPrimary: getComputedStyle(root).getPropertyValue('--color-primary').trim(),
    });
  }, [themeConfig, currentTheme]);

  const setTheme = (theme: ThemeVariant) => {
    console.log('[ThemeProvider.setTheme] called with:', theme);
    setCurrentTheme(theme);
    setThemeConfig(defaultThemes[theme]);
    localStorage.setItem('theme', theme);
  };

  const updateCustomTheme = (colors: Partial<ThemeColors>) => {
    console.log('[ThemeProvider.updateCustomTheme] colors:', colors);
    const updatedConfig = {
      ...defaultThemes.custom,
      colors: { ...defaultThemes.custom.colors, ...colors },
      cssVariables: {
        ...defaultThemes.custom.cssVariables,
        '--color-primary': colors.primary?.[500] || '#eab308',
        '--color-primary-light': colors.primary?.[400] || '#facc15',
        '--color-primary-dark': colors.primary?.[600] || '#ca8a04',
        '--color-secondary': colors.secondary?.[500] || '#64748b',
        '--color-accent': colors.accent?.[500] || '#d946ef',  
      }
    };
    setThemeConfig(updatedConfig);
    setCurrentTheme('custom');
    localStorage.setItem('theme', 'custom');
    localStorage.setItem('customTheme', JSON.stringify(colors));
  };

  const resetTheme = () => {
    console.log('[ThemeProvider.resetTheme] resetting to premium');
    setTheme('premium');
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      themeConfig,
      setTheme,
      updateCustomTheme,
      resetTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
