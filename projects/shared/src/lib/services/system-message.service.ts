import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { SystemMessageSeverity } from '../enums/system-message-severity.enum';

/**
 * 顯示 PrimeNG 的 Toast Message。
 *
 * @export
 * @class SystemMessageService
 */
@Injectable({
  providedIn: 'root',
})
export class SystemMessageService {
  constructor(private messageService: MessageService) {}

  /**
   * 顯示 Info (藍色) 訊息。
   *
   * @param detail 訊息說明，如果傳 i18n key 會進行翻譯
   * @param data 訊息說明 i18n 參數 String，例: { name: '王小明' }
   * @param sticky 是否持續顯示不會自動消失
   */
  info(detail: string, data?: any, sticky?: boolean) {
    this.addSingle(
      SystemMessageSeverity.INFO,
      '提示',
      detail,
      data,
      sticky ? sticky : false
    );
  }

  /**
   * 顯示 Success (綠色) 訊息。
   *
   * @param detail 訊息說明，如果傳 i18n key 會進行翻譯
   * @param data 訊息說明 i18n 參數 String，例: { name: '王小明' }
   * @param sticky 是否持續顯示不會自動消失
   */
  success(detail: string, data?: any, sticky?: boolean) {
    this.addSingle(
      SystemMessageSeverity.SUCCESS,
      '成功',
      detail,
      data,
      sticky ? sticky : false
    );
  }

  /**
   * 顯示 Warning (黃色) 訊息。
   * 不提供 sticky 參數，警告訊息不會自動消失。
   *
   * @param detail 訊息說明，如果傳 i18n key 會進行翻譯
   * @param data 訊息說明 i18n 參數 String，例: { name: '王小明' }
   * @param sticky 是否持續顯示不會自動消失
   */
  warn(detail: string, data?: any) {
    this.addSingle(SystemMessageSeverity.WARN, '警告', detail, data, true);
  }

  /**
   * 顯示 Error (紅色) 訊息。
   * 不提供 sticky 參數，錯誤訊息不會自動消失。
   *
   * @param detail 訊息說明，如果傳 i18n key 會進行翻譯
   * @param data 訊息說明 i18n 參數 String，例: { name: '王小明' }
   */
  error(detail: string, data?: any) {
    this.addSingle(SystemMessageSeverity.ERROR, '錯誤', detail, data, true);
  }

  /**
   * 顯示一則訊息。
   *
   * @param severity 訊息嚴重性等級. SystemMessageSeverity 有 Success (綠色)、Info (藍色)、Warn (黃色)、Error (紅色)
   * @param summary 訊息標題
   * @param detail 訊息說明
   * @param data 訊息說明參數 String，例: { name: '王小明' }
   * @param sticky 是否持續顯示不會自動消失
   */
  addSingle(
    severity: SystemMessageSeverity,
    summary: string,
    detail: string,
    data?: any,
    sticky?: boolean
  ) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      data: data,
      sticky: sticky,
    });
  }

  /**
   * 顯示多則訊息。
   *
   * @param messages
   */
  addMultiple(messages: Message[]) {
    this.messageService.addAll(messages);
  }

  /**
   * 清除所有的訊息。
   */
  clear() {
    this.messageService.clear();
  }
}
