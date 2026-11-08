"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
  RotateCcw,
  ShieldCheck,
  MessageCircle,
  Tag,
} from "lucide-react";
import { useCart } from "./CartProvider";

export default function CartPage() {
  const { items, total, count, remove, change, formatPrice } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    if (
      promoCode.trim().toUpperCase() === "ARKECH10" ||
      promoCode.trim().toUpperCase() === "REBIRTH10"
    ) {
      setDiscountPercent(10);
      setPromoSuccess("Codice VIP applicato con successo (-10%)");
    } else {
      setPromoError("Codice promozionale non valido o scaduto.");
    }
  };

  const discountAmount = Math.round((total * discountPercent) / 100);
  const finalTotal = Math.max(0, total - discountAmount);

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);
  const freeShippingProgress = Math.min(100, (total / freeShippingThreshold) * 100);

  if (!items.length) {
    return (
      <main className="cart-empty-view">
        <div className="empty-box-container">
          <p className="section-eyebrow">LA TUA SELEZIONE</p>
          <h1 className="section-title-serif">Il tuo carrello è vuoto</h1>
          <p className="empty-desc">
            Esplora le nostre creazioni d&apos;eccezione e i capi in edizione limitata della Rebirth Collection.
          </p>
          <Link href="/collections" className="cart-continue-btn-black">
            <span>SCOPRI LE COLLEZIONI</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page-view">
      <div className="cart-page-container">
        <div className="cart-page-header-row">
          <h1 className="cart-page-heading">
            Il Tuo Carrello ({count} {count > 1 ? "capi" : "capo"})
          </h1>
          <span className="cart-atelier-badge">Rebirth Collection</span>
        </div>

        {/* Free Shipping Notification Banner */}
        <div className="cart-shipping-banner">
          <div className="shipping-banner-info">
            <Truck size={17} className="gold-icon" />
            {remainingForFreeShipping === 0 ? (
              <span>✧ Hai diritto alla spedizione gratuita in tutta Italia!</span>
            ) : (
              <span>
                Aggiungi ancora <strong>{formatPrice(remainingForFreeShipping)}</strong> per la spedizione gratuita!
              </span>
            )}
          </div>
          <div className="shipping-progress-bar-wrap">
            <div
              className="shipping-progress-bar-fill"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="cart-layout-grid">
          {/* Left Column: Cart Items List */}
          <div className="cart-items-column">
            <div className="cart-items-list">
              {items.map((item) => (
                <div
                  key={item.product.slug + item.size}
                  className="cart-item-card"
                >
                  <div className="cart-item-thumb">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>

                  <div className="cart-item-details">
                    <h2 className="cart-item-title">{item.product.name}</h2>
                    {item.product.subtitle && (
                      <p className="cart-item-sub">{item.product.subtitle}</p>
                    )}
                    <p className="cart-item-size">
                      Taglia: <span>{item.size}</span>
                    </p>

                    <div className="cart-item-stepper">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() =>
                          change(item.product.slug, item.size, item.qty - 1)
                        }
                        aria-label="Diminuisci quantità"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="stepper-num">{item.qty}</span>
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() =>
                          change(item.product.slug, item.size, item.qty + 1)
                        }
                        aria-label="Aumenta quantità"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price-side">
                    <div className="cart-item-price">
                      {formatPrice(item.product.price * item.qty)}
                    </div>
                    <button
                      type="button"
                      className="cart-item-trash"
                      onClick={() => remove(item.product.slug, item.size)}
                      aria-label="Rimuovi capo"
                      title="Rimuovi"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-back-link-wrap">
              <Link href="/collections" className="cart-back-link">
                <ArrowLeft size={16} />
                <span>Continua lo shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="cart-summary-column">
            <div className="cart-summary-card">
              <h3 className="summary-title">Riepilogo Ordine</h3>

              <div className="summary-row">
                <span className="summary-label">Subtotale capi ({count})</span>
                <span className="summary-value">{formatPrice(total)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="summary-row" style={{ color: "#2e7d32" }}>
                  <span className="summary-label">Sconto Promozionale (-{discountPercent}%)</span>
                  <span className="summary-value">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="summary-row">
                <span className="summary-label">Spedizione Espresso (GLS/DHL)</span>
                <span className="summary-value">
                  {remainingForFreeShipping === 0 ? (
                    <strong style={{ color: "#2e7d32" }}>Gratuita</strong>
                  ) : (
                    "Inclusa da 150 €"
                  )}
                </span>
              </div>

              <div className="summary-divider" />

              <div className="summary-row total-row">
                <span className="summary-total-label">Totale IVA inclusa</span>
                <span className="summary-total-value">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="promo-code-form">
                <div className="promo-input-row">
                  <div className="promo-input-wrap">
                    <Tag size={14} className="promo-icon" />
                    <input
                      type="text"
                      placeholder="Codice promo (es. ARKECH10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="promo-apply-btn">
                    Applica
                  </button>
                </div>
                {promoSuccess && <p className="promo-msg success">{promoSuccess}</p>}
                {promoError && <p className="promo-msg error">{promoError}</p>}
              </form>

              {/* Checkout CTA */}
              <Link href="/checkout" className="checkout-cta-btn">
                <span>PROCEDI AL PAGAMENTO</span>
                <ArrowRight size={16} />
              </Link>

              {/* Direct WhatsApp Order */}
              <a
                href={`https://wa.me/393713477509?text=${encodeURIComponent(
                  `Ciao Arkech Atelier! Vorrei confermare il mio ordine di ${count} capi per un totale di ${formatPrice(finalTotal)}. Potete assistermi?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cart-whatsapp-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "4px",
                  background: "#25d366",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                <MessageCircle size={15} />
                <span>ORDINA SU WHATSAPP VIP</span>
              </a>

              {/* Trust Badges List */}
              <div className="summary-features-list">
                <div className="feature-item">
                  <Truck size={17} className="feature-icon" />
                  <span>Consegna tracciata in 24/48h in tutta Italia</span>
                </div>
                <div className="feature-item">
                  <RotateCcw size={17} className="feature-icon" />
                  <span>14 giorni per reso e cambio taglia gratuito</span>
                </div>
                <div className="feature-item">
                  <ShieldCheck size={17} className="feature-icon" />
                  <span>Pagamento sicuro alla consegna (Contrassegno)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
