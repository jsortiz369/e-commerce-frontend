import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { Confirmation } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

export type ConfirmSeverity = 'danger' | 'warn' | 'success' | 'info' | 'primary';

@Component({
  imports: [CommonModule, ConfirmDialogModule, ButtonModule, PIcon],
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
})
export class ConfirmdialogComponent {
  private getSeverity(message?: Confirmation): ConfirmSeverity {
    const severity = message?.acceptButtonProps?.severity;
    if (severity === 'danger' || severity === 'warn' || severity === 'success' || severity === 'info') return severity;
    return 'primary';
  }

  resolveIcon(message?: Confirmation): string {
    if (message?.icon) {
      const cleaned = message.icon.replace(/^pi\s+pi-|^pi-/, '').trim();
      if (cleaned) return cleaned;
    }

    switch (this.getSeverity(message)) {
      case 'danger':
        return 'exclamation-triangle';
      case 'warn':
        return 'exclamation-circle';
      case 'success':
        return 'check-circle';
      case 'info':
        return 'info-circle';
      default:
        return 'question-circle';
    }
  }
}
