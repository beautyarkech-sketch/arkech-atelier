"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Instagram,
  MessageCircle,
  ArrowRight,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Lock,
  Mail,
  Phone,
  Clock,
  CreditCard,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4500);
    }
  };

  return (
    <footer className="luxury-master-footer">
      {/* 01 -- Four Pillars Trust Strip */}
      <div className="footer-pillars-strip">
        <div className="footer-pillars-grid">
          <div className="pillar-item">
            <div className="pillar-icon-wrap">
              <Truck size={22} className="pillar-icon" />
            </div>
            <div className="pillar-content">
              <h4 className="pillar-title">SPEDIZIONE TRACCIATA</h4>
              <p className="pillar-desc">Consegna in 24/48h con corriere in tutta Italia. Gratuita da 150 €.</p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-wrap">
              <RotateCcw size={22} className="pillar-icon" />
            </div>
            <div className="pillar-content">
              <h4 className="pillar-title">RESO & CAMBIO TAGLIA</h4>
              <p className="pillar-desc">14 giorni di tempo per effettuare il cambio taglia o il reso del tuo capo.</p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-wrap">
              <ShieldCheck size={22} className="pillar-icon" />
            </div>
            <div className="pillar-content">
              <h4 className="pillar-title">PAGAMENTI SICURI</h4>
              <p className="pillar-desc">Paga alla consegna (Contrassegno), con Carta di Credito o Bonifico.</p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-wrap">
              <Sparkles size={22} className="pillar-icon" />
            </div>
            <div className="pillar-content">
              <h4 className="pillar-title">EDIZIONE LIMITATA 360 G/M²</h4>
              <p className="pillar-desc">Cotone biologico pettinato, silhouette oversize e ricami sartoriali.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 02 -- Luxury VIP Privilege Newsletter */}
      <div className="footer-newsletter-banner">
        <div className="newsletter-inner-container">
          <div className="newsletter-copy">
            <span className="newsletter-tag">
              <Sparkles size={12} />
              ARKECH PRIVILEGE CLUB
            </span>
            <h3 className="newsletter-headline">
              Unisciti alla Community Esclusiva
            </h3>
            <p className="newsletter-sub">
              Iscriviti per accedere in anteprima ai nuovi drop in serie limitata, inviti riservati e vantaggi dedicati ai clienti dell&apos;Atelier.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form-box">
            <div className="newsletter-input-wrap">
              <Mail size={16} className="newsletter-mail-icon" />
              <input
                type="email"
                placeholder="Inserisci il tuo indirizzo email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email personale per newsletter"
              />
            </div>
            <button
              type="submit"
              className={`newsletter-cta-btn ${subscribed ? "is-subscribed" : ""}`}
            >
              {subscribed ? (
                <>
                  <Check size={16} />
                  <span>ISCRIZIONE CONFERMATA ✓</span>
                </>
              ) : (
                <>
                  <span>ISCRIVITI</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* 03 -- 4-Column Editorial Links & Contacts */}
      <div className="footer-columns-container">
        {/* Col 1: Maison & Concierge */}
        <div className="footer-col brand-col">
          <Link href="/" className="footer-brand-title">
            <span>ARKECH</span>
            <small>ATELIER • REBIRTH</small>
          </Link>
          <p className="footer-brand-quote">
            &ldquo;Not made for everyone. Made for you.&rdquo;
          </p>
          <p className="footer-brand-manifesto">
            Creazioni dal taglio oversize contemporaneo arricchite da ricami e dettagli esclusivi elaborati personalmente dall&apos;atelier.
          </p>

          <div className="footer-direct-contact">
            <a
              href="https://wa.me/393713477509"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-whatsapp-pill"
            >
              <MessageCircle size={16} />
              <div className="wa-pill-text">
                <span className="wa-pill-label">CONCIERGE WHATSAPP VIP</span>
                <strong className="wa-pill-num">+39 371 347 7509</strong>
              </div>
            </a>
            <div className="footer-contact-item">
              <Clock size={14} className="gold-icon" />
              <span>Attivo 7/7 • Risposta rapida</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={14} className="gold-icon" />
              <span>concierge@arkech-atelier.com</span>
            </div>
          </div>
        </div>

        {/* Col 2: Collezioni */}
        <div className="footer-col">
          <h4 className="footer-col-heading">COLLEZIONI REBIRTH</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/collections?cat=completi">Completi Hoodie &amp; Crewneck</Link>
            </li>
            <li>
              <Link href="/collections?cat=uomo">Collezione Uomo Oversize</Link>
            </li>
            <li>
              <Link href="/collections?cat=donna">Collezione Donna &amp; Cropped</Link>
            </li>
            <li>
              <Link href="/collections?cat=t-shirt">T-Shirt Itri Cotone Bio</Link>
            </li>
            <li>
              <Link href="/collections">Tutte le Creazioni in Serie Limitata</Link>
            </li>
            <li>
              <Link href="/boutique">Boutique &amp; Catalogo Completo</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Servizio Clienti */}
        <div className="footer-col">
          <h4 className="footer-col-heading">SERVIZIO CLIENTI</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/a-propos">La Nostra Storia &amp; Valori</Link>
            </li>
            <li>
              <Link href="/faq">Guida alle Taglie Oversize</Link>
            </li>
            <li>
              <Link href="/faq">Tempi e Costi di Spedizione</Link>
            </li>
            <li>
              <Link href="/faq">Politica di Reso entro 14 Giorni</Link>
            </li>
            <li>
              <Link href="/contact">Contatta il Nostro Atelier</Link>
            </li>
            <li>
              <Link href="/compte">Area Privata &amp; I Miei Ordini</Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Garanzie & Pagamenti */}
        <div className="footer-col">
          <h4 className="footer-col-heading">METODI DI PAGAMENTO</h4>
          <p className="footer-payment-intro">
            Garantiamo la massima flessibilità e sicurezza in tutte le transazioni:
          </p>

          <div className="footer-payment-badges">
            <span className="pay-badge">Contrassegno (in contanti)</span>
            <span className="pay-badge">Visa &amp; Mastercard</span>
            <span className="pay-badge">PostePay</span>
            <span className="pay-badge">Bonifico Bancario</span>
            <span className="pay-badge">Apple Pay</span>
          </div>

          <div className="footer-security-note">
            <Lock size={14} className="gold-icon" />
            <span>Transazioni crittografate SSL 256-bit</span>
          </div>
        </div>
      </div>

      {/* 04 -- Bottom Legal Bar & Socials */}
      <div className="footer-sub-bottom">
        <div className="sub-bottom-inner">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} <strong>ARKECH ATELIER</strong>. Tutti i diritti riservati. Made for you.
          </p>

          <div className="sub-bottom-legal-links">
            <Link href="/faq">Spedizioni</Link>
            <span>•</span>
            <Link href="/faq">Resi e Rimborsi</Link>
            <span>•</span>
            <Link href="/contact">Privacy Policy</Link>
            <span>•</span>
            <Link href="/contact">Termini del Servizio</Link>
          </div>

          <div className="sub-bottom-socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="sub-social-pill"
              aria-label="Instagram ARKECH ATELIER"
              title="Instagram"
            >
              <Instagram size={16} />
              <span>Instagram</span>
            </a>
            <a
              href="https://wa.me/393713477509"
              target="_blank"
              rel="noopener noreferrer"
              className="sub-social-pill whatsapp"
              aria-label="WhatsApp Concierge"
              title="WhatsApp"
            >
              <MessageCircle size={16} />
              <span>WhatsApp VIP</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
