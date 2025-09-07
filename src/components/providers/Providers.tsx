'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { NotificationProvider } from '@/components/ui/Notification';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* ThemeProvider disabled for static theme */}
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;

