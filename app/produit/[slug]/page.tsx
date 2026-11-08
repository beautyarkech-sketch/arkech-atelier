import { getProduct, products } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  // Related products from same category or gender, excluding current product
  const related = products
    .filter((x) => x.slug !== p.slug && (x.gender === p.gender || x.category === p.category))
    .slice(0, 3);

  const fallbackRelated =
    related.length >= 3
      ? related
      : products.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <main className="product-page-main">
      <ProductDetail product={p} />

      {/* Related Products Section (Ultra-Luxury Haute Couture) */}
      <section className="related-products-section">
        <div className="section-header-centered">
          <p className="section-eyebrow">COMPLETA IL TUO LOOK</p>
          <h2 className="section-title-serif">Capi Correlati &amp; Abbinamenti</h2>
          <p className="section-subtitle">
            Creazioni della Rebirth Collection pensate per coordinarsi alla perfezione con {p.name}.
          </p>
        </div>

        <div className="catalog-grid" style={{ marginTop: "40px" }}>
          {fallbackRelated.map((item) => (
            <ProductCard p={item} key={item.slug} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            href="/collections"
            className="about-outline-btn"
            style={{ display: "inline-flex" }}
          >
            <span>ESPLORA TUTTA LA REBIRTH COLLECTION</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
