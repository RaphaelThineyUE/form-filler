import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass, NgIf],
  template: `
    <div [class.dark]="isDarkMode()">
      <div class="min-h-dvh bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <!-- Header -->
        <header class="bg-brand-500 text-white shadow-lg">
          <div class="mx-auto max-w-7xl px-4 py-4">
            <div class="flex items-center justify-between">
              <!-- Logo -->
              <a routerLink="/" class="text-xl font-bold hover:text-brand-100 transition-colors">
                form-filler
              </a>

              <!-- Desktop Navigation -->
              <nav class="hidden md:flex items-center gap-6">
                <a routerLink="/" class="hover:text-brand-100 transition-colors font-medium"
                  >Home</a
                >
                <a routerLink="/about" class="hover:text-brand-100 transition-colors font-medium"
                  >About</a
                >
                <button
                  class="btn-secondary !py-2 !px-3 !text-xs"
                  (click)="toggleDarkMode()"
                  [attr.aria-label]="isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"
                >
                  <span *ngIf="isDarkMode(); else lightIcon">🌙</span>
                  <ng-template #lightIcon>☀️</ng-template>
                </button>
              </nav>

              <!-- Mobile menu button -->
              <div class="md:hidden flex items-center gap-2">
                <button
                  class="btn-secondary !py-2 !px-3 !text-xs"
                  (click)="toggleDarkMode()"
                  [attr.aria-label]="isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"
                >
                  <span *ngIf="isDarkMode(); else lightIconMobile">🌙</span>
                  <ng-template #lightIconMobile>☀️</ng-template>
                </button>
                <button
                  class="btn-secondary !py-2 !px-3"
                  (click)="toggleMobileMenu()"
                  aria-label="Toggle navigation menu"
                >
                  ☰
                </button>
              </div>
            </div>

            <!-- Mobile Navigation -->
            <nav
              class="md:hidden mt-4 pb-2"
              [class.hidden]="!isMobileMenuOpen()"
              [attr.aria-hidden]="!isMobileMenuOpen()"
            >
              <div class="space-y-2">
                <a
                  routerLink="/"
                  (click)="closeMobileMenu()"
                  class="block py-2 hover:text-brand-100 transition-colors font-medium"
                >
                  Home
                </a>
                <a
                  routerLink="/about"
                  (click)="closeMobileMenu()"
                  class="block py-2 hover:text-brand-100 transition-colors font-medium"
                >
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
  `,
})
export class AppShellComponent implements OnInit {
  isDarkMode = signal<boolean>(false);
  isMobileMenuOpen = signal<boolean>(false);

  ngOnInit() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));
    this.updateDocumentTheme();
  }

  toggleDarkMode() {
    this.isDarkMode.update((current) => !current);
    this.updateDocumentTheme();
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((current) => !current);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  private updateDocumentTheme() {
    document.documentElement.classList.toggle('dark', this.isDarkMode());
  }
}
