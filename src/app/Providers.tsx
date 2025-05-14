// app/Providers.tsx
'use client';

import store from '@/store/cartStore';
import { Provider } from 'react-redux';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}