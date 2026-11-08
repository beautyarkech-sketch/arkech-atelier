"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Gem,
  Sparkles,
  Award,
  ShieldCheck,
  Truck,
  MessageCircle,
  Plus,
  Minus,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import ProductCard from "@/components/ProductCard";

const HERO_SLIDES = [
  {
    id: 1,
    slideNum: "01",
    slideLabel: "Tafukt Grey",
    badge: "REBIRTH COLLECTION • N° 01",
    titleTop: "La Rinascita",
    titleMid: "Prende Forma",
    titleItalic: "Tafukt Oversize Grey",
    descriptors: [
      "TESSUTO 360 G/M² PESANTE",
      "RICAMI ARTIGIANALI ARKECH",
      "OVERSIZE LUXURY FIT",
    ],
    ctaText: "SCOPRI IL COMPLETO",
    ctaLink: "/produit/tafukt-hoodie-grey-uomo",
    secondaryCtaText: "COLLEZIONE UOMO",
    secondaryCtaLink: "/collections?cat=uomo",
    tagline: "NOT MADE FOR EVERYONE. MADE FOR YOU.",
    image: "/images/products/IMG_0761.JPEG",
    lookName: "Tafukt Completo Hoodie Grigio",
    lookPrice: "175 €",
    lookThumb: "/images/products/IMG_0761.JPEG",
  },
  {
    id: 2,
    slideNum: "02",
    slideLabel: "Tafukt Nero",
    badge: "REBIRTH COLLECTION • N° 02",
    titleTop: "Eleganza Nera",
    titleMid: "Silhouette Urbana",
    titleItalic: "Tafukt All-Black",
    descriptors: [
      "80% COTONE & 20% RICICLATO",
      "DETTAGLI ESCLUSIVI IN RILIEVO",
      "CONTEMPORARY STREETWEAR",
    ],
    ctaText: "SCOPRI IL COMPLETO",
    ctaLink: "/produit/tafukt-hoodie-black-uomo",
    secondaryCtaText: "TUTTI I COMPLETI",
    secondaryCtaLink: "/collections?cat=completi",
    tagline: "EQUILIBRIO TRA COMFORT E IDENTITÀ",
    image: "/images/products/IMG_0749.JPEG",
    lookName: "Tafukt Completo Hoodie Nero",
    lookPrice: "175 €",
    lookThumb: "/images/products/IMG_0749.JPEG",
  },
  {
    id: 3,
    slideNum: "03",
    slideLabel: "Azar Track",
    badge: "REBIRTH COLLECTION • N° 03",
    titleTop: "Sport Couture",
    titleMid: "Linee Moderne",
    titleItalic: "Azar Full Zip Track",
    descriptors: [
      "100% POLIESTERE RICICLATO",
      "GIACCA COLLO ALTO & PANTALONE",
      "BANDE LATERALI TONO SU TONO",
    ],
    ctaText: "SCOPRI LA TRACKSUIT",
    ctaLink: "/produit/azar-track-black-uomo",
    secondaryCtaText: "ESPLORA LA CAPSULE",
    secondaryCtaLink: "/collections",
    tagline: "DISTINGUERSI ATTRAVERSO I DETTAGLI",
    image: "/images/products/IMG_0764.JPEG",
    lookName: "Azar Track Completo Nero",
    lookPrice: "185 €",
    lookThumb: "/images/products/IMG_0764.JPEG",
  },
  {
    id: 4,
    slideNum: "04",
    slideLabel: "Donna Rebirth",
    badge: "REBIRTH COLLECTION • N° 04",
    titleTop: "Purezza Bio",
    titleMid: "Femminilità Decisa",
    titleItalic: "Tafukt Donna & Crop",
    descriptors: [
      "VESTIBILITÀ OVERSIZE DONNA",
      "COTONE BIOLOGICO PETTINATO",
      "CADUTA MORBIDA & TAGLIO CROPPED",
    ],
    ctaText: "SCOPRI LA LINEA DONNA",
    ctaLink: "/produit/tafukt-hoodie-black-donna",
    secondaryCtaText: "COLLEZIONE DONNA",
    secondaryCtaLink: "/collections?cat=donna",
    tagline: "ESPRIMI LA TUA LIBERTÀ",
    image: "/images/products/IMG_0913.JPEG",
    lookName: "Tafukt Completo Donna Nero",
    lookPrice: "175 €",
    lookThumb: "/images/products/IMG_0913.JPEG",
  },
];

const COLLECTION_HIGHLIGHTS = [
  {
    id: "completi",
    tag: "COMPLETI",
    title: "Tafukt & Azar Track",
    link: "/collections?cat=completi",
    image: "/images/products/IMG_0749.JPEG",
  },
  {
    id: "donna",
    tag: "DONNA",
    title: "Oversize & Crop",
    link: "/collections?cat=donna",
    image: "/images/products/IMG_0913.JPEG",
  },
  {
    id: "uomo",
    tag: "UOMO",
    title: "Rebirth Streetwear",
    link: "/collections?cat=uomo",
    image: "/images/products/IMG_0761.JPEG",
  },
  {
    id: "tshirts",
    tag: "T-SHIRT",
    title: "Itri Organic Cotton",
    link: "/collections?cat=t-shirt",
    image: "/images/products/IMG_0714.JPEG",
  },
  {
    id: "tiziri",
    tag: "CAPSULE",
    title: "Tiziri Crop & Rib",
    link: "/collections?cat=donna",
    image: "/images/products/IMG_0877.JPEG",
  },
  {
    id: "track",
    tag: "TRACKSUIT",
    title: "Azar Sport Elegance",
    link: "/collections?cat=completi",
    image: "/images/products/IMG_0764.JPEG",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [addedDirect, setAddedDirect] = useState(false);

  const { add, formatPrice } = useCart();
  const starProduct = products[0]; // Tafukt Completo Hoodie Grigio

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Auto-advance slides every 7 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[activeSlide];

  const handleQuickAdd = () => {
    add(starProduct, selectedSize, quantity);
    setAddedDirect(true);
    setTimeout(() => setAddedDirect(false), 2200);
  };

  return (
    <main className="home-wrapper">
      {/* 01 -- Ultra-Luxury Hero Section with Cinematic Multi-Slide Backgrounds */}
      <section
        className="hero-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Layered Background Images for Ken Burns Crossfade */}
        <div className="hero-slider-stage">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`hero-slide-layer ${
                activeSlide === idx ? "is-active" : ""
              }`}
              style={{
                backgroundImage: `url('${slide.image}')`,
              }}
            />
          ))}
        </div>

        {/* Cinematic Vignette Overlay */}
        <div className="hero-backdrop" />

        {/* Floating Manual Slide Navigation Arrows */}
        <button
          type="button"
          className="hero-arrow-nav prev"
          onClick={prevSlide}
          aria-label="Slide precedente"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className="hero-arrow-nav next"
          onClick={nextSlide}
          aria-label="Slide successiva"
        >
          <ChevronRight size={22} />
        </button>

        {/* Hero Content Container */}
        <div className="hero-inner">
          <div className="hero-content" key={activeSlide}>
            {/* Top Luxury Kicker Badge */}
            <div className="hero-haute-tag">
              <Sparkles size={12} className="gold-icon" />
              <span>{currentSlide.badge}</span>
            </div>

            {/* Editorial Serif Title */}
            <h1 className="hero-title">
              {currentSlide.titleTop}
              <br />
              {currentSlide.titleMid}
              <br />
              <span className="hero-italic">{currentSlide.titleItalic}</span>
            </h1>

            {/* Luxury Descriptors */}
            <div className="hero-descriptors">
              {currentSlide.descriptors.map((desc, i) => (
                <span key={i} className="descriptor-pill">
                  <span className="desc-dot">✦</span>
                  {desc}
                </span>
              ))}
            </div>

            {/* Slogan Quote */}
            <p className="hero-slogan-quote">
              &ldquo;{currentSlide.tagline}&rdquo;
            </p>

            {/* Dual CTAs */}
            <div className="hero-cta-wrap">
              <Link href={currentSlide.ctaLink} className="hero-btn primary">
                <span>{currentSlide.ctaText}</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href={currentSlide.secondaryCtaLink}
                className="hero-btn secondary"
              >
                <span>{currentSlide.secondaryCtaText}</span>
              </Link>
            </div>
          </div>

          {/* Floating Look Tag Preview (Bottom Right on Desktop) */}
          <Link
            href={currentSlide.ctaLink}
            className="hero-look-tag-pill desktop-only"
            title="Visualizza questo look"
          >
            <img
              src={currentSlide.lookThumb}
              alt={currentSlide.lookName}
              className="look-thumb-mini"
            />
            <div className="look-text-wrap">
              <span className="look-label">LOOK IN EVIDENZA</span>
              <strong className="look-name">{currentSlide.lookName}</strong>
              <span className="look-price">{currentSlide.lookPrice}</span>
            </div>
            <Eye size={16} className="look-icon" />
          </Link>

          {/* Bottom Interactive Progress & Pagination Bar */}
          <div className="hero-footer-bar">
            <div className="hero-slider-timeline">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`timeline-tab-btn ${
                    activeSlide === idx ? "active" : ""
                  }`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slide ${slide.slideNum}: ${slide.slideLabel}`}
                >
                  <div className="timeline-tab-header">
                    <span className="timeline-num">{slide.slideNum}</span>
                    <span className="timeline-name">{slide.slideLabel}</span>
                  </div>
                  <div className="timeline-bar-track">
                    <div
                      className={`timeline-bar-fill ${
                        activeSlide === idx && !isPaused ? "filling" : ""
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>

            <div className="hero-tradition">
              <span className="tradition-line-1">ARKECH ATELIER</span>
              <span className="tradition-line-2">MILANO • REBIRTH 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Atelier Marquee */}
      <div
        className="luxury-commitments-bar"
        style={{ overflow: "hidden", maxWidth: "100%", scrollbarWidth: "none" }}
      >
        <div className="commitments-track">
          <div className="commitment-unit">
            <Sparkles size={14} className="gold-icon" />
            <span>RICAMI E LAVORAZIONI ESCLUSIVE</span>
          </div>
          <span className="commitments-bullet">✦</span>
          <div className="commitment-unit">
            <Truck size={14} className="gold-icon" />
            <span>SPEDIZIONE GRATUITA DA 150 €</span>
          </div>
          <span className="commitments-bullet">✦</span>
          <div className="commitment-unit">
            <Award size={14} className="gold-icon" />
            <span>NOT MADE FOR EVERYONE. MADE FOR YOU.</span>
          </div>
          <span className="commitments-bullet">✦</span>
          <div className="commitment-unit">
            <ShieldCheck size={14} className="gold-icon" />
            <span>RESO FACILE ENTRO 14 GIORNI</span>
          </div>
          <span className="commitments-bullet">✦</span>
          <div className="commitment-unit">
            <MessageCircle size={14} className="gold-icon" />
            <span>ASSISTENZA CLIENTI WHATSAPP VIP</span>
          </div>
        </div>
      </div>

      {/* 02 -- Collections Teaser */}
      <section className="home-collections-section">
        <div className="section-header-centered">
          <p className="section-eyebrow">ESPLORA</p>
          <h2 className="section-title-serif">Le Nostre Collezioni</h2>
          <p className="section-subtitle">
            Capi oversize, ricami sartoriali e silhouette contemporanee.
          </p>

          <div className="collections-filter-pills">
            <Link href="/collections" className="filter-pill active">
              Tutti
            </Link>
            <Link href="/collections?cat=uomo" className="filter-pill">
              Uomo
            </Link>
            <Link href="/collections?cat=donna" className="filter-pill">
              Donna
            </Link>
            <Link href="/collections?cat=completi" className="filter-pill">
              Completi
            </Link>
            <Link href="/collections?cat=t-shirt" className="filter-pill">
              T-Shirt
            </Link>
          </div>
        </div>

        <div className="collections-grid-container">
          {COLLECTION_HIGHLIGHTS.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="collection-card-item"
              aria-label={`${item.tag} ${item.title}`}
            >
              <div className="card-image-wrap">
                <img src={item.image} alt={`${item.tag} ${item.title}`} />
                <div className="card-gradient-overlay" />
                <div className="card-shine-effect" />
                <div className="card-content-overlay">
                  <span className="card-tag">{item.tag}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <span className="card-link">Esplora &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 02.5 -- Curated Iconic Products Grid */}
      <section className="home-bestsellers-section" style={{ padding: "80px 5vw", maxWidth: "1320px", margin: "0 auto" }}>
        <div className="section-header-centered">
          <p className="section-eyebrow">CREAZIONI IN EVIDENZA</p>
          <h2 className="section-title-serif">Rebirth Selection</h2>
          <p className="section-subtitle">
            Completi oversize in cotone biologico 360 g/m² e ricami esclusivi. Edizione limitata.
          </p>
        </div>

        <div className="catalog-grid" style={{ marginTop: "40px" }}>
          {products.slice(0, 6).map((p) => (
            <ProductCard p={p} key={p.slug} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link href="/collections" className="about-outline-btn" style={{ display: "inline-flex" }}>
            <span>SCOPRI TUTTI I CAPI REBIRTH</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* 04 -- About Section */}
      <section className="home-about-section">
        <div className="about-grid-wrapper">
          {/* Left Text */}
          <div className="about-left-col">
            <p className="section-eyebrow">ARKECH ATELIER</p>
            <h2 className="about-heading-serif">
              La Rinascita
              <br />
              Prende Forma
              <br />
              Attraverso lo Stile
            </h2>
            <p className="about-description-text">
              ARKECH ATELIER nasce dall&apos;equilibrio tra comfort, carattere e identità.
              Ogni completo oversize e ogni capo della Rebirth Collection è arricchito da ricami
              e dettagli esclusivi elaborati personalmente dall&apos;atelier. Pensato per chi ama distinguersi
              ed esprimere la propria libertà.
            </p>

            <Link href="/a-propos" className="about-outline-btn">
              <span>LA NOSTRA STORIA</span>
              <ArrowRight size={15} />
            </Link>

            <div className="about-signature-wrap">
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "20px",
                  fontStyle: "italic",
                  color: "var(--color-gold)",
                }}
              >
                Arkech Atelier — Rebirth Collection
              </span>
            </div>
          </div>

          {/* Right Images Duo */}
          <div className="about-right-col">
            <div className="about-image-card">
              <img
                src="/images/products/IMG_0754.JPEG"
                alt="Dettaglio ricamo Arkech Atelier"
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

        {/* Bottom Banner Words */}
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

      {/* 03 -- Featured Star Product Preview */}
      <section className="home-featured-product">
        <div className="featured-product-card">
          <div className="featured-product-media">
            <div className="featured-img-container">
              <img src={starProduct.image} alt={starProduct.name} />
              <span className="featured-star-pill">CAPO ICONICO REBIRTH</span>
            </div>

            <div className="product-trust-badges inline-badges">
              <div className="trust-badge-item">
                <Gem size={20} strokeWidth={1.5} className="trust-icon" />
                <span>Design Esclusivo</span>
              </div>
              <div className="trust-badge-item">
                <Sparkles size={20} strokeWidth={1.5} className="trust-icon" />
                <span>Ricami Atelier</span>
              </div>
              <div className="trust-badge-item">
                <Award size={20} strokeWidth={1.5} className="trust-icon" />
                <span>Edizione Limitata</span>
              </div>
            </div>
          </div>

          <div className="featured-product-info">
            <span className="product-badge-pill">{starProduct.badge}</span>
            <h2 className="product-title-serif">{starProduct.name}</h2>
            <div className="product-price-bold">
              {formatPrice(starProduct.price)}
            </div>
            <p className="product-desc-text">{starProduct.description}</p>

            {/* Quick Size Selector */}
            <div className="featured-size-selector">
              <span className="selector-title">Seleziona la taglia:</span>
              <div className="size-chips">
                {starProduct.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`size-chip ${selectedSize === s ? "active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Quick Add */}
            <div className="featured-actions-row">
              <div className="quantity-stepper">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Diminuisci quantità"
                >
                  <Minus size={14} />
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumenta quantità"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                className={`featured-add-cart-btn ${addedDirect ? "added" : ""}`}
                onClick={handleQuickAdd}
              >
                {addedDirect ? (
                  <>
                    <Check size={18} />
                    <span>AGGIUNTO AL CARRELLO</span>
                  </>
                ) : (
                  <>
                    <span>AGGIUNGI AL CARRELLO</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

            <div className="featured-view-more-link">
              <Link href={`/produit/${starProduct.slug}`}>
                Visualizza dettagli &amp; galleria completa &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
