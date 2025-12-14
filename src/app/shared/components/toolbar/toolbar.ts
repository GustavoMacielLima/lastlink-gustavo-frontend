import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { effect } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule],
  templateUrl: './toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toolbar implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly cdr = inject(ChangeDetectorRef);
  
  public readonly isDarkMode = this.themeService.isDarkMode;

  constructor() {
    // Garante que o componente detecte mudanças no signal
    effect(() => {
      this.isDarkMode();
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}