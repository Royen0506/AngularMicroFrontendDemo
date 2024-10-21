import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { SidebarModule } from 'primeng/sidebar';

import { SidebarMenu } from '../../models/sidebar-menu.model';
import { LayoutMainComponent } from '../../pages/layout-main/layout-main.component';
import { SidebarService } from '../../services/sidebar.service';
import { StorageService } from '../../../shared/services/storage.service';
import { SystemLocalStorage } from '../../../shared/enums/system-local-storage.enum';

@Component({
  selector: 'app-layout-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarModule],
  templateUrl: './layout-sidebar.component.html',
  styleUrls: ['./layout-sidebar.component.scss'],
})
export class LayoutSidebarComponent implements OnInit, OnDestroy {
  @Input()
  sidebarVisible: boolean = false;

  private readonly _destroying$ = new Subject<void>();

  menuData?: SidebarMenu[];

  constructor(
    public sidebarService: SidebarService,
    public layoutMain: LayoutMainComponent,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    console.log('LayoutSidebarComponent ngOnInit');

    this.sidebarService
      .getMenus()
      .pipe(takeUntil(this._destroying$))
      .subscribe((sidebarMenus) => {
        this.clearIcon(sidebarMenus);
        this.menuData = sidebarMenus;
        // console.log('menuData === ' + JSON.stringify(this.menuData));
        this.setSelected(this.menuData);
      });
  }

  clearIcon(sidebarMenus: SidebarMenu[]) {
    sidebarMenus.forEach((sidebarMenu) => {
      sidebarMenu.icon = '';
      sidebarMenu.selected = false;
      if (sidebarMenu.subMenus) {
        this.clearIcon(sidebarMenu.subMenus);
      }
    });
  }

  /**
   * 設定選單展開的狀態，避免 back 回上一頁或直接開啟某網址，左側選單是縮起來的
   *
   * @param sidebarMenus
   * @returns 是否有選單符合目前 route 的網址
   */
  setSelected(sidebarMenus: SidebarMenu[]): boolean {
    const currentPath = this.router.url;
    let pathMatch = false;
    sidebarMenus.forEach((sidebarMenu) => {
      if (sidebarMenu.path && currentPath.startsWith(sidebarMenu.path)) {
        pathMatch = true;
      } else {
        if (sidebarMenu.subMenus) {
          pathMatch = this.setSelected(sidebarMenu.subMenus);
        }
      }

      if (pathMatch) {
        sidebarMenu.selected = true;
      }
    });
    return pathMatch;
  }

  /** 丟入目前的menuId */
  setSessionMenuId(menuItemId: string): void {
    this.storageService.setSessionStorageItem(
      SystemLocalStorage.REDIRECT_MENUID,
      menuItemId
    );
  }

  // 切換 sidebar step 5 : 用 subject 的 next 方法傳送值，所有訂閱的 observer 就會接收到
  toggleSidebar() {
    console.log(
      'LayoutSidebarComponent: call by app-layout-topbar sidebarToggled Event Binding'
    );
    this.sidebarService.toggleSidebar$.next('toggle');
  }

  hideSidebar() {
    console.log('LayoutSidebarComponent: call by self onHide Event');
    this.sidebarService.toggleSidebar$.next('hide');
  }

  ngOnDestroy() {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
