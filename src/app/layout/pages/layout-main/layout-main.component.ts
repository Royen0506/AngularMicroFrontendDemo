import { debounceTime, fromEvent, Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SidebarService } from '../../services/sidebar.service';
import { LayoutSidebarComponent } from '../../components/layout-sidebar/layout-sidebar.component';
import { LayoutTopbarComponent } from '../../components/layout-topbar/layout-topbar.component';
import { AccessDeniedComponent } from '../../components/access-denied/access-denied.component';
import { ErrorComponent } from '../../components/error/error.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { LoginComponent } from '../../components/login/login.component';


@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutSidebarComponent,
    LayoutTopbarComponent,
    AccessDeniedComponent,
    ErrorComponent,
    NotFoundComponent,
    LoginComponent,
  ],
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss'],
})
export class LayoutMainComponent implements OnInit, OnDestroy {
  // 左側選單是否顯示，會和 p-sidebar 的 visible 做繫結
  sidebarVisible: boolean = true;

  // 是否在小螢幕上
  mobileMode: boolean = false;

  // 用來處理瀏覽器大小改變的事件
  resizeObservable$?: Observable<Event>;
  resizeSubscription$?: Subscription;

  // 用來處理 toggleSidebar 的事件
  toggleSidebarSubscription$?: Subscription;

  private readonly desktopViewportSize: number = 992;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    // 切換 sidebar step 2 : 訂閱 Subject
    this.toggleSidebarSubscription$ =
      this.sidebarService.toggleSidebar$.subscribe(result => {
        // 切換 sidebar step 6 : 收到異動，把值改掉
        // console.log('toggleSidebar mode = ' + result);
        if ('toggle' === result) {
          this.sidebarVisible = !this.sidebarVisible;
        } else if ('hide' === result) {
          this.sidebarVisible = false;
        } else if ('show' === result) {
          this.sidebarVisible = true;
        }
      });

    // 監聽 windows resize 事件
    this.resizeObservable$ = fromEvent(window, 'resize');
    // pipe(debounceTime(200)) 是避免螢幕拖拉一直觸發事件，延遲 0.2 秒才反應
    this.resizeSubscription$ = this.resizeObservable$
      .pipe(debounceTime(200))
      .subscribe(event => {
        if ((event.target as Window).innerWidth < this.desktopViewportSize) {
          this.mobileMode = true;
          this.sidebarVisible = false;
        } else {
          this.mobileMode = false;
          this.sidebarVisible = true;
        }
      });

    // 因為首次開啟瀏覽器沒有改變大小，不會觸發上面的事件，所以要先判斷塞值
    this.mobileMode = window.innerWidth < this.desktopViewportSize;
    this.sidebarVisible = !this.mobileMode;
  }

  ngOnDestroy() {
    this.toggleSidebarSubscription$?.unsubscribe();
    this.resizeSubscription$?.unsubscribe();
  }
}
