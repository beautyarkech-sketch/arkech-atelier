"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Lock,
  ArrowRight,
  ShieldCheck,
  Check,
  Truck,
  MessageCircle,
  Building2,
  CreditCard,
} from "lucide-react";
import { useCart } from "./CartProvider";

const ITALIAN_CITIES = [
  { name: "Roma", delay: "Consegna in 24/48h" },
  { name: "Milano", delay: "Consegna in 24/48h" },
  { name: "Napoli", delay: "Consegna in 24/48h" },
  { name: "Torino", delay: "Consegna in 24/48h" },
  { name: "Firenze", delay: "Consegna in 24/48h" },
  { name: "Bologna", delay: "Consegna in 24/48h" },
  { name: "Venezia", delay: "Consegna in 24/48h" },
  { name: "Palermo", delay: "Consegna in 48h" },
  { name: "Genova", delay: "Consegna in 24/48h" },
  { name: "Verona", delay: "Consegna in 24/48h" },
  { name: "Bari", delay: "Consegna in 24/48h" },
  { name: "Catania", delay: "Consegna in 48h" },
  { name: "Altra città in Italia / UE", delay: "Consegna in 48/72h" },
];

export default function Checkout() {
  const { items, total, clear, formatPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | "bank">("cod");
  const [createAccount, setCreateAccount] = useState(false);
  const [city, setCity] = useState("Roma");
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const currentCityObj =
    ITALIAN_CITIES.find((c) => c.name === city) || ITALIAN_CITIES[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paymentText =
    paymentMethod === "cod"
      ? "Contrassegno (Pagamento alla consegna)"
      : paymentMethod === "card"
      ? "Carta di Credito"
      : "Bonifico Bancario";

  const whatsappConfirmLink = encodeURIComponent(
    `Ciao Arkech Atelier, ho appena inoltrato il mio ordine dal sito web.\nNome: ${fullName || "Cliente"}\nCittà: ${city}\nIndirizzo: ${address}\nPagamento: ${paymentText}\nTotale: ${formatPrice(total)}`
  );

  if (submitted) {
    return (
      <main className="checkout-success-view">
        <div className="success-box-card">
          <div className="success-icon-badge">
            <Check size={32} />
          </div>
          <p className="section-eyebrow">ORDINE CONFERMATO</p>
          <h1 className="section-title-serif">Grazie per la tua fiducia</h1>
          <p className="success-desc">
            Il tuo ordine è stato registrato con successo nel nostro atelier. Il nostro team preparerà con cura la tua spedizione e ti contatterà per confermare la tracciabilità del pacco.
          </p>

          <div className="success-order-details">
            <p>
              <strong>Destinatario:</strong> {fullName || "Cliente Arkech"}
            </p>
            <p>
              <strong>Città & Tempi:</strong> {city} ({currentCityObj.delay})
            </p>
            <p>
              <strong>Modalità di pagamento:</strong> {paymentText}
            </p>
          </div>

          <div className="success-actions-row">
            <a
              href={`https://wa.me/393713477509?text=${whatsappConfirmLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="success-whatsapp-btn"
            >
              <MessageCircle size={18} />
              <span>Conferma rapidamente su WhatsApp</span>
            </a>

            <Link href="/" className="checkout-cta-btn">
              <span>TORNA ALLA HOME</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!items.length) {
    return (
      <main className="cart-empty-view">
        <div className="empty-box-container">
          <p className="section-eyebrow">ORDINE</p>
          <h1 className="section-title-serif">La tua selezione è vuota</h1>
          <p className="empty-desc">
            Aggiungi un capo al carrello prima di procedere al pagamento.
          </p>
          <Link href="/collections" className="cart-continue-btn-black">
            <span>ESPLORA LE COLLEZIONI</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page-view">
      <div className="checkout-page-container">
        <form onSubmit={handleSubmit} className="checkout-layout-grid">
          {/* Left Column: Form */}
          <div className="checkout-form-column">
            {/* Informazioni di spedizione */}
            <div className="form-group-section">
              <h2 className="form-section-title">Informazioni di Spedizione</h2>

              <div className="form-row-two-cols">
                <div className="form-field-wrap">
                  <label htmlFor="fullName">Nome e Cognome *</label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="Mario Rossi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="form-field-wrap">
                  <label htmlFor="phone">Numero di Telefono *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+39 3XX XXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field-wrap full-width">
                <label htmlFor="address">Indirizzo e Numero Civico *</label>
                <input
                  id="address"
                  type="text"
                  required
                  placeholder="Via / Piazza, Civico, Scala..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-row-two-cols">
                <div className="form-field-wrap">
                  <label htmlFor="city">Città *</label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="city-select-input"
                  >
                    {ITALIAN_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.delay})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field-wrap">
                  <label htmlFor="postal">CAP *</label>
                  <input
                    id="postal"
                    type="text"
                    required
                    placeholder="00100"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="city-delivery-notice">
                <Truck size={15} className="gold-icon" />
                <span>
                  Stima per {city}: <strong>{currentCityObj.delay}</strong> con corriere tracciato.
                </span>
              </div>

              <label className="checkbox-wrap">
                <input
                  type="checkbox"
                  checked={createAccount}
                  onChange={(e) => setCreateAccount(e.target.checked)}
                />
                <span>Crea un account cliente VIP (facoltativo)</span>
              </label>
            </div>

            {/* Metodo di pagamento */}
            <div className="form-group-section payment-methods-section">
              <h2 className="form-section-title">Metodo di Pagamento</h2>

              {/* Option 1: COD */}
              <div
                className={`payment-option-card ${
                  paymentMethod === "cod" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className="option-radio-icon">
                  {paymentMethod === "cod" ? (
                    <CheckCircle2 size={20} className="radio-active" />
                  ) : (
                    <Circle size={20} className="radio-inactive" />
                  )}
                </div>
                <div className="option-text-desc">
                  <span className="option-main-title">
                    Contrassegno (Pagamento alla consegna)
                  </span>
                  <span className="option-sub-desc">
                    Paga comodamente in contanti direttamente al corriere al momento della consegna.
                  </span>
                </div>
              </div>

              {/* Option 2: Card */}
              <div
                className={`payment-option-card ${
                  paymentMethod === "card" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <div className="option-radio-icon">
                  {paymentMethod === "card" ? (
                    <CheckCircle2 size={20} className="radio-active" />
                  ) : (
                    <Circle size={20} className="radio-inactive" />
                  )}
                </div>
                <div className="option-text-desc">
                  <span className="option-main-title">
                    Carta di Credito / Debito / PostePay
                  </span>
                  <span className="option-sub-desc">
                    Transazione sicura e crittografata a 256 bit (Visa, Mastercard, Amex).
                  </span>
                </div>
              </div>

              {/* Option 3: Bank transfer */}
              <div
                className={`payment-option-card ${
                  paymentMethod === "bank" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("bank")}
              >
                <div className="option-radio-icon">
                  {paymentMethod === "bank" ? (
                    <CheckCircle2 size={20} className="radio-active" />
                  ) : (
                    <Circle size={20} className="radio-inactive" />
                  )}
                </div>
                <div className="option-text-desc">
                  <span className="option-main-title">Bonifico Bancario</span>
                  <span className="option-sub-desc">
                    Riceverai le coordinate bancarie per il bonifico immediato o ordinario.
                  </span>
                </div>
              </div>

              {paymentMethod === "bank" && (
                <div className="bank-details-box">
                  <div className="bank-header-line">
                    <Building2 size={16} />
                    <span>Coordinate Bancarie ARKECH ATELIER</span>
                  </div>
                  <p><strong>Beneficiario:</strong> ARKECH ATELIER</p>
                  <p><strong>IBAN:</strong> IT60 X054 2811 1010 0000 0123 456</p>
                  <p><strong>Causale:</strong> Inserisci il tuo Nome e Cognome</p>
                  <p className="bank-instructions">
                    L&apos;ordine verrà elaborato non appena ricevuto l&apos;accredito o la ricevuta del bonifico via WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* Confirm CTA */}
            <button type="submit" className="confirm-order-btn">
              <span>CONFERMA L&apos;ORDINE</span>
              <ArrowRight size={17} />
            </button>

            {/* Security note */}
            <div className="security-notice">
              <Lock size={15} />
              <span>I tuoi dati personali sono protetti e crittografati</span>
            </div>
          </div>

          {/* Right Column: Order Recap */}
          <aside className="checkout-summary-card">
            <h2 className="summary-title">Il Tuo Ordine</h2>

            <div className="checkout-items-mini-list">
              {items.map((i) => (
                <div
                  key={i.product.slug + i.size}
                  className="mini-checkout-item"
                >
                  <img src={i.product.image} alt={i.product.name} />
                  <div className="mini-item-details">
                    <h4>{i.product.name}</h4>
                    <p>
                      Qtà: {i.qty} · Taglia: {i.size}
                    </p>
                  </div>
                  <span className="mini-item-price">
                    {formatPrice(i.product.price * i.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span className="summary-label">Subtotale</span>
              <span className="summary-value">{formatPrice(total)}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Spedizione</span>
              <span className="summary-value green-text">Gratuita</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row total-row">
              <span className="summary-total-label">Totale</span>
              <span className="summary-total-value">{formatPrice(total)}</span>
            </div>

            <div className="checkout-trust-badge">
              <ShieldCheck size={20} />
              <span>Spedizione rapida e tracciata in tutta Italia</span>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
