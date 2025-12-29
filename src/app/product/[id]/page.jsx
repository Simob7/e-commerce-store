// app/product/[id]/page.js
import { PRODUCTS } from "@/data/products";
import ProductContent from "@/components/productContent"; // Your current code
import { notFound } from "next/navigation";

// This function generates the SEO tags dynamically
export async function generateMetadata({ params }) {
  const id = Number(params.id);
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return { title: "Product Not Found | ShopHub" };
  }

  return {
    title: `${product.name} | ShopHub`,
    description: product.description.slice(0, 160), // Good length for Google
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }], // Shows image when shared on WhatsApp/Twitter
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default function Page({ params }) {
  const id = Number(params.id);
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) notFound();

  return <ProductContent product={product} params={params} />;
}
