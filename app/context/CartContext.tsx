"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number, size?: string) => void;
  updateQuantity: (
    id: number,
    quantity: number,
    size?: string,
  ) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from browser storage
  useEffect(() => {
    const savedCart = localStorage.getItem("nuvistine-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        localStorage.removeItem("nuvistine-cart");
      }
    }
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("nuvistine-cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(
    item: Omit<CartItem, "quantity">,
    quantity = 1,
  ) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size,
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantity,
              }
            : cartItem,
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          quantity,
        },
      ];
    });
  }

  function removeFromCart(id: number, size?: string) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => !(item.id === id && item.size === size),
      ),
    );
  }

  function updateQuantity(
    id: number,
    quantity: number,
    size?: string,
  ) {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider",
    );
  }

  return context;
}