import { inject, Service } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng/api';

@Service()
export class AlertsCustomService {
  private readonly _confirmationService$ = inject(ConfirmationService);

  confirm(data: Confirmation) {
    this._confirmationService$.confirm({ ...data });
  }
}
