import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { customerConfigPrimeNG } from '../primeng';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    customerConfigPrimeNG(),
    MessageService,
    ConfirmationService,
  ],
};
