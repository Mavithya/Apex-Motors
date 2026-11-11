"use client";
import { useSiteData } from "@deneb-ui/ui";
// Reusable skeleton. The static slug page renders without a streaming loading boundary
// so its editable content is present in the exported HTML.
export default function LoadingVehicle() {
  const siteData = useSiteData();
  return (
    <div className="mx-auto min-h-screen max-w-[1320px] px-5 py-10 sm:px-8" role="status" aria-labelledby="label-loading-0"><span id="label-loading-0" className="sr-only" data-preview-static="Accessibility label">Loading vehicle</span>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="aspect-[4/3] bg-stone" />
        <div className="space-y-6 border border-line bg-white p-6">
          <div className="h-8 w-3/4 bg-paper" />
          <div className="h-12 w-2/3 bg-paper" />
          <p
            className="text-sm text-muted"
            data-preview-field-path="common.loadingVehicleDetails"
            data-preview-style-target="common.loadingVehicleDetails"
            data-preview-style-type="text">{siteData?.content?.common?.loadingVehicleDetails ?? "Loading vehicle details…"}</p>
        </div>
      </div>
    </div>
  );
}
