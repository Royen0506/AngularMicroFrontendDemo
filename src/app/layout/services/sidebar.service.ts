import { environment } from '@environment';

import { SidebarMenu } from '../models/sidebar-menu.model';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, map} from 'rxjs';
import { Injectable } from '@angular/core';
import { SidebarMenuRep } from '../models/sidebar-menu-rep.model';
import { AuthService } from '../../core/services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // 切換 sidebar step 1 : 先建立一個 Subject
  public toggleSidebar$ = new Subject<string>();

  public sidebarMenus: SidebarMenu[] = [];

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  // TODO 這裡先寫死做為測試，之後要改呼叫後端取得選單
  // getMenus(): Observable<SidebarMenu[]> {
  //   const menu: SidebarMenu[] = [
  //     {
  //       "name": "menu.home",
  //       "icon": "",
  //       "path": "/home",
  //       "selected": false
  //     },
  //     {
  //       "name": "Example",
  //       "icon": "",
  //       "path": "/example",
  //       "selected": false
  //     }
  //   ];

  //   return of(menu);
  // }

  getMenus(): Observable<SidebarMenu[]> {
    let endpoint = `assets/mock/api/v1/auth/current/permissions.json`;
    return this.httpClient
      .get<SidebarMenu[]>(endpoint, {
        params: { UserId: this.authService.getUser().account },
      })
      .pipe(
        map(response => {
          this.sidebarMenus = response;
          return response;
        })
      );
  }

  //  TODO 這邊要再修改
  checkPermission(url: string, menus?: SidebarMenu[]): boolean {
    if (url == '/welcome') {
      return true;
    }

    let datas = menus ? menus : this.sidebarMenus;
    return datas.some(menu => {
      if (menu.path && (url == menu.path || url.startsWith(menu.path + '/'))) {
        return true;
      }

      if (menu.subMenus) {
        return this.checkPermission(url, menu.subMenus);
      }
      return false;
    });
  }

  private transformData(data: SidebarMenuRep[]): SidebarMenu[] {
    const menuMap = new Map<string, SidebarMenu>();

    data.forEach(item => {
      menuMap.set(item.ModuleId, {
        id: item.ModuleId,
        name: item.Name,
        icon: '',
        path: item.Url,
        selected: false,
        subMenus: [],
      });
    });

    // 整理submenus
    data.forEach(item => {
      if (item.ParentId) {
        const parent = menuMap.get(item.ParentId);
        const child = menuMap.get(item.ModuleId);
        if (parent && child) {
          parent.subMenus = parent.subMenus || [];
          parent.subMenus.push(child);
        }
      }
    });

    // 最上層
    const result: SidebarMenu[] = [];
    menuMap.forEach((value, key) => {
      const findKey = data.find(item => item.ModuleId === key);
      if (findKey && !findKey.ParentId) {
        result.push(value);
      }
    });

    // 排序子層
    result.forEach(menu => {
      menu.subMenus?.sort((a, b) => {
        const aSeq = data.find(item => item.ModuleId === a.name)?.OrderSeq ?? 0;
        const bSeq = data.find(item => item.ModuleId === b.name)?.OrderSeq ?? 0;
        return aSeq - bSeq;
      });
    });

    //排序最上層
    return result.sort((a, b) => {
      const aSeq = data.find(item => item.ModuleId === a.name)?.OrderSeq ?? 0;
      const bSeq = data.find(item => item.ModuleId === b.name)?.OrderSeq ?? 0;
      return aSeq - bSeq;
    });
  }
}
