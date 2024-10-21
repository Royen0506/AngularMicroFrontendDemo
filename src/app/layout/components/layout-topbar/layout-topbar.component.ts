import { AuthService } from '../../../core/services/auth.service';
import { UserProfile } from '../../../core/models/user-profile.model';
import { Subject } from 'rxjs';

import { LayoutMainComponent } from '../../pages/layout-main/layout-main.component';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { environment } from '@environment';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout-topbar',
  standalone: true,
  imports: [CommonModule, ToolbarModule, BadgeModule, MenuModule, ButtonModule],
  templateUrl: './layout-topbar.component.html',
  styleUrls: ['./layout-topbar.component.scss'],
})
export class LayoutTopbarComponent implements OnInit, OnDestroy {
  // 事件觸發器 (EventEmitter)，透過 @Output() 這個裝飾器將它提供給外部引用
  @Output() sidebarToggled = new EventEmitter<void>();

  isUat: boolean = !environment.production;

  userMenus!: MenuItem[];

  userDisplay: string = '';

  private readonly _destroying$ = new Subject<void>();

  constructor(
    public layoutMain: LayoutMainComponent,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // 從 local storage 取出 user 基本資料, 主要是要取工號和名字
    const userProfile: UserProfile = this.authService.getUser();
    this.userDisplay = `${userProfile.account} ${userProfile.username}`;
    this.userMenus = [
      {
        id: 'btn-logout',
        label: '登出',
        automationId: 'menu.logout',
        command: () => {
          this.authService.logout();
        },
      },
    ];
  }

  // 切換 sidebar step 3 : 按下按鈕後發送一個事件
  toggleSidebar() {
    // 觸發 EventEmitter，it emits events when something happens. The parent binds to that event property and reacts to those events.
    console.log(
      'LayoutTopbarComponent: topbar toggle sidebar button click, emit sidebarToggled event'
    );
    this.sidebarToggled.emit();
  }

  ngOnDestroy() {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
