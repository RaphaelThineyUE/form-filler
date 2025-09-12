# form-filler: AI Agent Coding Guide

This project is a modern Angular web app using Tailwind CSS, Playwright for E2E, and Prettier for formatting. Use these instructions to maximize AI agent productivity and avoid common pitfalls.

## Architecture & Patterns

- **Angular Standalone Components**: No NgModules. Features, layouts, and shared UI are organized under `src/app/`:
  - `features/`: Home, About pages (see `home/`, `about/`)
  - `layouts/`: App shell/navigation (`app-shell/`)
  - `shared/`: Reusable UI (buttons, cards, ninja-console)
- **Tailwind CSS**: Utility-first styling, responsive breakpoints, dark mode via Tailwind and localStorage.
- **Routing**: Defined in `app.routes.ts`. Navigation is router-based.
- **Testing**: E2E with Playwright (`e2e/`), unit tests with Angular TestBed (see known issues below).

## Developer Workflow

- **Install**: `npm install` (never cancel; allow 60+ seconds on first run)
- **Dev Server**: `npm start` (http://localhost:4200, hot reload enabled)
- **Build**: `npm run build -- --configuration development` (do NOT use `npm run build` in restricted networks)
- **Format**: `npm run format` (Prettier only; no ESLint)
- **Unit Tests**: `npm test -- --watch=false --browsers=ChromeHeadless` (one known failing test, not a regression)
- **E2E Tests**: `npx playwright install` (first time, slow), then `npm run e2e`

## Validation Checklist

After any change, always:

1. Start dev server, browse to http://localhost:4200
2. Verify Home page heading: "Welcome to form-filler"
3. Toggle dark mode, confirm theme change
4. Navigate to About page, check content
5. Resize window to test responsive layout
6. Run E2E tests if Playwright browsers are installed
7. Run `npm run format` before commit

## Project-Specific Conventions

- **No NgModules**: Use Angular standalone components only
- **No ESLint**: Do not add or run linting
- **Prettier for all formatting**: Use only `npm run format`/`format:check`
- **Known test failure**: App test expects 'Hello, form-filler' but actual is 'Welcome to form-filler' (ignore)
- **Production build fails**: Google Fonts blocked in some environments; use dev build for all workflows
- **Playwright install may fail**: Network restrictions can block browser downloads; document if so
- **NgClass warning**: Unused import in AppShellComponent is cosmetic

## Key Files & Directories

- `src/app/features/` – Feature pages
- `src/app/layouts/` – App shell/navigation
- `src/app/shared/` – UI components (e.g., `ninja-console`)
- `e2e/` – Playwright E2E tests
- `public/` – Static assets
- `package.json` – Scripts, dependencies
- `angular.json`, `tailwind.config.js`, `playwright.config.ts` – Core configs

## Example Patterns

- **Component**: See `src/app/shared/ui-button/ui-button.component.ts`
- **E2E Test**: See `e2e/app.spec.ts` for navigation and dark mode checks
- **Routing**: See `src/app/app.routes.ts`

---

If any section is unclear or incomplete, please provide feedback for further refinement.
