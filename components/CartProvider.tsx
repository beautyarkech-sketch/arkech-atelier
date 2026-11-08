"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product, products } from "@/lib/products";

export type CartItem = {
  product: Product;
  size: string;
  qty: number;
};

export type Currency = "EUR" | "USD" | "MAD";

type CartContextType = {
  items: CartItem[];
  count: number;
  total: number;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInEUR: number) => string;
  add: (p: Product, size: string, qty?: number) => void;
  remove: (slug: string, size: string) => void;
  change: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  wishlist: string[];
  toggleWish: (slug: string) => void;
  toast: string | null;
  showToast: (msg: string) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

const DEFAULT_CART_ITEMS: CartItem[] = [
  {
    product: products[0], // Tafukt Completo Hoodie Grigio (175 €)
    size: "L",
    qty: 1,
  },
];

// Conversion rates relative to EUR
const RATES: Record<Currency, { rate: number; symbol: string }> = {
  EUR: { rate: 1, symbol: "€" },
  USD: { rate: 1.08, symbol: "$" },
  MAD: { rate: 10.9, symbol: "MAD" },
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(DEFAULT_CART_ITEMS);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currency, setCurrencyState] = useState<Currency>("EUR");
  const [toast, setToast] = useState<string | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("arkech-cart-it-v1");
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        setItems(DEFAULT_CART_ITEMS);
      }
      const storedWish = localStorage.getItem("arkech-wish-it-v1");
      if (storedWish) {
        setWishlist(JSON.parse(storedWish));
      }
      const storedCurr = localStorage.getItem("arkech-curr-it-v1") as Currency;
      if (storedCurr && RATES[storedCurr]) {
        setCurrencyState(storedCurr);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("arkech-cart-it-v1", JSON.stringify(items));
      } catch {}
    }
  }, [items, ready]);

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("arkech-wish-it-v1", JSON.stringify(wishlist));
      } catch {}
    }
  }, [wishlist, ready]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("arkech-curr-it-v1", c);
    } catch {}
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const formatPrice = (priceInEUR: number): string => {
    const { rate } = RATES[currency];
    const converted = Math.round(priceInEUR * rate);
    if (currency === "EUR") {
      return `${converted.toLocaleString("it-IT")} €`;
    }
    if (currency === "MAD") {
      return `${converted.toLocaleString("it-IT")} MAD`;
    }
    return `$${converted.toLocaleString("en-US")}`;
  };

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.product.price * i.qty, 0),
      currency,
      setCurrency,
      formatPrice,
      add: (product: Product, size: string, qty: number = 1) => {
        setItems((prev) => {
          const idx = prev.findIndex(
            (i) => i.product.slug === product.slug && i.size === size
          );
          if (idx < 0) return [...prev, { product, size, qty }];
          return prev.map((item, n) =>
            n === idx ? { ...item, qty: item.qty + qty } : item
          );
        });
        showToast(`"${product.name}" aggiunto al carrello`);
      },
      remove: (slug: string, size: string) =>
        setItems((prev) =>
          prev.filter((i) => !(i.product.slug === slug && i.size === size))
        ),
      change: (slug: string, size: string, qty: number) =>
        setItems((prev) =>
          prev.map((i) =>
            i.product.slug === slug && i.size === size
              ? { ...i, qty: Math.max(1, qty) }
              : i
          )
        ),
      clear: () => setItems([]),
      wishlist,
      toggleWish: (slug: string) =>
        setWishlist((prev) => {
          const exists = prev.includes(slug);
          showToast(
            exists ? "Capo rimosso dai preferiti" : "Capo aggiunto ai tuoi preferiti"
          );
          return exists ? prev.filter((s) => s !== slug) : [...prev, slug];
        }),
      toast,
      showToast,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
    }),
    [items, wishlist, currency, toast, isCartDrawerOpen]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {/* Global Luxury Toast Notification */}
      {toast && (
        <div className="luxury-toast">
          <div className="toast-dot" />
          <span>{toast}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const v = useContext(CartContext);
  if (!v) throw new Error("CartProvider missing");
  return v;
}
