// app/Providers.tsx
"use client";

import store, { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <SessionProvider>
    <Provider store={store}>
      {isClient ? (
        <PersistGate loading={null} persistor={persistor!}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
    </SessionProvider>
  );
}
