import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  template: `
  <div [class.dark]="isDarkMode()">
    <div class="min-h-dvh bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <!-- Header -->
      <header class="bg-brand-500 text-white shadow-lg">
        <div class="mx-auto max-w-7xl px-4 py-4">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <a routerLink="/" class="text-xl font-bold hover:text-brand-100 transition-colors" (click)="logNavigation('Home', '/')">
              AI Form Filler
            </a>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center gap-6">
              <a routerLink="/" class="hover:text-brand-100 transition-colors font-medium" (click)="logNavigation('Home', '/')">Home</a>
              <a routerLink="/about" class="hover:text-brand-100 transition-colors font-medium" (click)="logNavigation('About', '/about')">About</a>
              <button
                class="btn-secondary !py-2 !px-3 !text-xs"
                (click)="toggleDarkMode()"
                [attr.aria-label]="isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'">
                <span *ngIf="isDarkMode(); else lightIcon">🌙</span>
                <ng-template #lightIcon>☀️</ng-template>
              </button>
            </nav>

            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center gap-2">
              <button
                class="btn-secondary !py-2 !px-3 !text-xs"
                (click)="toggleDarkMode()"
                [attr.aria-label]="isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'">
                <span *ngIf="isDarkMode(); else lightIconMobile">🌙</span>
                <ng-template #lightIconMobile>☀️</ng-template>
              </button>
              <button
                class="btn-secondary !py-2 !px-3"
                (click)="toggleMobileMenu()"
                aria-label="Toggle navigation menu">
                ☰
              </button>
            </div>
          </div>          <!-- Mobile Navigation -->
          <nav
            class="md:hidden mt-4 pb-2"
            [class.hidden]="!isMobileMenuOpen()"
            [attr.aria-hidden]="!isMobileMenuOpen()">
            <div class="space-y-2">
              <a
                routerLink="/"
                (click)="closeMobileMenu(); logNavigation('Home', '/')"
                class="block py-2 hover:text-brand-100 transition-colors font-medium">
                Home
              </a>
              <a
                routerLink="/about"
                (click)="closeMobileMenu(); logNavigation('About', '/about')"
                class="block py-2 hover:text-brand-100 transition-colors font-medium">
                About
              </a>
            </div>
          </nav>
        </div>
      </header>

      <!-- Main Content -->
      <main class="mx-auto max-w-7xl px-4 py-8 min-h-[calc(100dvh-200px)]">
        <router-outlet />
      </main>

      <!-- Footer -->
      <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div class="mx-auto max-w-7xl px-4 py-8">
          <div class="text-center text-sm text-slate-600 dark:text-slate-400">
            <p>Built with ❤️ using Angular + Tailwind CSS</p>
            <p class="mt-1">© 2025 form-filler. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
  `
})
export class AppShellComponent implements OnInit, OnDestroy {
  isDarkMode = signal<boolean>(false);
  isMobileMenuOpen = signal<boolean>(false);
  private componentId = 'AppShellComponent';
  private startTime: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startTime = performance.now();
    console.log(`🏗️ [${this.componentId}] Layout component initialized`, {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));
    this.updateDocumentTheme();

    // Log theme initialization
    console.log(`🎨 [${this.componentId}] Theme initialized`, {
      initialTheme: this.isDarkMode() ? 'dark' : 'light',
      source: savedTheme ? 'localStorage' : 'system preference',
      systemPrefersDark: prefersDark
    });

    // Subscribe to router events for navigation logging
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log(`🧭 [${this.componentId}] Navigation completed`, {
          from: event.url,
          to: event.urlAfterRedirects,
          timestamp: new Date().toISOString(),
          sessionId: this.getSessionId()
        });
      });
  }

  ngOnDestroy() {
    const destroyTime = performance.now();
    const totalLifetime = destroyTime - this.startTime;

    console.log(`🗑️ [${this.componentId}] Layout component destroyed`, {
      component: this.componentId,
      totalLifetime: `${totalLifetime.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    });
  }

  toggleDarkMode() {
    const previousTheme = this.isDarkMode();
    this.isDarkMode.update(current => !current);
    this.updateDocumentTheme();
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');

    console.log(`🌓 [${this.componentId}] Theme toggled`, {
      from: previousTheme ? 'dark' : 'light',
      to: this.isDarkMode() ? 'dark' : 'light',
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    });
  }

  toggleMobileMenu() {
    const previousState = this.isMobileMenuOpen();
    this.isMobileMenuOpen.update(current => !current);

    console.log(`📱 [${this.componentId}] Mobile menu toggled`, {
      from: previousState ? 'open' : 'closed',
      to: this.isMobileMenuOpen() ? 'open' : 'closed',
      timestamp: new Date().toISOString(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  }

  closeMobileMenu() {
    if (this.isMobileMenuOpen()) {
      this.isMobileMenuOpen.set(false);
      console.log(`📱 [${this.componentId}] Mobile menu closed`, {
        timestamp: new Date().toISOString()
      });
    }
  }

  logNavigation(label: string, path: string) {
    console.log(`🧭 [${this.componentId}] Navigation clicked`, {
      label,
      path,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId(),
      userAgent: navigator.userAgent
    });
  }

  private updateDocumentTheme() {
    document.documentElement.classList.toggle('dark', this.isDarkMode());
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('form-filler-session');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('form-filler-session', sessionId);
    }
    return sessionId;
  }
}
