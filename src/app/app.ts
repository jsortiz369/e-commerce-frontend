import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoaderPage } from './shared/components/loader-page/loader-page';

@Component({
  imports: [RouterOutlet, LoaderPage],
  selector: 'app-root',
  styleUrl: './app.css',
  template: `
    <app-loader-page />
    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal('e-commerce-frontend');
}
