# AI Coding Agent Instructions for form-filler

## Project Overview

This is a modern Angular 20+ application with Tailwind CSS for styling, following a feature-based architecture with shared UI components. The app provides form-filling functionality with a responsive design supporting light/dark themes.

## Architecture Patterns

### Feature-Based Structure

```
src/app/
├── features/          # Feature modules (home, about)
├── layouts/           # Layout components (app-shell)
├── shared/            # Reusable UI components (ui-button, ui-card)
├── app.config.ts      # Application configuration
├── app.routes.ts      # Route definitions
└── app.ts            # Root component
```

### Component Organization

- **Standalone Components**: All components use Angular's standalone API
- **Feature Components**: Located in `features/` directory, focused on specific functionality
- **Layout Components**: Handle application shell and navigation structure
- **Shared UI Components**: Reusable design system components in `shared/` directory

## Key Conventions

### 1. Routing Structure

- Uses nested routing with `AppShellComponent` as the layout wrapper
- Route titles follow pattern: `form-filler - {PageName}`
- Default route redirects to home page

### 2. Styling System

- **Tailwind CSS v3.4.17** with custom design tokens
- **Component Classes**: Global component styles defined in `src/styles.css` using `@layer components`
- **Dark Mode**: Implemented via `class` strategy with signal-based state management
- **Custom Brand Colors**: Extended Tailwind theme with brand color palette
- **CSS Variables**: Design tokens defined in `:root` for consistent theming

### 3. Component Patterns

```typescript
// Standard component structure
@Component({
  selector: 'app-[component-name]',
  standalone: true,
  imports: [/* dependencies */],
  templateUrl: './[component-name].component.html',
  styleUrls: ['./[component-name].component.css']
})
```

### 4. UI Component Library

- **Button Variants**: `btn-primary`, `btn-secondary` with consistent styling
- **Input Styling**: Custom `.input` class for form elements
- **Card Component**: `.card` class with hover effects and dark mode support
- **Responsive Design**: Mobile-first approach with `md:` breakpoints

### 5. State Management

- **Signals API**: Used for reactive state (dark mode, mobile menu)
- **Local Storage**: Theme preferences persisted across sessions
- **Signal Methods**: `toggleDarkMode()`, `toggleMobileMenu()` for state updates

## Development Workflow

### Build Commands

```bash
npm start          # Development server on http://localhost:4200
npm run build      # Production build to dist/
npm run test       # Unit tests with Karma
npm run e2e        # E2E tests with Playwright
npm run lint:fix   # ESLint with auto-fix
npm run format     # Prettier formatting
```

### Testing Setup

- **Unit Tests**: Karma + Jasmine in `src/app/app.spec.ts`
- **E2E Tests**: Playwright with cross-browser testing
- **Test Configuration**: `playwright.config.ts` with mobile emulation
- **Web Server**: Auto-starts dev server for e2e tests

### Code Quality

- **Prettier**: Single quotes, 100 char width, Angular HTML parser
- **ESLint**: Integrated with Angular CLI, auto-fix enabled
- **Lint-staged**: Pre-commit hooks for code formatting
- **TypeScript**: Strict mode enabled

### Debugging & Instrumentation

- **Console Ninja**: Use for comprehensive runtime monitoring and debugging
- **Runtime Logs**: Capture console messages, errors, and network requests during development
- **Error Tracking**: Monitor both browser console errors and server-side issues
- **Network Monitoring**: Track API calls and resource loading for performance analysis
- **Debug Workflow**: Start Console Ninja before running `npm start` to capture all application activity

## File Naming Conventions

- Components: `[name].component.ts/html/css`
- Features: `features/[feature-name]/[feature-name].component.*`
- Shared UI: `shared/ui-[component]/[component].component.*`
- Layouts: `layouts/[layout-name]/[layout-name].component.*`

## Key Files to Reference

- `src/styles.css`: Global styles and component classes
- `tailwind.config.js`: Theme extensions and plugin configuration
- `src/app/app.routes.ts`: Route structure and lazy loading setup
- `src/app/layouts/app-shell/app-shell.component.ts`: Main layout with theme logic
- `package.json`: Available scripts and dependencies

## Common Patterns

### Adding New Features

1. Create feature directory in `src/app/features/`
2. Add route to `app.routes.ts` with proper title
3. Import feature component in route configuration
4. Use shared UI components for consistent design

### Creating UI Components

1. Place in `src/app/shared/ui-[name]/`
2. Use standalone component pattern
3. Define styles in global `styles.css` using `@layer components`
4. Support dark mode with `dark:` prefixes
5. Include proper TypeScript inputs for customization

### Theme Implementation

- Check `isDarkMode()` signal for conditional logic
- Use `dark:` prefixes in Tailwind classes
- Update `document.documentElement.classList` for global theme application
- Persist theme preference in localStorage

## Integration Points

- **Tailwind CSS**: PostCSS processing via `postcss.config.js`
- **Angular CLI**: Build system with application builder
- **Playwright**: E2E testing with auto-starting dev server
- **Prettier**: Code formatting with Angular-specific rules

## Performance Considerations

- **Bundle Budgets**: 500KB warning, 1MB error for initial bundle
- **Component Styles**: 4KB warning, 8KB error per component
- **Tree Shaking**: Standalone components enable better optimization
- **Lazy Loading**: Route-based code splitting

When working with this codebase, always reference these patterns and maintain consistency with the established architecture and styling system. Also use Context7</content>
<parameter name="filePath">d:\form-filler\.github\copilot-instructions.md
