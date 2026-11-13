import { Component, computed, HostListener, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayout, SidebarMain } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';

import { LayoutTopbar } from '../layout-topbar/layout-topbar';
import { LayoutSidebar } from '../layout-sidebar/layout-sidebar';
import { LayoutService } from '../../services/layout-service';

@Component({
  imports: [CommonModule, SidebarLayout, SidebarMain, RouterModule, LayoutTopbar, LayoutSidebar],
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
