export default function Page() {
  const qs = [
    [
      "Quali sono i tempi e i costi di spedizione?",
      "La spedizione è affidata a corrieri espressi tracciati (GLS / DHL) con consegna in 24/48 ore lavorative in tutta Italia. La spedizione è gratuita per tutti gli ordini a partire da 150 €.",
    ],
    [
      "Quali metodi di pagamento accettate?",
      "Offriamo il pagamento alla consegna in contanti (contrassegno), le principali carte di credito/debito e PostePay, oltre al bonifico bancario.",
    ],
    [
      "Come veste la Rebirth Collection?",
      "I nostri completi felpa e pantalone presentano una vestibilità oversize moderna e rilassata. Le guide con altezza modello/modella sono specificate nella pagina di ogni prodotto. Per qualsiasi dubbio puoi scriverci su WhatsApp al +39 371 347 7509.",
    ],
    [
      "Posso effettuare un cambio taglia o un reso?",
      "Certamente. Hai a disposizione 14 giorni lavorativi dalla consegna per richiedere un cambio taglia o un reso se il capo non soddisfa le tue aspettative.",
    ],
    [
      "I capi sono in edizione limitata?",
      "Sì, ogni creazione di ARKECH ATELIER viene prodotta in serie limitata con ricami sartoriali e dettagli esclusivi per garantire autenticità e distinzione.",
    ],
  ];

  return (
    <main className="faq" style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 5vw 100px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p className="section-eyebrow">ASSISTENZA CLIENTI</p>
        <h1 className="section-title-serif">Domande Frequenti &amp; Servizio Concierge</h1>
        <p className="section-subtitle">Tutto ciò che devi sapere su ordini, taglie oversize 360 g/m² e spedizioni in tutta Italia.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {qs.map(([q, a]) => (
          <details
            key={q}
            style={{
              background: "#ffffff",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "20px 24px",
              cursor: "pointer",
            }}
          >
            <summary style={{ fontWeight: 600, fontSize: "15px", color: "var(--color-ink)", outline: "none" }}>
              {q}
            </summary>
            <p style={{ marginTop: "12px", fontSize: "13.5px", color: "#555", lineHeight: 1.7 }}>
              {a}
            </p>
          </details>
        ))}
      </div>
    </main>
  );
}
