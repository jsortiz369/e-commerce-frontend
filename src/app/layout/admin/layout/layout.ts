import { Component, computed, HostListener, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';

import { LayoutTopbar } from '../layout-topbar/layout-topbar';
import { LayoutSidebar } from '../layout-sidebar/layout-sidebar';
import { LayoutFooter } from '../layout-footer/layout-footer';
import { LayoutService } from '../../services/layout-service';

@Component({
  imports: [CommonModule, SidebarModule, RouterModule, LayoutTopbar, LayoutSidebar, LayoutFooter],
  selector: 'app-layout',
  templateUrl: './layout.html',
})
export class Layout implements OnInit {
  readonly _layoutService$ = inject(LayoutService);

  private readonly _variant$ = computed(() => this._layoutService$.layoutState().variant);

  ngOnInit(): void {
    this._layoutService$.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this._layoutService$.onResize();
  }
}
