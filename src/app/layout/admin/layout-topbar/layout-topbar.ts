import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { LayoutService2 } from '../../services/layout-service';
import { StaticTranslationsService, SupportedLangCode } from '../../../shared/services/static-translations.service';

@Component({
  imports: [CommonModule, PIcon, ButtonModule, DividerModule],
  selector: 'app-layout-topbar',
  templateUrl: './layout-topbar.html',
  host: {
    class: 'contents',
  },
})
export class LayoutTopbar {
  readonly _layoutService$ = inject(LayoutService2);
  readonly _i18n$ = inject(StaticTranslationsService);

  protected toggleSidebar() {
    this._layoutService$.onMenuToggle(true);
  }

  protected switchLanguage(lang: SupportedLangCode) {
    this._i18n$.changeLanguage(lang);
  }

  protected toggleLanguage() {
    this._i18n$.toggleLanguage();
  }
}
