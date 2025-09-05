# Copilot Instructions for Test-Web (Next.js)

## Project Overview
- This is a Next.js app using the app directory structure (`src/app/`).
- Major UI components are in `src/components/`, organized by feature (e.g., `Accordion`, `PrintPDF`, `BlogList`).
- Layouts and shared UI are in `src/layouts/`.
- Business logic and constants are in `src/lib/` and `src/services/`.
- Static assets (images, icons) are in `public/`.

## Developer Workflows
- **Start dev server:** `npm run dev` (see README)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (uses ESLint config in `eslint.config.mjs`)
- **Type-check:** `npm run type-check` (uses `tsconfig.json`)
- **Tailwind CSS:** Configured via `tailwind.config.ts` and `postcss.config.mjs`

## Patterns & Conventions
- **Dynamic imports:** Use `next/dynamic` for code splitting (see `Package.tsx`).
- **Props interfaces:** All major components define explicit TypeScript interfaces for props.
- **Feature folders:** Each feature/component has its own folder under `src/components/`.
- **PDF Generation:** Use `pdf-lib` in `PrintPDF` for custom PDF creation (see `PrintPDF.tsx`).
- **TypeScript strictness:** Many interfaces allow `null | undefined` for optional fields; map these before passing to components that expect stricter types.
- **Routing:** Uses Next.js file-based routing in `src/app/` (e.g., `[slug]/page.tsx`).

## Integration Points
- **External libraries:**
  - `pdf-lib` for PDF generation
  - `next/dynamic` for dynamic imports
  - `tailwindcss` for styling
- **No custom API layer found; network requests handled in `src/services/`**

## Examples
- To fix type mismatches (e.g., `offer_label` in `Pricegroup`), map values to `undefined` if `null` before passing to components.
- For new features, follow the feature-folder pattern in `src/components/` and define clear prop interfaces.

## Key Files & Directories
- `src/app/` — Next.js app directory
- `src/components/` — Feature components
- `src/layouts/` — Shared layouts
- `src/lib/` — Constants and types
- `src/services/` — Network logic
- `public/` — Static assets
- `eslint.config.mjs`, `tailwind.config.ts`, `tsconfig.json` — Project configs

---

If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions.
