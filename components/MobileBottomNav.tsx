"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "./CartProvider";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav className="mobile-bottom-nav">
      <Link href="/" className={`bottom-nav-item ${pathname === "/" ? "active" : ""}`}>
        <Home size={19} />
        <span>Home</span>
      </Link>

      <Link
        href="/collections"
        className={`bottom-nav-item ${pathname.startsWith("/collections") ? "active" : ""}`}
      >
        <Grid size={19} />
        <span>Negozio</span>
      </Link>

      <Link
        href="/panier"
        className={`bottom-nav-item ${pathname === "/panier" ? "active" : ""}`}
      >
        <div className="bottom-cart-icon-wrapper">
          <ShoppingBag size={19} />
          {count > 0 && <span className="bottom-cart-badge">{count}</span>}
        </div>
        <span>Carrello</span>
      </Link>

      <Link
        href="/favoris"
        className={`bottom-nav-item ${pathname === "/favoris" ? "active" : ""}`}
      >
        <Heart size={19} />
        <span>Preferiti</span>
      </Link>

      <Link
        href="/compte"
        className={`bottom-nav-item ${pathname === "/compte" ? "active" : ""}`}
      >
        <User size={19} />
        <span>Profilo</span>
      </Link>
    </nav>
  );
}
