import { Injectable } from '@angular/core';

import { ButtonList } from '../models/button-list.model';
import { IdButtonlist } from '../models/id-buttonlist.model';
import { SidebarMenuRep } from '../../layout/models/sidebar-menu-rep.model';
import { AuthButtonEnum } from '../../shared/enums/auth-button.enum';


@Injectable({
  providedIn: 'root',
})
export class AuthMenuService {
  private menu: SidebarMenuRep[] = [];
  getButtonList(id: string): ButtonList {
    if (this.menu) {
      const extractedData = this.menu.map((item: SidebarMenuRep) => {
        return {
          ID: item.ModuleId,
          BUTTON_LIST: item.ButtonList,
        };
      });

      const foundData = extractedData.find(
        (item: IdButtonlist) => item.ID === id
      );
      if (foundData) {
        return {
          query: foundData.BUTTON_LIST.includes(AuthButtonEnum.QUERY),
          create: foundData.BUTTON_LIST.includes(AuthButtonEnum.CREATE),
          update: foundData.BUTTON_LIST.includes(AuthButtonEnum.UPDATE),
          delete: foundData.BUTTON_LIST.includes(AuthButtonEnum.DELETE),
          download: foundData.BUTTON_LIST.includes(AuthButtonEnum.DOWNLOAD),
        };
      }
    }
    return {
      query: false,
      create: false,
      update: false,
      delete: false,
      download: false,
    };
  }
  getIdByUrl(url: string): string {
    return this.menu.find(element => element.Url === url)?.ModuleId ?? '';
  }
}
