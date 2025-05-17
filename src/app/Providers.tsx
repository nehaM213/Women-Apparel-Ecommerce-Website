// app/Providers.tsx
"use client";

import store, { persistor } from "@/store/cartStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {/* {children} */}
      {isClient ? (
        <PersistGate loading={null} persistor={persistor!}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
}
