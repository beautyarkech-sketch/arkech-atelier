import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";

export default function AProposPage() {
  return (
    <main className="about-page-view">
      <div className="about-page-container">
        {/* Main Hero / About Grid */}
        <section className="about-mockup-section">
          <div className="about-grid-wrapper">
            {/* Left Content */}
            <div className="about-left-col">
              <p className="section-eyebrow">CHI SIAMO</p>
              <h1 className="about-heading-serif">
                La Rinascita<br />
                Prende Forma<br />
                Nello Stile
              </h1>

              <p className="about-description-text">
                ARKECH ATELIER nasce dall&apos;equilibrio tra comfort, carattere e identità.
                Pensato per chi ama distinguersi ed esprimere la propria libertà attraverso lo stile contemporaneo.
                Ogni capo della Rebirth Collection è arricchito da ricami e lavorazioni esclusive elaborate personalmente dall&apos;atelier.
              </p>

              <div className="about-actions-row">
                <a href="#la-nostra-storia" className="about-outline-btn">
                  <span>LA NOSTRA STORIA</span>
                  <ArrowRight size={15} />
                </a>
              </div>

              <div className="about-signature-wrap">
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontStyle: "italic", color: "var(--color-gold)" }}>
                  Arkech Atelier — Rebirth Collection
                </span>
              </div>
            </div>

            {/* Right Images Duo */}
            <div className="about-right-col">
              <div className="about-image-card">
                <img
                  src="/images/products/IMG_0754.JPEG"
                  alt="Dettaglio ricami ARKECH ATELIER"
                />
              </div>

              <div className="about-image-card with-caption">
                <img
                  src="/images/products/IMG_0919.JPEG"
                  alt="Azar Tracksuit Rebirth"
                />
                <div className="arch-overlay-text">
                  <span>NOT MADE</span>
                  <span>FOR EVERYONE</span>
                  <span>MADE FOR YOU</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: IDENTITÀ —— COMFORT —— CARATTERE —— LIBERTÀ */}
          <div className="about-bottom-bar">
            <span>IDENTITÀ</span>
            <span className="about-bar-dash">——</span>
            <span>COMFORT</span>
            <span className="about-bar-dash">——</span>
            <span>CARATTERE</span>
            <span className="about-bar-dash">——</span>
            <span>LIBERTÀ</span>
          </div>
        </section>

        {/* Detailed Story Section */}
        <section id="la-nostra-storia" className="about-detailed-story">
          <div className="story-split-grid">
            <div className="story-text-block">
              <span className="section-eyebrow">IL NOSTRO DNA</span>
              <h2 className="story-title-serif">
                Filosofia &amp; Visione
              </h2>
              <p>
                ARKECH ATELIER non è solo un marchio di abbigliamento, è un&apos;espressione di personalità.
                La Rebirth Collection segna un nuovo capitolo dove tagli ampi e rilassati incontrano materiali ricercati:
                cotone pesante a 360 g/m², cotone organico pettinato e fibre riciclate.
              </p>
              <p>
                Crediamo fortemente che lo stile debba trasmettere sicurezza e autenticità.
                I ricami geometrici e le etichette distintive applicate a mano sono la firma che trasforma ogni pezzo in una dichiarazione di appartenenza.
              </p>
            </div>

            <div className="story-values-grid">
              <div className="value-box">
                <Sparkles size={24} strokeWidth={1.5} />
                <h3>Edizioni Limitate</h3>
                <p>
                  Ogni modello viene prodotto in quantità calibrate per garantire unicità ed esclusività assoluta.
                </p>
              </div>

              <div className="value-box">
                <ShieldCheck size={24} strokeWidth={1.5} />
                <h3>Qualità e Dettagli</h3>
                <p>
                  Grammature premium da 360 g/m² e lavorazioni curate personalmente da ARKECH ATELIER.
                </p>
              </div>

              <div className="value-box">
                <HeartHandshake size={24} strokeWidth={1.5} />
                <h3>Sostenibilità</h3>
                <p>
                  Utilizzo di cotone biologico pettinato e poliestere riciclato per un futuro responsabile.
                </p>
              </div>
            </div>
          </div>

          <div className="story-cta-box">
            <h2>Scopri la Rebirth Collection</h2>
            <p>Esplora i completi oversize e le T-shirt esclusive pronte per la spedizione.</p>
            <Link href="/collections" className="story-primary-btn">
              <span>VEDI LA COLLEZIONE</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
