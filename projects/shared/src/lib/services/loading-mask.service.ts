import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Loading Mask 服務。
 * 提供顯示或隱藏整頁的遮罩。
 *
 * @export
 * @class LoadingMaskService
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingMaskService {
  public status$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  show() {
    this.status$.next(true);
  }

  hide() {
    this.status$.next(false);
  }
}
