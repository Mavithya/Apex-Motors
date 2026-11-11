"use client";

import { useSiteData } from "@deneb-ui/ui";
import { Suspense } from "react";
import { PlatformVehicleDetails } from "@/components/vehicles/PlatformVehicleDetails";

export default function ProductDetailClient() {
  const siteData = useSiteData();

  const subtitle =
    siteData?.content?.common?.loadingVehicleDetails ??
    "Loading vehicle details…";

  return (
    <div data-preview-page-key="products_detail">
      <Suspense
        fallback={
          <p
            className="px-5 py-20"
            role="status" data-preview-static="Vehicle viewer interface"
            data-preview-style-target="products_detail.subtitle"
            data-preview-style-type="text"
          >
            {subtitle}
          </p>
        }
      >
        <PlatformVehicleDetails />
      </Suspense>
    </div>
  );
}
