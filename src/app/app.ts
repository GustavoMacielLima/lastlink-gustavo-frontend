import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './shared/components/toolbar/toolbar';
import { ToastContainer } from './shared/components/toast/toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar, ToastContainer],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('lastlink-frontend-test');
}
