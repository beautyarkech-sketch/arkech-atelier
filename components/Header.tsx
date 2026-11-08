"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Trash2,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react";
import { useCart, Currency } from "./CartProvider";
import { products } from "@/lib/products";

const TICKER_MESSAGES = [
  "✦ REBIRTH COLLECTION — NOT MADE FOR EVERYONE. MADE FOR YOU.",
  "✦ SPEDIZIONE RAPIDA CON CORRIERE TRACCIATO IN TUTTA ITALIA",
  "✦ COMPLETI OVERSIZE 360 G/M² & RICAMI ESCLUSIVI ARKECH ATELIER",
  "✦ RESO SEMPLICE E CAMBIO TAGLIA ENTRO 14 GIORNI",
];

export default function Header() {
  const pathname = usePathname();
  const {
    count,
    items,
    total,
    currency,
    setCurrency,
    formatPrice,
    change,
    remove,
    wishlist,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lang, setLang] = useState<"IT" | "EN">("IT");
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);

  const isHome = pathname === "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ticker rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIdx((prev) => (prev + 1) % TICKER_MESSAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Filtered products for live search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);
  const freeShippingProgress = Math.min(100, (total / freeShippingThreshold) * 100);

  return (
    <>
      <div className={`site-header-wrapper ${isScrolled ? "is-scrolled" : ""}`}>
        {/* Top Announcement Bar */}
        <div className="announcement-bar">
        <div className="announcement-content">
          <span className="announcement-pill-tag">
            <Sparkles size={11} className="gold-sparkle-icon" />
            REBIRTH COLLECTION
          </span>
          <span className="announcement-sep">|</span>
          <span className="announcement-ticker-text" key={tickerIdx}>
            {TICKER_MESSAGES[tickerIdx]}
          </span>
        </div>

        <div className="announcement-controls">
          {/* Language Switch */}
          <button
            type="button"
            className="announcement-btn"
            onClick={() => setLang(lang === "IT" ? "EN" : "IT")}
            title="Cambia lingua"
          >
            <span>{lang}</span>
            <ChevronDown className="chev-icon" size={11} />
          </button>

          <span className="announcement-sep">|</span>

          {/* Currency Switch */}
          <div className="currency-selector-relative">
            <button
              type="button"
              className="announcement-btn"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              title="Cambia valuta"
            >
              <span>{currency === "EUR" ? "EUR (€)" : currency === "USD" ? "USD ($)" : "MAD (DH)"}</span>
              <ChevronDown className="chev-icon" size={11} />
            </button>

            {currencyDropdownOpen && (
              <div className="currency-dropdown-menu">
                {(["EUR", "USD", "MAD"] as Currency[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`curr-option ${currency === c ? "active" : ""}`}
                    onClick={() => {
                      setCurrency(c);
                      setCurrencyDropdownOpen(false);
                    }}
                  >
                    {c} {c === "EUR" ? "(€)" : c === "USD" ? "($)" : "(DH)"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`main-header ${isHome ? "is-home" : "is-standard"} ${
          isScrolled ? "is-scrolled" : ""
        }`}
      >
        {/* Left: Mobile hamburger */}
        <button
          type="button"
          className="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu di navigazione"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link
            href="/collections?cat=donna"
            className={`nav-link ${
              pathname.includes("cat=donna") ? "active" : ""
            }`}
          >
            Donna
          </Link>
          <Link
            href="/collections?cat=uomo"
            className={`nav-link ${
              pathname.includes("cat=uomo") ? "active" : ""
            }`}
          >
            Uomo
          </Link>
          <Link
            href="/collections?cat=completi"
            className={`nav-link ${
              pathname.includes("cat=completi") ? "active" : ""
            }`}
          >
            Completi
          </Link>
          <Link
            href="/collections"
            className={`nav-link ${
              pathname === "/collections" && !pathname.includes("cat=")
                ? "active"
                : ""
            }`}
          >
            Collezioni
          </Link>
          <Link
            href="/a-propos"
            className={`nav-link ${pathname === "/a-propos" ? "active" : ""}`}
          >
            Chi Siamo
          </Link>
        </nav>

        {/* Center: Brand Logo */}
        <Link href="/" className="brand-logo" aria-label="Arkech Atelier Home">
          <span className="brand-title">ARKECH</span>
          <div className="brand-sub-wrap">
            <span className="brand-sub">ATELIER</span>
            <span className="brand-dot">✦</span>
            <span className="brand-loc">REBIRTH</span>
          </div>
        </Link>

        {/* Right: Actions */}
        <div className="header-actions">
          <button
            type="button"
            className="action-icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Cerca una creazione"
            title="Cerca"
          >
            <Search size={19} strokeWidth={1.5} />
          </button>

          <Link
            href="/compte"
            className="action-icon-btn desktop-only"
            aria-label="Profilo"
            title="Il Mio Account"
          >
            <User size={19} strokeWidth={1.5} />
          </Link>

          <Link
            href="/favoris"
            className="action-icon-btn desktop-only"
            aria-label="Preferiti"
            title="I Tuoi Preferiti"
          >
            <Heart
              size={19}
              strokeWidth={1.5}
              fill={wishlist.length > 0 ? "#C5A880" : "none"}
              color={wishlist.length > 0 ? "#C5A880" : "currentColor"}
            />
            {wishlist.length > 0 && (
              <span className="wishlist-badge">{wishlist.length}</span>
            )}
          </Link>

          {/* Luxury Cart Pill Button */}
          <button
            type="button"
            className={`luxury-cart-pill ${count > 0 ? "has-items" : ""}`}
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label={`Carrello (${count} articoli)`}
          >
            <div className="cart-pill-icon-wrap">
              <ShoppingBag size={17} strokeWidth={1.5} />
              <span className="cart-badge">{count}</span>
            </div>
            {count > 0 && (
              <span className="cart-pill-total-text desktop-only">
                {formatPrice(total)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Live Search Drawer Overlay */}
      {searchOpen && (
        <div className="search-bar-dropdown">
          <div className="search-container">
            <Search size={18} className="search-icon-inside" />
            <input
              type="text"
              placeholder="Cerca felpe oversize, completi, t-shirt, Rebirth..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button
              type="button"
              className="close-search-btn"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              aria-label="Chiudi ricerca"
            >
              <X size={18} />
            </button>
          </div>

          {/* Instant Search Results */}
          {searchQuery.trim() && (
            <div className="search-live-results">
              {searchResults.length > 0 ? (
                <div className="search-results-grid">
                  {searchResults.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/produit/${item.slug}`}
                      className="search-result-card"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <img src={item.image} alt={item.name} />
                      <div className="search-card-info">
                        <span className="search-card-cat">
                          {item.gender} • {item.category}
                        </span>
                        <h4 className="search-card-title">{item.name}</h4>
                        <span className="search-card-price">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="search-no-results">
                  <p>Nessuna creazione trovata per &quot;{searchQuery}&quot;.</p>
                  <Link
                    href="/collections"
                    className="search-explore-all"
                    onClick={() => setSearchOpen(false)}
                  >
                    Esplora tutta la Rebirth Collection &rarr;
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      </div>

      {/* Spacer to prevent content jump behind fixed header */}
      <div className={`site-header-spacer ${isScrolled ? "is-scrolled" : ""}`} />

      {/* Slide-over Luxury Cart Drawer */}
      {isCartDrawerOpen && (
        <div
          className="cart-drawer-backdrop"
          onClick={() => setIsCartDrawerOpen(false)}
        >
          <div
            className="cart-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <div className="drawer-title-wrap">
                <span className="drawer-eyebrow">ARKECH ATELIER</span>
                <h3 className="drawer-title">
                  Il Tuo Carrello ({count} {count > 1 ? "capi" : "capo"})
                </h3>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setIsCartDrawerOpen(false)}
                aria-label="Chiudi carrello"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="drawer-shipping-progress">
              <p className="shipping-progress-text">
                {remainingForFreeShipping === 0 ? (
                  <span className="shipping-unlocked">
                    ✦ Congratulazioni! Spedizione gratuita attiva in tutta Italia.
                  </span>
                ) : (
                  <span>
                    Aggiungi <strong>{formatPrice(remainingForFreeShipping)}</strong> per la spedizione gratuita.
                  </span>
                )}
              </p>
              <div className="shipping-bar-bg">
                <div
                  className="shipping-bar-fill"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Drawer Items */}
            <div className="cart-drawer-body">
              {items.length === 0 ? (
                <div className="drawer-empty-state">
                  <ShoppingBag size={40} strokeWidth={1} />
                  <p>Il tuo carrello è attualmente vuoto.</p>
                  <Link
                    href="/collections"
                    className="drawer-browse-btn"
                    onClick={() => setIsCartDrawerOpen(false)}
                  >
                    Scopri la Rebirth Collection &rarr;
                  </Link>
                </div>
              ) : (
                <div className="drawer-items-list">
                  {items.map((item) => (
                    <div
                      key={item.product.slug + item.size}
                      className="drawer-item-row"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="drawer-item-thumb"
                      />
                      <div className="drawer-item-info">
                        <h4 className="drawer-item-name">{item.product.name}</h4>
                        <p className="drawer-item-meta">
                          Taglia: <span>{item.size}</span>
                        </p>
                        <div className="drawer-item-pricing">
                          <span className="drawer-item-price">
                            {formatPrice(item.product.price * item.qty)}
                          </span>
                          <div className="drawer-qty-stepper">
                            <button
                              type="button"
                              onClick={() =>
                                change(item.product.slug, item.size, item.qty - 1)
                              }
                              aria-label="Diminuisci"
                            >
                              <Minus size={11} />
                            </button>
                            <span>{item.qty}</span>
                            <button
                              type="button"
                              onClick={() =>
                                change(item.product.slug, item.size, item.qty + 1)
                              }
                              aria-label="Aumenta"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="drawer-item-remove"
                        onClick={() => remove(item.product.slug, item.size)}
                        aria-label="Rimuovi"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer with Actions */}
            {items.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="drawer-subtotal-row">
                  <span>Subtotale</span>
                  <span className="drawer-subtotal-val">{formatPrice(total)}</span>
                </div>
                <p className="drawer-shipping-note">
                  Spedizione rapida 24/48h con corriere tracciato in tutta Italia.
                </p>

                <div className="drawer-actions-btns">
                  <Link
                    href="/checkout"
                    className="drawer-checkout-btn"
                    onClick={() => setIsCartDrawerOpen(false)}
                  >
                    <span>PROCEDI AL CHECKOUT</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/panier"
                    className="drawer-view-cart-btn"
                    onClick={() => setIsCartDrawerOpen(false)}
                  >
                    Visualizza il carrello completo
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-links">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link
              href="/collections?cat=donna"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donna
            </Link>
            <Link
              href="/collections?cat=uomo"
              onClick={() => setMobileMenuOpen(false)}
            >
              Uomo
            </Link>
            <Link
              href="/collections?cat=completi"
              onClick={() => setMobileMenuOpen(false)}
            >
              Completi Oversize
            </Link>
            <Link href="/collections" onClick={() => setMobileMenuOpen(false)}>
              Tutte le Collezioni
            </Link>
            <Link href="/a-propos" onClick={() => setMobileMenuOpen(false)}>
              Chi Siamo &amp; Atelier
            </Link>
            <Link href="/panier" onClick={() => setMobileMenuOpen(false)}>
              Carrello ({count})
            </Link>
            <Link href="/favoris" onClick={() => setMobileMenuOpen(false)}>
              Preferiti ({wishlist.length})
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contatti
            </Link>
          </div>
          <div className="mobile-drawer-footer">
            <p className="drawer-brand-tag">ARKECH ATELIER</p>
            <p className="muted-text">
              Not Made For Everyone. Made For You.
            </p>
            <a
              href="https://wa.me/393713477509"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-drawer-wa-btn"
            >
              Assistenza WhatsApp: +39 371 347 7509
            </a>
          </div>
        </div>
      )}
    </>
  );
}
