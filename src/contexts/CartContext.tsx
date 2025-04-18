
import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";
import { toast } from "sonner";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Update localStorage and calculate totals whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Calculate total items and subtotal
    const items = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(items);
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(total);
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        toast.success(`Updated quantity in cart: ${product.name}`);
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`Added to cart: ${product.name}`);
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const removedProduct = prevCart.find(item => item.id === productId);
      if (removedProduct) {
        toast.info(`Removed from cart: ${removedProduct.name}`);
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
