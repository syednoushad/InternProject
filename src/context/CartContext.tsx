import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../data/products";

type CartLine = { product: Product; quantity: number };
type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartLine[] {
  try {
    const saved = localStorage.getItem("morrow-cart");
    return saved ? (JSON.parse(saved) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(readCart);

  useEffect(() => {
    localStorage.setItem("morrow-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product) => {
      setItems((current) => {
        const existing = current.find((item) => item.product.id === product.id);
        return existing
          ? current.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...current, { product, quantity: 1 }];
      });
    };
    const setQuantity = (productId: string, quantity: number) => {
      setItems((current) =>
        quantity < 1
          ? current.filter((item) => item.product.id !== productId)
          : current.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item,
            ),
      );
    };
    return {
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
      addItem,
      removeItem: (productId) =>
        setItems((current) =>
          current.filter((item) => item.product.id !== productId),
        ),
      setQuantity,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
