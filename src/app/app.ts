import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './shared/components/toolbar/toolbar';
import { ToastContainer } from './shared/components/toast/toast-container';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar, ToastContainer],
  templateUrl: './app.html'
})
export class App implements OnInit {
  protected readonly title = signal('lastlink-frontend-test');
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
  }
}
