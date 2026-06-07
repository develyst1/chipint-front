# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run lint         # ESLint via next lint
npm run type-check   # tsc --noEmit (no test runner is configured)
```

No test framework is set up yet. Type-checking is the primary correctness gate.

## Architecture

### Stack
Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Ant Design 6 · TanStack React Query 5 · Axios · lucide-react · clsx

All imports use the `@/*` alias (maps to `src/*`). Never use relative cross-directory imports.

### Data flow

```
lib/api/api-main.ts   →   services/*.service.ts   →   hooks/[feature]/use*.ts   →   components/partials/[Feature]/
(typed axios calls)        (map API → app types)        (React Query wrappers)        (UI, "use client")
```

- **`lib/api/api-main.ts`** — one function per endpoint, typed against `types/api/main/`.
- **`services/`** — transform raw API response shapes into cleaner app-domain types. Never put business logic in hooks.
- **`hooks/`** — thin React Query wrappers (`useQuery` / `useMutation`). Export a `QUERY_KEY` constant as `as const`.
- **`components/partials/[Feature]/`** — each feature gets its own directory with: `[Feature]Content.tsx` (the `"use client"` root), sub-components, `[Feature].config.ts` (constants/defaults), and an `index.ts` barrel.

### Two-layer type system

| Layer | Path | Purpose |
|---|---|---|
| API contract | `types/api/main/` | Exact backend response shapes — do not import into UI |
| App domain | `types/app/[feature]/` | Frontend types mapped from API layer; used everywhere else |

Display labels/colors for enums (`RobotTier`, `AiProvider`) live as constants in `types/app/product/index.ts` — `ROBOT_TIER_LABEL` and `AI_PROVIDER_LABEL`. Add new entries there when extending enums.

### State management

- **Server state** — React Query only. `QueryClient` is configured with `staleTime: 0, gcTime: 0`.
- **Cart state** — client-side only via `CartProvider` (React Context + `useState`). The cart API functions in `api-main.ts` exist but are not yet wired up. Free shipping threshold is ฿5,000 in `CartProvider.recalculate`.
- No Redux or Zustand.

### Pages (App Router)

Pages live under `src/app/(public)/` (the public route group). All pages are thin async server components that unpack `params`/`searchParams` and pass them to a `[Feature]Content` client component.

```tsx
// Pattern for all pages
export default async function SomePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SomeContent slug={slug} />;
}
```

### Styling

Tailwind v4 uses CSS-based configuration — theme tokens are defined in `src/app/globals.css` under `@theme { }`, not in a `tailwind.config.ts`. Use the existing CSS custom properties (`--color-primary`, `--shadow-glow`, etc.) and utility classes (`gradient-text`, `card-hover`, `glow-primary`, `bg-grid`) before adding new ones.

**`postcss.config.js` must use CommonJS** (`module.exports = { … }`), not ESM — PostCSS is loaded directly by Node before the bundler runs.

### Ant Design integration

The root layout (`src/app/layout.tsx`) wraps the app in two providers from `src/context/theme/`:

- **`AntdStyleRegistry`** — hand-rolled SSR style registry built on `@ant-design/cssinjs` (already an antd dependency, no extra package needed) following Ant Design's documented App Router setup. Collects CSS-in-JS output during server render and injects it via `useServerInsertedHTML`, preventing FOUC/hydration style mismatches. Must wrap everything that renders Ant Design components.
- **`AntdProvider`** — `ConfigProvider` with the `darkAlgorithm` and custom tokens (primary indigo `#6366f1`, dark surfaces matching the Tailwind `@theme` tokens in `globals.css`). Any Ant Design component used directly automatically picks up this theme. Add Thai locale (`antd/locale/th_TH`) here if a component renders localized text (DatePicker, Pagination, Table, etc.).

### Components

- **`components/ui/`** — thin Ant Design wrappers with project-specific defaults (e.g. `BaseButton` wraps antd `Button`, mapping the domain `variant` prop — `primary | secondary | outline | ghost | danger` — onto antd's `color`+`variant` combo; `BaseBadge` wraps antd `Tag` for hex-based tier/AI-provider color chips). Always prefer these over raw Ant Design primitives or plain HTML elements so theming and sizing stay consistent.
- **`components/layout/`** — Header (sticky, shows cart count from `useCart`) and Footer.
- **`components/partials/`** — feature-level page sections. `"use client"` only where state/effects are needed; everything else is a server component by default.

Every directory exports through an `index.ts` barrel.

### Environment

```
NEXT_PUBLIC_API_BASE_URL   # Backend base URL (default: http://localhost:8080)
```

API base URL falls back to `http://localhost:8080` in `lib/api/client.ts` when the env var is not set.
