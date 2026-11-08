"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function FavorisPage() {
  const { wishlist } = useCart();

  const wishedProducts = products.filter((p) => wishlist.includes(p.slug));

  if (wishedProducts.length === 0) {
    return (
      <main className="cart-empty-view">
        <div className="empty-box-container">
          <p className="section-eyebrow">I TUOI PREFERITI</p>
          <h1 className="section-title-serif">La tua lista desideri è vuota</h1>
          <p className="empty-desc">
            Salva i capi che ti ispirano per ritrovarli facilmente e monitorare la loro disponibilità.
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
    <main className="collections-page-view">
      <div className="collections-page-container">
        <div className="section-header-centered">
          <p className="section-eyebrow">SELEZIONE PERSONALE</p>
          <h1 className="section-title-serif">I Tuoi Capi Preferiti</h1>
          <p className="section-subtitle">
            {wishedProducts.length}{" "}
            {wishedProducts.length > 1 ? "creazioni salvate" : "creazione salvata"}{" "}
            nel tuo guardaroba Arkech.
          </p>
        </div>

        <div className="catalog-grid" style={{ marginTop: "40px" }}>
          {wishedProducts.map((p) => (
            <ProductCard p={p} key={p.slug} />
          ))}
        </div>
      </div>
    </main>
  );
}
