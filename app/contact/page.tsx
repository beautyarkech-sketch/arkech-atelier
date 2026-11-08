"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Clock,
  Instagram,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  Send,
  HelpCircle,
  PhoneCall,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    reason: "taglie",
    subject: "",
    message: "",
    preferWhatsApp: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate luxury instant dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="contact-page-wrapper">
      {/* Editorial Page Header */}
      <section className="contact-hero-banner">
        <div className="contact-hero-container">
          <nav className="contact-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Contatti &amp; Concierge</span>
          </nav>

          <div className="contact-hero-header">
            <div className="contact-eyebrow-badge">
              <Sparkles size={13} className="gold-icon" />
              <span>SERVIZIO CLIENTI VIP &amp; CONCIERGE</span>
            </div>
            <h1 className="contact-main-title">Parla Con l&apos;Atelier</h1>
            <p className="contact-main-subtitle">
              Desideri una consulenza sulle taglie oversize, informazioni sui ricami artigianali
              della <strong>Rebirth Collection</strong> o assistenza personalizzata sul tuo ordine?
              Il team di <strong>ARKECH ATELIER</strong> è al tuo fianco.
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Column Luxury Grid */}
      <section className="contact-content-section">
        <div className="contact-content-container">
          <div className="contact-luxury-grid">
            {/* Left Column: Direct Channels & VIP Concierge */}
            <div className="contact-channels-column">
              {/* Highlighted VIP WhatsApp Card */}
              <div className="contact-vip-card">
                <div className="vip-card-glow-pill">
                  <span className="live-dot" />
                  <span>CONCIERGE ONLINE · RISPOSTA IMMEDIATA</span>
                </div>

                <div className="vip-card-body">
                  <div className="vip-card-icon-wrap">
                    <MessageCircle size={28} />
                  </div>
                  <div>
                    <h3 className="vip-card-title">Assistenza Prioritaria WhatsApp</h3>
                    <p className="vip-card-desc">
                      Il canale più diretto e privilegiato per ricevere foto reali dei capi,
                      video dei dettagli sartoriali o confermare il tuo ordine con pagamento alla consegna.
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/393713477509?text=Buongiorno%20Arkech%20Atelier,%20vorrei%20informazioni%20sulla%20Rebirth%20Collection..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vip-card-button"
                >
                  <MessageCircle size={18} />
                  <span>SCRIVICI SU WHATSAPP (+39 371 347 7509)</span>
                  <ArrowRight size={16} />
                </a>

                <div className="vip-card-footer">
                  <span>Tempo medio di risposta: <strong>&lt; 15 minuti</strong></span>
                </div>
              </div>

              {/* Direct Info Blocks */}
              <div className="contact-info-cards">
                {/* Email Box */}
                <div className="contact-info-card">
                  <div className="info-card-header">
                    <div className="info-icon-badge">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="info-card-title">Canali Email Ufficiali</h4>
                      <p className="info-card-sub">Per corrispondenza formale, ordini speciali e stampa</p>
                    </div>
                  </div>
                  <div className="info-card-content">
                    <div className="email-line">
                      <span className="email-label">Concierge &amp; Informazioni:</span>
                      <a href="mailto:concierge@arkech-atelier.com" className="email-link">
                        concierge@arkech-atelier.com
                      </a>
                    </div>
                    <div className="email-line">
                      <span className="email-label">Ordini, Resi &amp; Spedizioni:</span>
                      <a href="mailto:ordini@arkech-atelier.com" className="email-link">
                        ordini@arkech-atelier.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Opening Hours Box */}
                <div className="contact-info-card">
                  <div className="info-card-header">
                    <div className="info-icon-badge">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="info-card-title">Orari del Servizio Clienti</h4>
                      <p className="info-card-sub">Orario solare / Fuso orario CET (Milano)</p>
                    </div>
                  </div>
                  <div className="info-card-content schedule-list">
                    <div className="schedule-row">
                      <span className="schedule-day">Lunedì – Venerdì:</span>
                      <span className="schedule-hours">09:00 – 19:30</span>
                    </div>
                    <div className="schedule-row">
                      <span className="schedule-day">Sabato:</span>
                      <span className="schedule-hours">10:00 – 18:00</span>
                    </div>
                    <div className="schedule-row">
                      <span className="schedule-day">Domenica &amp; Festivi:</span>
                      <span className="schedule-hours gold-text">WhatsApp Concierge attivo</span>
                    </div>
                  </div>
                </div>

                {/* Social Network Box */}
                <div className="contact-info-card">
                  <div className="info-card-header">
                    <div className="info-icon-badge">
                      <Instagram size={18} />
                    </div>
                    <div>
                      <h4 className="info-card-title">Community &amp; Social</h4>
                      <p className="info-card-sub">Segui le nostre release esclusive e sfilate editoriali</p>
                    </div>
                  </div>
                  <div className="info-card-content social-links-row">
                    <a
                      href="https://instagram.com/arkech_atelier"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-pill"
                    >
                      <Instagram size={15} />
                      <span>@arkech_atelier</span>
                    </a>
                    <a
                      href="https://tiktok.com/@arkech_atelier"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-pill"
                    >
                      <span>TikTok: @arkech_atelier</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Atelier Guarantees Bar */}
              <div className="contact-guarantees-bar">
                <div className="guarantee-pill">
                  <Sparkles size={14} className="gold-icon" />
                  <span>Consulenza su Misura Gratuita</span>
                </div>
                <div className="guarantee-pill">
                  <ShieldCheck size={14} className="gold-icon" />
                  <span>Resi &amp; Cambi Garantiti 14 Giorni</span>
                </div>
                <div className="guarantee-pill">
                  <Truck size={14} className="gold-icon" />
                  <span>Spedizione Espressa 24/48h</span>
                </div>
              </div>
            </div>

            {/* Right Column: Haute Couture Contact Form */}
            <div className="contact-form-column">
              <div className="contact-form-card">
                <div className="form-card-header">
                  <h3 className="form-card-title">Invia una Richiesta all&apos;Atelier</h3>
                  <p className="form-card-sub">
                    Compila i campi sottostanti. Riceverai risposta personalizzata entro poche ore lavorative.
                  </p>
                </div>

                {isSent ? (
                  <div className="form-success-state">
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={42} className="success-icon" />
                    </div>
                    <h4 className="success-title">Richiesta Inviata Con Successo</h4>
                    <p className="success-text">
                      Grazie per aver contattato <strong>ARKECH ATELIER</strong>. Il nostro team
                      ha preso in carico il tuo messaggio e ti risponderà all&apos;indirizzo{" "}
                      <strong>{formData.email || "email indicato"}</strong> nel più breve tempo possibile.
                    </p>
                    <div className="success-actions">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSent(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            orderNumber: "",
                            reason: "taglie",
                            subject: "",
                            message: "",
                            preferWhatsApp: true,
                          });
                        }}
                        className="btn-outline-gold"
                      >
                        INVIA UN ALTRO MESSAGGIO
                      </button>
                      <a
                        href="https://wa.me/393713477509"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-solid-wa"
                      >
                        <MessageCircle size={16} />
                        <span>PASSA A WHATSAPP</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="luxury-contact-form">
                    {/* Row 1: Name & Email */}
                    <div className="form-fields-grid-2">
                      <div className="form-field-group">
                        <label htmlFor="contact-name" className="form-label">
                          Nome e Cognome <span className="req-star">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="es. Alessandro Rossi"
                          className="luxury-input"
                        />
                      </div>

                      <div className="form-field-group">
                        <label htmlFor="contact-email" className="form-label">
                          Indirizzo Email <span className="req-star">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="es. nome@dominio.it"
                          className="luxury-input"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Order Number */}
                    <div className="form-fields-grid-2">
                      <div className="form-field-group">
                        <label htmlFor="contact-phone" className="form-label">
                          Telefono / WhatsApp <span className="opt-tag">(facoltativo)</span>
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="es. +39 340 123 4567"
                          className="luxury-input"
                        />
                      </div>

                      <div className="form-field-group">
                        <label htmlFor="contact-order" className="form-label">
                          Numero Ordine <span className="opt-tag">(se applicabile)</span>
                        </label>
                        <input
                          id="contact-order"
                          name="orderNumber"
                          type="text"
                          value={formData.orderNumber}
                          onChange={handleChange}
                          placeholder="es. #ARK-8492"
                          className="luxury-input"
                        />
                      </div>
                    </div>

                    {/* Row 3: Reason Selection */}
                    <div className="form-field-group">
                      <label htmlFor="contact-reason" className="form-label">
                        Motivo della Richiesta <span className="req-star">*</span>
                      </label>
                      <div className="select-wrapper">
                        <select
                          id="contact-reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          className="luxury-select"
                        >
                          <option value="taglie">Guida alle taglie e vestibilità oversize</option>
                          <option value="prodotti">Informazioni sui capi della Rebirth Collection</option>
                          <option value="ordine">Stato dell&apos;ordine o spedizione in corso</option>
                          <option value="resi">Richiesta di reso o cambio taglia (14 giorni)</option>
                          <option value="pagamento">Assistenza pagamento alla consegna (contrassegno)</option>
                          <option value="collaborazione">Collaborazione editoriale / Press</option>
                          <option value="altro">Altro quesito</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Subject */}
                    <div className="form-field-group">
                      <label htmlFor="contact-subject" className="form-label">
                        Oggetto del Messaggio <span className="req-star">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="es. Consiglio taglia Completo Hoodie Grigio..."
                        className="luxury-input"
                      />
                    </div>

                    {/* Row 5: Message */}
                    <div className="form-field-group">
                      <label htmlFor="contact-message" className="form-label">
                        Il tuo Messaggio <span className="req-star">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Descrivi dettagliatamente la tua richiesta, altezza e peso se desideri un consiglio sulla taglia perfetta..."
                        className="luxury-textarea"
                      />
                    </div>

                    {/* WhatsApp Checkbox Option */}
                    <div className="form-checkbox-row">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          name="preferWhatsApp"
                          checked={formData.preferWhatsApp}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              preferWhatsApp: e.target.checked,
                            }))
                          }
                        />
                        <span className="checkmark" />
                        <span className="checkbox-label-text">
                          Desidero ricevere la risposta anche su WhatsApp per velocizzare la conversazione
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="contact-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-dot" />
                          <span>TRASMISSIONE ALL&apos;ATELIER...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>INVIA LA TUA RICHIESTA ALL&apos;ATELIER</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <p className="form-privacy-note">
                      Inviando questo modulo acconsenti al trattamento dei dati personali nel rispetto della privacy policy di ARKECH ATELIER. Nessun dato verrà ceduto a terzi.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Quick Help Cards */}
      <section className="contact-quick-help-section">
        <div className="contact-help-container">
          <div className="help-section-header">
            <span className="help-eyebrow">DOMANDE FREQUENTI</span>
            <h2 className="help-title">Hai Bisogno di una Risposta Immediata?</h2>
            <p className="help-subtitle">
              Trova rapidamente le risposte alle domande più frequenti poste dalla nostra clientela.
            </p>
          </div>

          <div className="help-cards-grid">
            {/* Help Card 1 */}
            <div className="help-card">
              <div className="help-icon-circle">
                <Sparkles size={20} />
              </div>
              <h3 className="help-card-heading">Guida alle Taglie Oversize</h3>
              <p className="help-card-body">
                I capi della <strong>Rebirth Collection</strong> (Hoodie e Crewneck in felpa 360 g/m²) presentano un taglio oversize contemporaneo rilassato. Se preferisci una vestibilità più asciutta, consigliamo una taglia in meno.
              </p>
              <Link href="/faq" className="help-card-link">
                <span>VEDI GUIDA ALLE TAGLIE</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Help Card 2 */}
            <div className="help-card">
              <div className="help-icon-circle">
                <Truck size={20} />
              </div>
              <h3 className="help-card-heading">Spedizioni &amp; Consegne</h3>
              <p className="help-card-body">
                Consegna rapida in 24/48 ore lavorative in tutta Italia con corrieri espressi tracciati (GLS / DHL). La spedizione è completamente gratuita per tutti gli ordini a partire da 150 €.
              </p>
              <Link href="/faq" className="help-card-link">
                <span>INFORMAZIONI SPEDIZIONI</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Help Card 3 */}
            <div className="help-card">
              <div className="help-icon-circle">
                <ShieldCheck size={20} />
              </div>
              <h3 className="help-card-heading">Politica di Reso &amp; Cambi</h3>
              <p className="help-card-body">
                Hai 14 giorni lavorativi dalla data di ricezione per provare i capi e richiedere un cambio taglia gratuito o il rimborso se il capo non soddisfa al 100% le tue aspettative.
              </p>
              <Link href="/faq" className="help-card-link">
                <span>DETTAGLI RESI E RIMBORSI</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
