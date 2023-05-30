import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description?: string;
  defaultPriceId?: string;
}

interface ShoppingBagContextData {
  isShoppingBagVisible: boolean;
  changeShoppingBagVisibility: (visibility: boolean) => void;

  products: Product[];

  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
}

const ShoppingBagContext = createContext({} as ShoppingBagContextData);

interface ShoppingBagContextProviderProps {
  children: ReactNode;
}

export function ShoppingBagContextProvider({
  children,
}: ShoppingBagContextProviderProps) {
  const [isShoppingBagVisible, setIsShoppingBagVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const changeShoppingBagVisibility = useCallback((visibility: boolean) => {
    setIsShoppingBagVisible(visibility);
  }, []);

  const addProduct = useCallback((product: Product) => {
    setProducts((oldProducts) => [...oldProducts, product]);
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setProducts((oldProducts) =>
      oldProducts.filter((product) => product.id !== productId)
    );
  }, []);

  return (
    <ShoppingBagContext.Provider
      value={{
        isShoppingBagVisible,
        changeShoppingBagVisibility,
        products,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
}

export function useShoppingBag() {
  const context = useContext(ShoppingBagContext);

  if (!context) {
    throw new Error(
      'useShoppingBag must be used within an ShoppingBagContextProvider'
    );
  }

  return context;
}
