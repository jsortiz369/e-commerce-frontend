import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoaderPage } from './shared/components/loader-page/loader-page';
import { Loader } from './shared/components/loader/loader';
import { ConfirmdialogComponent } from './shared/components/confirmdialog/confirmdialog.component';

@Component({
  imports: [RouterOutlet, LoaderPage, Loader, ConfirmdialogComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  template: `
    <app-loader-page />
    <app-loader />
    <app-confirmdialog />
    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal('e-commerce-frontend');
}
