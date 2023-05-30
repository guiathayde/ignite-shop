import { ReactNode } from 'react';

import { ShoppingBagContextProvider } from './shoppingBag';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return <ShoppingBagContextProvider>{children}</ShoppingBagContextProvider>;
}
