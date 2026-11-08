"use client";

import Link from "next/link";
import { Package, MessageCircle, Heart, ArrowRight } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function ComptePage() {
  const { wishlist } = useCart();

  return (
    <main className="collections-page-view">
      <div className="collections-page-container" style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div className="section-header-centered">
          <p className="section-eyebrow">AREA PRIVILEGIATA</p>
          <h1 className="section-title-serif">Il Mio Profilo Cliente</h1>
          <p className="section-subtitle">
            Benvenuto in ARKECH ATELIER. Gestisci i tuoi ordini, i tuoi capi preferiti e i vantaggi esclusivi della Rebirth Collection.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginTop: "40px" }}>
          {/* Card 1: Ordini */}
          <div className="summary-card" style={{ background: "#ffffff", padding: "28px", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
            <Package size={24} style={{ color: "#c5a880", marginBottom: "14px" }} />
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "8px" }}>I Miei Ordini</h3>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", lineHeight: 1.6, marginBottom: "18px" }}>
              Segui in tempo reale la spedizione dei tuoi capi con corriere espresso tracciato 24/48h.
            </p>
            <Link href="/checkout" style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-ink)", textDecoration: "underline" }}>
              Verifica stato ordine &rarr;
            </Link>
          </div>

          {/* Card 2: Wishlist */}
          <div className="summary-card" style={{ background: "#ffffff", padding: "28px", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
            <Heart size={24} style={{ color: "#c5a880", marginBottom: "14px" }} />
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "8px" }}>Capi Preferiti</h3>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", lineHeight: 1.6, marginBottom: "18px" }}>
              Hai {wishlist.length} creazioni salvate nella tua lista dei desideri.
            </p>
            <Link href="/favoris" style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-ink)", textDecoration: "underline" }}>
              Visualizza i tuoi preferiti &rarr;
            </Link>
          </div>

          {/* Card 3: Assistenza VIP */}
          <div className="summary-card" style={{ background: "#ffffff", padding: "28px", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
            <MessageCircle size={24} style={{ color: "#25d366", marginBottom: "14px" }} />
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "8px" }}>Concierge Dedicato</h3>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", lineHeight: 1.6, marginBottom: "18px" }}>
              Un consulente ARKECH ATELIER è a tua completa disposizione 7 giorni su 7 su WhatsApp.
            </p>
            <a
              href="https://wa.me/393713477509"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "12px", fontWeight: 600, color: "#1b4d3e", textDecoration: "underline" }}
            >
              Scrivi su WhatsApp al +39 371 347 7509 &rarr;
            </a>
          </div>
        </div>

        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <Link href="/collections" className="cart-continue-btn-black" style={{ display: "inline-flex" }}>
            <span>SCOPRI TUTTI I CAPI DELLA REBIRTH COLLECTION</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
