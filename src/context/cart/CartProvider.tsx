"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Cart, CartItem, AddToCartPayload } from "@/types/app/cart";

interface CartContextValue {
  cart: Cart;
  addItem: (payload: AddToCartPayload & { product: Omit<CartItem, "id" | "quantity" | "subtotal"> }) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const EMPTY_CART: Cart = {
  items: [],
  subtotal: 0,
  shippingFee: 0,
  discount: 0,
  total: 0,
  itemCount: 0,
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(EMPTY_CART);

  const recalculate = (items: CartItem[]): Cart => {
    const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
    const shippingFee = subtotal > 5000 ? 0 : 150;
    const total = subtotal + shippingFee;
    const itemCount = items.reduce((s, i) => s + i.quantity, 0);
    return { items, subtotal, shippingFee, discount: 0, total, itemCount };
  };

  const addItem = useCallback(
    (payload: AddToCartPayload & { product: Omit<CartItem, "id" | "quantity" | "subtotal"> }) => {
      setCart((prev) => {
        const existing = prev.items.find(
          (i) =>
            i.productId === payload.productId &&
            i.selectedSkinId === payload.selectedSkinId &&
            i.selectedAiProvider === payload.selectedAiProvider,
        );
        let items: CartItem[];
        if (existing) {
          const qty = existing.quantity + payload.quantity;
          items = prev.items.map((i) =>
            i.id === existing.id ? { ...i, quantity: qty, subtotal: i.unitPrice * qty } : i,
          );
        } else {
          const newItem: CartItem = {
            id: `${payload.productId}-${Date.now()}`,
            ...payload.product,
            quantity: payload.quantity,
            selectedSkinId: payload.selectedSkinId,
            selectedAiProvider: payload.selectedAiProvider,
            subtotal: payload.product.unitPrice * payload.quantity,
          };
          items = [...prev.items, newItem];
        }
        return recalculate(items);
      });
    },
    [],
  );

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setCart((prev) => {
      const items =
        quantity <= 0
          ? prev.items.filter((i) => i.id !== itemId)
          : prev.items.map((i) =>
              i.id === itemId ? { ...i, quantity, subtotal: i.unitPrice * quantity } : i,
            );
      return recalculate(items);
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCart((prev) => recalculate(prev.items.filter((i) => i.id !== itemId)));
  }, []);

  const clearCart = useCallback(() => setCart(EMPTY_CART), []);

  return (
    <CartContext.Provider value={{ cart, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
