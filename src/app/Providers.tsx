// app/Providers.tsx
'use client';

import store, { persistor } from '@/store/cartStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    {children}
    </PersistGate>
    </Provider>;
}