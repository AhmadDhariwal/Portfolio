import { Injectable, computed, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';
const LEGACY_STORAGE_KEY = 'ahmad-portfolio-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly theme = signal<ThemeMode>(this.getInitialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    // Ensure the DOM and meta tags match the initial theme state.
    this.applyTheme(this.theme(), false);

    // Listen for OS/system theme changes when user has not saved an explicit override.
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        try {
          if (!localStorage.getItem(STORAGE_KEY) && !localStorage.getItem(LEGACY_STORAGE_KEY)) {
            const systemTheme: ThemeMode = e.matches ? 'dark' : 'light';
            this.setTheme(systemTheme, false);
          }
        } catch {
          this.setTheme(e.matches ? 'dark' : 'light', false);
        }
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.addListener(handleSystemThemeChange);
      }
    }
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme, true);
  }

  setTheme(newTheme: ThemeMode, saveToStorage = true): void {
    this.theme.set(newTheme);
    this.applyTheme(newTheme, saveToStorage);
  }

  private getInitialTheme(): ThemeMode {
    if (typeof window === 'undefined') {
      return 'light';
    }

    // 1. Check if index.html inline script already stamped data-theme on <html>
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') {
      return attr;
    }

    // 2. Check localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    } catch {
      // Ignore storage errors (e.g. private browsing mode)
    }

    // 3. Fall back to prefers-color-scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  private applyTheme(theme: ThemeMode, saveToStorage: boolean): void {
    if (typeof document === 'undefined') {
      return;
    }

    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    html.style.colorScheme = theme;

    const bgColor = theme === 'dark' ? '#030403' : '#f4f1ea';
    html.style.backgroundColor = bgColor;

    // Update meta theme-color for mobile browser address bars
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', bgColor);
    }

    if (saveToStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Ignore storage errors
      }
    }
  }
}
