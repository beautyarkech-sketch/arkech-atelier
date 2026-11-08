"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Check, Eye } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function ProductCard({ p }: { p: Product }) {
  const { wishlist, toggleWish, formatPrice, add } = useCart();
  const isWished = wishlist.includes(p.slug);
  const [selectedSize, setSelectedSize] = useState<string>(
    p.sizes && p.sizes.length > 0 ? p.sizes[0] : "M"
  );
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const hoverImg =
    p.image2 || (p.gallery && p.gallery.length > 1 ? p.gallery[1] : p.image);

  // Click on a size chip: ONLY updates the selected size, does NOT add to cart
  const handleSelectSize = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
  };

  // Click on the Add to Cart CTA: Adds the item in the chosen size
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    add(p, selectedSize, 1);
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2200);
    }, 250);
  };

  return (
    <article className="luxury-product-card">
      {/* Visual media container */}
      <div className="card-visual-wrapper">
        <Link
          href={`/produit/${p.slug}`}
          className="card-image-link"
          aria-label={p.name}
        >
          {/* Primary image */}
          <img
            src={p.image}
            alt={p.name}
            className="card-img-primary"
            loading="lazy"
          />

          {/* Secondary hover image for fashion editorial crossfade */}
          {hoverImg && hoverImg !== p.image && (
            <img
              src={hoverImg}
              alt={`${p.name} vista retro o dettaglio`}
              className="card-img-hover"
              loading="lazy"
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="card-top-badges">
          {p.badge && <span className="card-badge-pill">{p.badge}</span>}
          {p.weight && <span className="card-badge-weight">{p.weight}</span>}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className={`card-wishlist-btn ${isWished ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWish(p.slug);
          }}
          aria-label={
            isWished ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
          }
          title={isWished ? "Nei preferiti" : "Aggiungi ai preferiti"}
        >
          <Heart
            size={16}
            fill={isWished ? "#c5a880" : "none"}
            color={isWished ? "#c5a880" : "currentColor"}
          />
        </button>

        {/* Interactive Quick-Buy Size Drawer (slides up on hover) */}
        <div className="card-quick-buy-drawer">
          <div className="quick-buy-header">
            <span>SELEZIONA TAGLIA: <strong>{selectedSize}</strong></span>
            <span className="quick-buy-craft">RICAMI ARKECH</span>
          </div>

          {/* Size selection row: only selects, does not trigger cart increment */}
          <div className="quick-sizes-row">
            {p.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`quick-size-btn ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={(e) => handleSelectSize(e, size)}
                title={`Seleziona taglia ${size}`}
                aria-label={`Taglia ${size}`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Dedicated Add to Cart Button */}
          <button
            type="button"
            className={`card-quick-add-cta ${justAdded ? "added" : ""}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {justAdded ? (
              <>
                <Check size={14} />
                <span>AGGIUNTO IN TAGLIA {selectedSize} ✓</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>AGGIUNGI ({selectedSize}) — {formatPrice(p.price)}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details & Pricing */}
      <div className="card-details-wrapper">
        <div className="card-collection-row">
          <span className="card-gender-tag">
            {p.gender} • {p.category}
          </span>
          {p.color && <span className="card-color-dot" title={p.color} />}
        </div>

        <h3 className="card-product-title">
          <Link href={`/produit/${p.slug}`}>{p.name}</Link>
        </h3>

        <div className="card-price-row">
          <strong className="card-price-main">{formatPrice(p.price)}</strong>
          <span className="card-shipping-perk">Spedizione inclusa</span>
        </div>

        <div className="card-actions-footer">
          <Link href={`/produit/${p.slug}`} className="card-view-detail-link">
            <span>Vedi dettagli</span>
            <Eye size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
