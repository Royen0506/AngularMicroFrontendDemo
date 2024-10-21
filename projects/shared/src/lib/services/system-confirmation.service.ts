import { ConfirmationService } from 'primeng/api';
import { Injectable } from '@angular/core';

/**
 * 顯示 PrimeNG 的 ConfirmDialog。
 * 原本想跟 SystemMessageService 寫在一起，但是這樣 SystemMessageService 放到 Interceptor 內會發生錯誤。
 *
 * @export
 * @class SystemConfirmationService
 */
@Injectable({
  providedIn: 'root',
})
export class SystemConfirmationService {
  constructor(private confirmationService: ConfirmationService) {}

  /**
   * 顯示確認是否刪除的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param hint 要刪除的資料關鍵字
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmDelete(
    acceptCallback: Function,
    hint?: string,
    rejectCallback?: Function
  ) {
    if (hint) {
      this.confirm(
        '確認',
        `您確定要刪除「${hint}」這筆資料嗎 ?`,
        'pi pi-info-circle',
        acceptCallback,
        { hint: hint },
        '刪除',
        rejectCallback
      );
    } else {
      this.confirm(
        '確認',
        '您確定要刪除這筆資料嗎 ?',
        'pi pi-info-circle',
        acceptCallback,
        undefined,
        '刪除',
        rejectCallback
      );
    }
  }

  /**
   * 顯示確認是否清除的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param hint 要清除的資料關鍵字
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmClear(
    acceptCallback: Function,
    hint?: string,
    rejectCallback?: Function
  ) {
    if (hint) {
      this.confirm(
        '確認',
        `您確定要清除「${hint}」這筆資料嗎 ?`,
        'pi pi-info-circle',
        acceptCallback,
        { hint: hint },
        '清除',
        rejectCallback
      );
    } else {
      this.confirm(
        '確認',
        `您確定要清除這筆資料嗎 ?`,
        'pi pi-info-circle',
        acceptCallback,
        undefined,
        '清除',
        rejectCallback
      );
    }
  }

  /**
   * 顯示確認是否刪除選取資料的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param num 要刪除的資料筆數
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmDeleteSelected(
    acceptCallback: Function,
    num?: number,
    rejectCallback?: Function
  ) {
    if (num) {
      this.confirm(
        '確認',
        `您確定要刪除選取的 ${num} 筆資料嗎 ?`,
        'pi pi-info-circle',
        acceptCallback,
        { num: num },
        '刪除',
        rejectCallback
      );
    } else {
      this.confirm(
        '確認',
        '您確定要刪除選取的資料嗎 ?',
        'pi pi-info-circle',
        acceptCallback,
        undefined,
        '刪除',
        rejectCallback
      );
    }
  }

  /**
   * 顯示確認是否刪除選取資料的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param num 要刪除的資料筆數
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmDeactivateSelected(
    acceptCallback: Function,
    num?: number,
    rejectCallback?: Function
  ) {
    if (num) {
      this.confirm(
        '確認',
        `您確定要停用選取的 ${num} 筆資料嗎 ?`,
        'pi pi-info-circle',
        acceptCallback,
        { num: num },
        '停用',
        rejectCallback
      );
    } else {
      this.confirm(
        '確認',
        '"您確定要停用選取的資料嗎 ?',
        'pi pi-info-circle',
        acceptCallback,
        undefined,
        '停用',
        rejectCallback
      );
    }
  }

  /**
   * 顯示確認是否刪除選取資料的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param num 要刪除的資料筆數
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmEnableSelected(
    acceptCallback: Function,
    num?: number,
    rejectCallback?: Function
  ) {
    if (num) {
      this.confirm(
        '確認',
        `您確定要啟用選取的 ${num} 筆資料嗎 ?`,
        'pi pi-info-circle',
        acceptCallback,
        { num: num },
        '啟用',
        rejectCallback
      );
    } else {
      this.confirm(
        '確認',
        '您確定要啟用選取的資料嗎 ?',
        'pi pi-info-circle',
        acceptCallback,
        undefined,
        '啟用',
        rejectCallback
      );
    }
  }

  /**
   * 顯示確認是否清除選取資料的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param num 要清除的資料筆數
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmClearSelected(
    acceptCallback: Function,
    num?: number,
    rejectCallback?: Function
  ) {
    if (num) {
      this.confirm(
        '確認',
        `您確定要清除選取的 ${num} 筆資料嗎 ?`,
        'pi pi-info-circle',
        acceptCallback,
        { num: num },
        '清除',
        rejectCallback
      );
    } else {
      this.confirm(
        '確認',
        '您確定要清除選取的資料嗎 ?',
        'pi pi-info-circle',
        acceptCallback,
        undefined,
        '清除',
        rejectCallback
      );
    }
  }

  /**
   * 顯示確認是否清除選取資料的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param num 要清除的資料筆數
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmClearanceSelected(
    acceptCallback: Function,
    num?: number,
    rejectCallback?: Function
  ) {
    if (num) {
      this.confirm(
        '確認',
        `您確定要清空選取的 ${num} 筆資料嗎 ?`,
        'pi pi-info-circle',
        acceptCallback,
        { num: num },
        '清空',
        rejectCallback
      );
    } else {
      this.confirm(
        '確認',
        '您確定要清空選取的資料嗎 ?',
        'pi pi-info-circle',
        acceptCallback,
        undefined,
        '清空',
        rejectCallback
      );
    }
  }

  /***
   * 顯示確認是否執行選取資料的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param action 要執行的動作名稱
   * @param num 要處理的資料筆數
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmExcuteSelected(
    acceptCallback: Function,
    action: string,
    num?: number,
    rejectCallback?: Function
  ) {
    if (num) {
      this.confirm(
        '確認',
        `您確定要對選取的 ${num} 筆資料執行 ${action} 嗎 ?`,
        'pi pi-info-circle',
        acceptCallback,
        { num: num, action: action },
        '執行',
        rejectCallback
      );
    } else {
      this.confirm(
        '確認',
        `您確定要執行 ${action} 嗎 ?`,
        'pi pi-info-circle',
        acceptCallback,
        { action: action },
        '執行',
        rejectCallback
      );
    }
  }

  /**
   * 顯示確認變更未儲存的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmUnsaved(acceptCallback: Function, rejectCallback?: Function) {
    this.confirm(
      '確認',
      '您有未儲存的變更，確定要離開這個頁面嗎 ?',
      'pi pi-info-circle',
      acceptCallback,
      undefined,
      '離開',
      rejectCallback
    );
  }

  /**
   * 顯示確認變更未儲存的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmYear(acceptCallback: Function, rejectCallback?: Function) {
    this.confirm(
      '確認',
      '需要新增該年日曆嗎 ?',
      'pi pi-info-circle',
      acceptCallback,
      undefined,
      '確認',
      rejectCallback
    );
  }

  /**
   * 顯示確認放棄未儲存的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmDiscardChanges(acceptCallback: Function, rejectCallback?: Function) {
    this.confirm(
      '確認',
      '您確定要放棄所有未儲存的變更嗎 ?',
      'pi pi-info-circle',
      acceptCallback,
      undefined,
      '放棄',
      rejectCallback
    );
  }

  /**
   * 顯示確認對話框。
   *
   * @param header 對話框的 Header
   * @param message 要確認的訊息
   * @param iconClass 訊息前 icon 的 style class
   * @param acceptCallback 按下是之後要執行的 function
   * @param parameters 要確認的訊息要傳遞的參數
   * @param acceptLabel 接受按鈕的文字
   * @param rejectCallback 按下否之後要執行的 func‵tion
   * @param rejectLabel 拒絕按鈕的文字
   */
  confirm(
    header: string,
    message: string,
    iconClass: string,
    acceptCallback: Function,
    parameters?: Object,
    acceptLabel?: string,
    rejectCallback?: Function,
    rejectLabel?: string
  ) {
    this.confirmationService.confirm({
      message: message,
      header: header,
      icon: iconClass,
      acceptLabel: acceptLabel || '是',
      rejectLabel: rejectLabel || '取消',
      accept: () => {
        acceptCallback();
      },
      reject: () => {
        if (typeof rejectCallback === 'function') {
          rejectCallback();
        }
      },
    });
  }

  /**
   * 顯示確認是否重製選取資料的對話框。
   *
   * @param acceptCallback 按下是之後要執行的 function
   * @param num 要刪除的資料筆數
   * @param rejectCallback 按下否之後要執行的 function
   */
  confirmResetresetPasswordErrorCount(
    acceptCallback: Function,
    num?: number,
    rejectCallback?: Function
  ) {
    if (num) {
      this.confirm(
        '確認',
        `您確定要重製選取的 ${num} 筆密碼錯誤次數資料嗎?`,
        'pi pi-info-circle',
        acceptCallback,
        { num: num },
        '重製',
        rejectCallback
      );
    } else {
      this.confirm(
        '確認',
        `您確定要重製選取資料的密碼錯誤次數嗎?`,
        'pi pi-info-circle',
        acceptCallback,
        undefined,
        '重製',
        rejectCallback
      );
    }
  }
}
