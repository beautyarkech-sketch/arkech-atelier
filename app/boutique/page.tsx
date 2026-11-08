import ShopGrid from "@/components/ShopGrid";

export default function Page() {
  return (
    <main className="listing">
      <div className="listingHero">
        <p className="eyebrow">ARKECH ATELIER</p>
        <h1>LO SHOP ONLINE</h1>
        <p>Capi in edizione limitata, arricchiti da ricami e dettagli esclusivi.</p>
      </div>
      <ShopGrid />
    </main>
  );
}
