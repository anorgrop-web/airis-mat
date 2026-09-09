"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Bundle } from "@/lib/constants";

export type CartLine = { bundle: Bundle; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (bundle: Bundle) => void;
  remove: (bundleId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Lightweight cart state, kept in memory.
 * Each kit has its own hosted checkout page (Bundle.checkoutUrl), so the cart
 * holds ONE kit at a time: adding a different kit replaces the current one.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((bundle: Bundle) => {
    setLines([{ bundle, qty: 1 }]);
    setIsOpen(true);
  }, []);

  const remove = useCallback((bundleId: string) => {
    setLines((prev) => prev.filter((l) => l.bundle.id !== bundleId));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.qty * l.bundle.price, 0);
    return {
      lines,
      count,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      remove,
    };
  }, [lines, isOpen, add, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
