# Apex Motors

The existing Apex Motors design runs on Next.js App Router, React, TypeScript, Tailwind CSS 4, Lucide React and Framer Motion. It exports a frontend-only Fivora DENEB template.

## Development and checks

```sh
npm install
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

On Windows, use `npm.cmd` if PowerShell blocks the npm script shim. The production build writes [out/](./out), which can be served by a static host. There is no production Next.js server or backend API.

## Routes and editable content

The original routes remain: `/`, `/vehicles`, `/vehicles/[slug]`, `/financing`, `/sell-your-car`, `/about`, `/contact` and `/faq`.

Merchant-created vehicles use the exported `/products/detail/?id=VEHICLE_ID` route. This supports vehicles added after the build. Original slug routes remain available for the supplied sample vehicles.

[site-data.json](./src/data/site-data.json) is the shared content source. Vehicles live in `content.catalog.products`; prices are numbers in LKR. It also holds dealership information, FAQs, testimonials and section copy. [fivora-template.json](./fivora-template.json) declares the editor schema and visual-editing contract. The SDK provider handles Merchant Studio messages; catalog updates work through both the shared collection and the platform's root products collection.

Navigation uses Next.js links and URL parameters. Saved vehicles use browser localStorage. Forms validate locally and show demonstration success states. They do not send enquiries. Finance estimates remain illustrative.

The original photography and styling are preserved. Manrope is self-hosted through [deneb-fonts.css](./src/fonts/deneb-fonts.css). Set `NEXT_PUBLIC_BASE_PATH` when building for a subdirectory; Next.js navigation receives logical routes, while local assets receive the deployment prefix.

## Validate and package for Fivora

```sh
npm run validate
npm run package:template
```

Packaging runs the DENEB preflight in an isolated source snapshot, including dependency installation, empty-state and populated-state builds, visual editing, styles and reusable preview checks. Upload the generated ZIP reported by the command. Build and validation reports are local outputs and should not be committed.

The contract merge script runs before build, validate and packaging. [fix-static-segments.js](./scripts/fix-static-segments.js) handles Next.js static-export segment filenames on Windows without patching framework packages.

## 3D model and repository files

The **Toyota Corolla Cross** is the only vehicle with a configured real 3D model. Other vehicles display an unavailable state. The representative model is by Nieve5677 under CC BY; its [source and attribution](https://sketchfab.com/3d-models/cc503d26ea694dce85e7d0f1491b0e30) are also displayed in the viewer. Model year and trim may differ from the listing.

Commit both [toyota-corolla-cross.glb](./public/models/toyota-corolla-cross.glb) and [meshopt_decoder.js](./public/models/meshopt_decoder.js): the viewer needs both at runtime. Commit application source, package and lock files, the template manifest and build scripts. Exclude dependencies, build output, conversion backups, migration-only scripts and generated ZIPs.
