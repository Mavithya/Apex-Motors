import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

export const metadata: Metadata = {
  title: "Vehicle details",
};

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}