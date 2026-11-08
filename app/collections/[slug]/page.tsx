import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const map: Record<string, { title: string; filter: (p: any) => boolean }> = {
    uomo: {
      title: "COLLEZIONE UOMO",
      filter: (p) => p.gender === "Uomo" || p.gender === "Unisex",
    },
    homme: {
      title: "COLLEZIONE UOMO",
      filter: (p) => p.gender === "Uomo" || p.gender === "Unisex",
    },
    donna: {
      title: "COLLEZIONE DONNA",
      filter: (p) => p.gender === "Donna" || p.gender === "Unisex",
    },
    femme: {
      title: "COLLEZIONE DONNA",
      filter: (p) => p.gender === "Donna" || p.gender === "Unisex",
    },
    completi: {
      title: "COMPLETI OVERSIZE",
      filter: (p) => p.category === "Completi",
    },
    "t-shirt": {
      title: "T-SHIRT REBIRTH",
      filter: (p) => p.category === "T-Shirt",
    },
    rebirth: {
      title: "REBIRTH COLLECTION",
      filter: () => true,
    },
  };

  const item = map[slug.toLowerCase()];
  if (!item) notFound();

  const list = products.filter(item.filter);

  return (
    <main className="listing">
      <div className="listingHero">
        <p className="eyebrow">ARKECH ATELIER</p>
        <h1>{item.title}</h1>
        <p>Not made for everyone. Made for you.</p>
      </div>
      <div className="productGrid">
        {list.map((p) => (
          <ProductCard p={p} key={p.slug} />
        ))}
      </div>
    </main>
  );
}
