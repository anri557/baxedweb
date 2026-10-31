import { Suspense } from "react";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  return [
    { slug: "shower-duo" },
    { slug: "heavyweight-tee" },
    { slug: "merino-crew" },
    { slug: "oxford-shirt" },
    { slug: "tapered-chinos" },
    { slug: "washed-denim" },
    { slug: "cargo-joggers" },
    { slug: "bomber-jacket" },
    { slug: "wool-overcoat" },
    { slug: "leather-chelsea" },
    { slug: "minimal-sneaker" },
  ];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "shower-duo";
  const title =
    rawSlug.toLowerCase().includes("shower") || rawSlug === "shower-duo"
      ? "Shower Duo"
      : rawSlug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${title} — BAXED`,
    description: `Shop the essential ${title} crafted for modern menswear styling and everyday fit.`
  };
}

async function ProductDetailLoader({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "shower-duo";
  return <ProductDetailClient slug={slug} />;
}

export default function ProductDetailPage({ params }) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0a0a0a" }} />}>
      <ProductDetailLoader params={params} />
    </Suspense>
  );
}
