import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'UA' | 'EN' | 'PL';

export interface Product {
  id: number;
  name: Record<Language, string>;
  price: { uah: number; pln: number };
  image: string;
  galleryImages: string[];
  description: Record<Language, string>;
  colors: string[];
  badge?: {
    text: Record<Language, string>;
    bgColor: string;
    textColor: string;
  };
}

export interface CartItem extends Product {
  size: string;
  selectedColor: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string, color: string) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && item.size === size && item.selectedColor === color
    );

    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id && item.size === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, size, selectedColor: color, quantity: 1 }]);
    }
  };

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}