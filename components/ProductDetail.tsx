"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Heart,
  Minus,
  Plus,
  ArrowRight,
  Gem,
  Sparkles,
  Award,
  ChevronDown,
  X,
  MessageCircle,
  Truck,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function ProductDetail({ product }: { product: Product }) {
  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image, product.image2 || product.image];

  const thumbnails =
    product.thumbnails && product.thumbnails.length > 0
      ? product.thumbnails
      : images;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[1] || product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Accordion state
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);

  const { add, wishlist, toggleWish, formatPrice } = useCart();
  const isWished = wishlist.includes(product.slug);

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation & body scroll lock when zoomed
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsZoomed(false);
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isZoomed, images.length]);

  const handleAddToCart = () => {
    add(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Ciao Arkech Atelier! Vorrei ordinare la creazione esclusiva "${product.name}" in taglia ${selectedSize} (Quantità: ${quantity}). Potete confermare la disponibilità? Grazie!`
  );

  return (
    <div className="product-view-container">
      {/* Breadcrumb */}
      <nav className="product-breadcrumbs">
        <Link href="/">Home</Link>
        <span className="crumb-sep">&gt;</span>
        <Link href={`/collections?cat=${product.gender.toLowerCase()}`}>
          {product.gender}
        </Link>
        <span className="crumb-sep">&gt;</span>
        <Link href="/collections">{product.category}</Link>
        <span className="crumb-sep">&gt;</span>
        <span className="crumb-current">{product.name}</span>
      </nav>

      <div className="product-layout-grid">
        {/* Left Column: Gallery & Badges */}
        <div className="product-gallery-col">
          <div className="gallery-main-row">
            {/* Vertical Thumbnails */}
            <div className="thumbnails-strip">
              {thumbnails.slice(0, 7).map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumb-button ${
                    activeImageIdx === idx ? "active" : ""
                  }`}
                  onClick={() => setActiveImageIdx(idx % images.length)}
                  aria-label={`Miniatura ${idx + 1}`}
                >
                  <img src={thumb} alt={`${product.name} miniatura ${idx + 1}`} />
                </button>
              ))}
            </div>

            {/* Main Interactive Stage */}
            <div className="main-display-stage">
              <img
                src={images[activeImageIdx % images.length]}
                alt={product.name}
                className="main-showcase-img"
              />

              {/* Prev / Next controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="gallery-nav-btn prev"
                    onClick={prevImage}
                    aria-label="Immagine precedente"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="gallery-nav-btn next"
                    onClick={nextImage}
                    aria-label="Immagine successiva"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Zoom & Wishlist Quick Actions */}
              <div className="main-stage-actions">
                <button
                  type="button"
                  className="stage-action-pill"
                  onClick={() => setIsZoomed(true)}
                  aria-label="Ingrandisci l'immagine a schermo intero"
                  title="Ingrandisci a schermo intero"
                >
                  <Maximize2 size={16} />
                </button>
                <button
                  type="button"
                  className={`stage-action-pill ${isWished ? "is-wished" : ""}`}
                  onClick={() => toggleWish(product.slug)}
                  aria-label={
                    isWished ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
                  }
                  title="Preferiti"
                >
                  <Heart
                    size={16}
                    fill={isWished ? "#C5A880" : "none"}
                    color={isWished ? "#C5A880" : "currentColor"}
                  />
                </button>
              </div>

              {/* Photo Counter Indicator */}
              <div className="stage-photo-counter">
                {(activeImageIdx % images.length) + 1} / {images.length}
              </div>
            </div>
          </div>

          {/* 3 Trust Badges */}
          <div className="trust-badges-strip">
            <div className="trust-badge-item">
              <Gem size={22} strokeWidth={1.4} className="trust-icon" />
              <span>Design Esclusivo</span>
            </div>
            <div className="trust-badge-item">
              <Sparkles size={22} strokeWidth={1.4} className="trust-icon" />
              <span>Fatto a Mano</span>
            </div>
            <div className="trust-badge-item">
              <Award size={22} strokeWidth={1.4} className="trust-icon" />
              <span>Edizione Limitata</span>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Purchase */}
        <div className="product-info-col">
          {product.badge && (
            <div className="product-edition-pill">{product.badge}</div>
          )}

          <h1 className="product-name-serif">{product.name}</h1>

          <div className="product-price-tag">
            {formatPrice(product.price)}
          </div>

          <p className="product-intro-desc">{product.description}</p>

          {/* Scarcity tag */}
          <div className="product-stock-tag">
            <span className="stock-pulse-dot" />
            <span>
              {product.collection} • {product.craft || "Ricami e lavorazioni esclusive ARKECH ATELIER"}
            </span>
          </div>

          {/* Color Display */}
          {product.color && (
            <div className="product-option-section">
              <div className="option-label-row">
                <span className="option-label">Colore</span>
                <span
                  className="size-guide-hint"
                  style={{ fontWeight: 500, color: "var(--color-ink)" }}
                >
                  {product.color}
                </span>
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="product-option-section">
            <div className="option-label-row">
              <span className="option-label">Taglia</span>
              {product.modelInfo && (
                <span className="size-guide-hint">{product.modelInfo}</span>
              )}
            </div>
            <div className="size-buttons-row">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`size-btn ${selectedSize === s ? "active" : ""}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="product-option-section">
            <span className="option-label">Quantità</span>
            <div className="quantity-stepper">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuisci quantità"
              >
                <Minus size={15} />
              </button>
              <span className="qty-number">{quantity}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumenta quantità"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            className={`add-to-cart-cta ${added ? "added-active" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check size={18} />
                <span>AGGIUNTO AL CARRELLO ✓</span>
              </>
            ) : (
              <>
                <span>AGGIUNGI AL CARRELLO</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* WhatsApp Direct Order */}
          <a
            href={`https://wa.me/393713477509?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-order-btn"
          >
            <MessageCircle size={18} />
            <span>Ordina direttamente su WhatsApp</span>
          </a>

          {/* Add to Wishlist */}
          <button
            type="button"
            className="add-to-favorites-btn"
            onClick={() => toggleWish(product.slug)}
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              fill={isWished ? "#C5A880" : "none"}
              color={isWished ? "#C5A880" : "currentColor"}
            />
            <span>
              {isWished ? "Rimuovi dai preferiti" : "Aggiungi ai miei preferiti"}
            </span>
          </button>

          {/* Accordions */}
          <div className="product-accordions-group">
            <div className="accordion-block">
              <button
                type="button"
                className="accordion-trigger"
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                <span>Dettagli del prodotto</span>
                <ChevronDown
                  size={17}
                  className={`acc-chevron ${detailsOpen ? "rotated" : ""}`}
                />
              </button>
              {detailsOpen && (
                <div className="accordion-content">
                  <p>
                    {product.color && (
                      <>
                        • <strong>Colore :</strong> {product.color}
                        <br />
                      </>
                    )}
                    {product.composition && (
                      <>
                        • <strong>Tessuto / Composizione :</strong> {product.composition}
                        <br />
                      </>
                    )}
                    {product.weight && (
                      <>
                        • <strong>Grammatura :</strong> {product.weight}
                        <br />
                      </>
                    )}
                    {product.fit && (
                      <>
                        • <strong>Vestibilità :</strong> {product.fit}
                        <br />
                      </>
                    )}
                    {product.craft && (
                      <>
                        • <strong>Lavorazione :</strong> {product.craft}
                        <br />
                      </>
                    )}
                    {product.modelInfo && (
                      <>
                        • <strong>Guida alla taglia :</strong> {product.modelInfo}
                        <br />
                      </>
                    )}
                    • <strong>Filosofia :</strong> NOT MADE FOR EVERYONE. MADE FOR YOU.
                  </p>
                </div>
              )}
            </div>

            <div className="accordion-block">
              <button
                type="button"
                className="accordion-trigger"
                onClick={() => setShippingOpen(!shippingOpen)}
              >
                <span>Spedizione &amp; Resi</span>
                <ChevronDown
                  size={17}
                  className={`acc-chevron ${shippingOpen ? "rotated" : ""}`}
                />
              </button>
              {shippingOpen && (
                <div className="accordion-content">
                  <p>
                    • Spedizione rapida con corriere espresso tracciato in tutta Italia (24-48 ore).
                    <br />
                    • Spedizione gratuita per tutti gli ordini superiori a 150 €.
                    <br />
                    • Reso o cambio taglia disponibile entro 14 giorni dalla consegna.
                  </p>
                </div>
              )}
            </div>

            <div className="accordion-block">
              <button
                type="button"
                className="accordion-trigger"
                onClick={() => setCareOpen(!careOpen)}
              >
                <span>Cura &amp; Manutenzione</span>
                <ChevronDown
                  size={17}
                  className={`acc-chevron ${careOpen ? "rotated" : ""}`}
                />
              </button>
              {careOpen && (
                <div className="accordion-content">
                  <p>
                    • Lavare a 30°C con ciclo delicato o preferibilmente a mano.
                    <br />
                    • Stirare al rovescio per preservare i ricami e le lavorazioni esclusive.
                    <br />
                    • Non usare asciugatrice e non candeggiare.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Theatre Zoom Modal (Full-Screen Overlay above header) */}
      {isZoomed && (
        <div
          className="lightbox-modal"
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Ingrandimento immagine"
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setIsZoomed(false)}
            aria-label="Chiudi ingrandimento (ESC)"
            title="Chiudi ingrandimento (ESC)"
          >
            <X size={24} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox-nav-btn prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Immagine precedente"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                className="lightbox-nav-btn next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Immagine successiva"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeImageIdx % images.length]}
              alt={product.name}
              className="lightbox-image"
            />
            <div className="lightbox-caption-bar">
              <span className="lightbox-counter-pill">
                {(activeImageIdx % images.length) + 1} / {images.length}
              </span>
              <span>{product.name} — ARKECH ATELIER</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
