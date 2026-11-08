"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import ProductCard from "@/components/ProductCard";

const COLLECTION_CARDS = [
  {
    id: "completi",
    tag: "COMPLETI",
    title: "Tafukt & Azar Track",
    image: "/images/products/IMG_0749.JPEG",
    link: "/produit/tafukt-hoodie-black-uomo",
    category: "Completi",
  },
  {
    id: "donna",
    tag: "DONNA",
    title: "Oversize & Crop Silhouette",
    image: "/images/products/IMG_0913.JPEG",
    link: "/produit/tafukt-hoodie-black-donna",
    category: "Donna",
  },
  {
    id: "uomo",
    tag: "UOMO",
    title: "Rebirth Streetwear Style",
    image: "/images/products/IMG_0761.JPEG",
    link: "/produit/tafukt-hoodie-grey-uomo",
    category: "Uomo",
  },
  {
    id: "tshirts",
    tag: "T-SHIRT",
    title: "Itri Organic Cotton",
    image: "/images/products/IMG_0714.JPEG",
    link: "/produit/itri-tshirt-uomo",
    category: "T-Shirt",
  },
  {
    id: "capsule",
    tag: "CAPSULE",
    title: "Tiziri Crop & Rib",
    image: "/images/products/IMG_0877.JPEG",
    link: "/produit/tiziri-crop-tshirt",
    category: "Donna",
  },
  {
    id: "track",
    tag: "TRACKSUIT",
    title: "Azar Sport Elegance",
    image: "/images/products/IMG_0764.JPEG",
    link: "/produit/azar-track-black-uomo",
    category: "Completi",
  },
];

function CollectionsContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const [activeFilter, setActiveFilter] = useState("Tutti");
  const { formatPrice } = useCart();

  useEffect(() => {
    if (catParam) {
      const lower = catParam.toLowerCase();
      if (lower === "uomo" || lower === "homme") setActiveFilter("Uomo");
      else if (lower === "donna" || lower === "femme") setActiveFilter("Donna");
      else if (lower === "completi") setActiveFilter("Completi");
      else if (lower === "t-shirt" || lower === "tshirt" || lower === "tshirts") setActiveFilter("T-Shirt");
    }
  }, [catParam]);

  const filteredProducts =
    activeFilter === "Tutti"
      ? products
      : activeFilter === "Uomo"
      ? products.filter((p) => p.gender === "Uomo" || p.gender === "Unisex")
      : activeFilter === "Donna"
      ? products.filter((p) => p.gender === "Donna" || p.gender === "Unisex")
      : products.filter((p) => p.category === activeFilter);

  return (
    <div className="collections-page-container">
      {/* Section Header */}
      <div className="section-header-centered">
        <p className="section-eyebrow">REBIRTH COLLECTION</p>
        <h1 className="section-title-serif">Le Nostre Collezioni</h1>
        <p className="section-subtitle">
          Not made for everyone. Made for you. Capi oversize dal design contemporaneo, impreziositi da ricami e dettagli esclusivi ARKECH ATELIER.
        </p>

        {/* Filter Pills */}
        <div className="collections-filter-pills">
          {["Tutti", "Uomo", "Donna", "Completi", "T-Shirt"].map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-pill ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="collections-grid-container">
        {COLLECTION_CARDS.map((card) => (
          <Link
            key={card.id}
            href={card.link}
            className="collection-card-item"
            aria-label={`${card.tag} ${card.title}`}
          >
            <div className="card-image-wrap">
              <img src={card.image} alt={`${card.tag} ${card.title}`} />
              <div className="card-gradient-overlay" />
              <div className="card-shine-effect" />
              <div className="card-content-overlay">
                <span className="card-tag">{card.tag}</span>
                <h3 className="card-title">{card.title}</h3>
                <span className="card-link">Scopri i capi &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Products Catalog Listing */}
      <div className="products-catalog-section">
        <div className="catalog-header">
          <div>
            <span className="section-eyebrow">CATALOGO REBIRTH</span>
            <h2 className="catalog-title">Tutti i Capi Disponibili</h2>
          </div>
          <span className="catalog-count">
            {filteredProducts.length}{" "}
            {filteredProducts.length > 1 ? "creazioni" : "creazione"}
          </span>
        </div>

        <div className="catalog-grid">
          {filteredProducts.map((p) => (
            <ProductCard p={p} key={p.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <main className="collections-page-view">
      <Suspense fallback={<div className="loading-state">Caricamento collezioni...</div>}>
        <CollectionsContent />
      </Suspense>
    </main>
  );
}
