import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly DARK_THEME = 'dark';
  private readonly LIGHT_THEME = 'light';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  // Signal para o tema atual
  public readonly isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    // Aplica o tema inicial
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme(this.isDarkMode());
    }

    // Efeito para aplicar o tema quando mudar
    effect(() => {
      const isDark = this.isDarkMode();
      if (isPlatformBrowser(this.platformId)) {
        this.applyTheme(isDark);
        this.saveTheme(isDark);
      }
    });
  }

  /**
   * Obtém o tema inicial do localStorage ou preferência do sistema
   */
  private getInitialTheme(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      return savedTheme === this.DARK_THEME;
    }

    // Verifica preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }

    return false;
  }

  /**
   * Alterna entre dark e light mode
   */
  public toggleTheme(): void {
    const newValue = !this.isDarkMode();
    this.isDarkMode.set(newValue);
    // Aplica imediatamente para garantir que funcione
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme(newValue);
      this.saveTheme(newValue);
    }
  }

  /**
   * Define o tema explicitamente
   */
  public setTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
  }

  /**
   * Aplica o tema no documento
   */
  private applyTheme(isDark: boolean): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const htmlElement = this.document.documentElement;
    if (isDark) {
      htmlElement.classList.add(this.DARK_THEME);
    } else {
      htmlElement.classList.remove(this.DARK_THEME);
    }
    
    // Força uma atualização do DOM para garantir que o Tailwind detecte a mudança
    htmlElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  /**
   * Salva o tema no localStorage
   */
  private saveTheme(isDark: boolean): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const theme = isDark ? this.DARK_THEME : this.LIGHT_THEME;
    localStorage.setItem(this.THEME_KEY, theme);
  }
}
