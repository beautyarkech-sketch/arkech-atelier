"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ShopGrid() {
  const [filter, setFilter] = useState("Tutti");
  const filters = ["Tutti", "Uomo", "Donna", "Completi", "T-Shirt"];

  const shown =
    filter === "Tutti"
      ? products
      : filter === "Uomo"
      ? products.filter((p) => p.gender === "Uomo" || p.gender === "Unisex")
      : filter === "Donna"
      ? products.filter((p) => p.gender === "Donna" || p.gender === "Unisex")
      : products.filter((p) => p.category === filter);

  return (
    <>
      <div className="filters">
        {filters.map((f) => (
          <button
            key={f}
            className={filter === f ? "selected" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="productGrid">
        {shown.map((p) => (
          <ProductCard p={p} key={p.slug} />
        ))}
      </div>
    </>
  );
}
