# form-filler

form-filler is a modern Angular web application built with Tailwind CSS, featuring dark mode, responsive design, and end-to-end testing with Playwright. The application serves as a starter template showcasing best practices for Angular development.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

- Bootstrap and install dependencies:
  - `npm install` -- takes ~24 seconds on fresh install, ~1-2 seconds on subsequent runs. NEVER CANCEL. Set timeout to 60+ seconds.

- Build the application:
  - `npm run build -- --configuration development` -- takes ~4-5 seconds. Use for local development.
  - `npm run build` -- FAILS due to Google Fonts network blocking. Do not use in restricted environments.

- Run the development server:
  - `npm start` -- starts dev server on http://localhost:4200, takes ~4-5 seconds to build. NEVER CANCEL. Set timeout to 60+ seconds.
  - Application includes hot reload and watch mode enabled.

- Run unit tests:
  - `npm test -- --watch=false --browsers=ChromeHeadless` -- takes ~4-5 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
  - NOTE: One test currently fails (expects 'Hello, form-filler' but actual content is 'Welcome to form-filler').

- Run end-to-end tests:
  - First install Playwright browsers: `npx playwright install` -- takes several minutes and may fail due to network restrictions. NEVER CANCEL. Set timeout to 900+ seconds.
  - `npm run e2e` -- runs Playwright tests across multiple browsers. NEVER CANCEL. Set timeout to 600+ seconds.
  - Alternative commands: `npm run e2e:headed`, `npm run e2e:debug`, `npm run e2e:ui`

- Code quality and formatting:
  - `npm run format` -- applies Prettier formatting, takes ~1 second.
  - `npm run format:check` -- checks formatting without applying changes.
  - ESLint is NOT configured. Do not attempt to run linting commands.

## Validation

- Always manually validate changes by starting the dev server with `npm start` and browsing to http://localhost:4200
- Test key functionality: navigation between Home and About pages, dark mode toggle, responsive design
- ALWAYS run through at least one complete end-to-end scenario after making changes:
  1. Navigate to home page and verify "Welcome to form-filler" heading displays
  2. Toggle dark mode and verify theme changes from light to dark
  3. Navigate to About page and verify content loads correctly
  4. Test responsive design by resizing browser window
- Always run `npm run format` before committing changes
- Unit tests have known failures - focus on E2E testing for validation

## Common Issues

- **Production build fails**: Google Fonts network blocking causes production builds to fail. Use development builds instead.
- **Playwright browser installation fails**: Network restrictions may prevent browser downloads. Document this limitation.
- **Unit test failures**: App test expects wrong content - this is a known issue, not a regression.
- **NgClass warning**: AppShellComponent has unused NgClass import - this is cosmetic and doesn't affect functionality.

## Repository Structure

The codebase follows Angular standalone component architecture:

### Key Directories
- `src/app/features/` - Feature modules (home, about pages)
- `src/app/layouts/` - Layout components (app-shell with navigation)
- `src/app/shared/` - Reusable UI components (buttons, cards)
- `e2e/` - Playwright end-to-end tests
- `public/` - Static assets

### Important Files
- `package.json` - Dependencies and npm scripts
- `angular.json` - Angular CLI configuration
- `playwright.config.ts` - E2E testing configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## Technology Stack

- **Angular**: Latest version with standalone components and signals
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **Playwright**: Cross-browser E2E testing framework
- **Prettier**: Code formatting (ESLint not configured)
- **Node.js**: Runtime environment (v20.19.4 confirmed working)

## Development Workflow

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Make changes and test in browser at http://localhost:4200
4. Format code: `npm run format`
5. Test changes: Run E2E tests if Playwright browsers are installed
6. Commit changes

## Build Times and Timeouts

- **npm install**: ~24 seconds (fresh install), ~1-2 seconds (subsequent) - use 60+ second timeout
- **Development build**: ~4-5 seconds (use 30+ second timeout)
- **Unit tests**: ~4-5 seconds (use 30+ second timeout)
- **Dev server startup**: ~4-5 seconds (use 60+ second timeout)
- **Playwright browser install**: Several minutes (use 900+ second timeout)
- **E2E tests**: Variable depending on browser count (use 600+ second timeout)

## Application Features

- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **Navigation**: Router-based navigation between Home and About pages
- **Component Library**: Reusable UI components (buttons, cards) with Tailwind styling
- **TypeScript**: Full type safety with Angular's strict mode
- **Testing**: Comprehensive E2E test coverage with Playwright

## Frequently Run Commands

### Repository root structure
```
.
├── README.md
├── angular.json
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── tailwind.config.js
├── src/
├── e2e/
└── public/
```

### package.json scripts (most important)
```json
{
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test",
  "format": "prettier --write 'src/**/*.{ts,html,css,scss,md}'",
  "format:check": "prettier --check 'src/**/*.{ts,html,css,scss,md}'",
  "e2e": "playwright test"
}
```