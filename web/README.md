# Apex Motors

The Apex Motors Magic Patterns design, migrated into the existing Next.js 16 App Router project with React, TypeScript, Tailwind CSS 4, Lucide React and Framer Motion.

## Run locally

Run commands from this directory:

```sh
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). On Windows, use `npm.cmd` if PowerShell blocks the npm script shim.

```sh
npm run lint
npx tsc --noEmit
npm run build
npm start
```

## Routes and content

- `/` — home
- `/vehicles` — inventory, filters, sorting, new arrivals and saved vehicles
- `/vehicles/[slug]` — matching local vehicle, gallery, enquiry and finance calculator
- `/financing`, `/sell-your-car`, `/about`, `/contact`, `/faq`

Page entry points are in [src/app](./src/app), with shared components in [src/components](./src/components). Edit the sample inventory in [vehicles.ts](./src/data/vehicles.ts), business information and section photos in [dealer.ts](./src/data/dealer.ts), and links in [navigation.ts](./src/data/navigation.ts). FAQs and reviews also live in [src/data](./src/data).

The original Manrope font, colors and Tailwind theme are in [globals.css](./src/app/globals.css). Photography keeps its original Magic Patterns CDN URLs and native image sizing. The existing Tailwind Turbopack integration is retained, so no PostCSS configuration is needed.

Forms validate locally and display demonstration success states. They do not send email or save submissions. Wishlist saves use `apex-motors:wishlist` in localStorage, with an in-memory fallback when storage is unavailable. Applied filters and sort order live in the URL; `?view=saved` shows saved vehicles and `?view=new-arrivals` shows recent arrivals.

## Browser validation

[verify-migration.mjs](./scripts/verify-migration.mjs) checks local data, finance math, all routes, filters, history, wishlist synchronization, forms, gallery controls, responsive widths and CDN images using headless Playwright. Playwright is a separate verification tool and is not an application dependency.

With `playwright-core` available to Node and Microsoft Edge installed, start the app and run:

```sh
node scripts/verify-migration.mjs
```

To use an isolated installation, set `APEX_PLAYWRIGHT_MODULE` to its absolute `playwright-core` package directory. Optional settings:

- `APEX_BASE_URL` — defaults to `http://localhost:3000`; set this to test a production server on another port.
- `APEX_BROWSER_CHANNEL` — defaults to `msedge`; for example, use `chrome` for installed Google Chrome.
- `APEX_BROWSER_PATH` — use a specific installed Chromium executable instead of a channel.
- `APEX_SCREENSHOT_DIR` — save QA screenshots here; defaults to a temporary directory.

The image and font checks require internet access. See [MIGRATION.md](./MIGRATION.md) for the migration inventory and validation results.
