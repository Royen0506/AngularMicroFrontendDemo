import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    console.log('JwtInterceptor intercept');

    // add authorization header with jwt token if available
    let jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      // 所有透過瀏覽器發送的 HTTP 請求，都會先經過瀏覽器的快取，
      // 在這裡會先檢查是否有有效的快取內容可作為回應，如果有的話就直接讀取快取的內容，以減少網路的延遲和傳輸造成的成本。
      // 在判斷資源有沒有過期時，會先看 Cache-Control: max-age="..."，
      // 沒有的話才會去看 Expires；如果沒有 max-age 也沒有 Expires 的話，
      // 才會再進一步去看 Last-modified

      // 下面這麼多從哪抄來的，為什麼要這樣寫需要再確認
      request = request.clone({
        headers: request.headers
          .set('Cache-Control', 'no-cache') // 瀏覽器會快取所有內容，但每次都會發送請求向伺服器詢問是否有新內容要提供（永遠檢查快取）。
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
          .set('If-Modified-Since', '0')
          .set('Authorization', `Bearer ${jwtToken}`),
      });
    } else {
      console.log('JwtInterceptor localStorage no jwt token');
    }

    return next.handle(request).pipe(
      catchError(error => {
        // 呼叫 API 後如果收到 401 錯誤代表 access token 有問題
        this.authService.tokenError = error.status === 401;
        console.log(
          'JwtInterceptor catchError this.authService.tokenError = ' +
            this.authService.tokenError
        );

        // 收到 401 錯誤，除了 refreshToken 以外的所有 API，要去重取一次 token 後，再重新送一次
        if (
          this.authService.tokenError &&
          !request.url.endsWith('/refreshToken')
        ) {
          // 可能是因為 accessToken 過期，所以要先去重取一次
          return this.authService.refresh().pipe(
            switchMap(() => {
              const newJwtToken = this.authService.getJwtToken();
              request = request.clone({
                headers: request.headers
                  .set('Cache-Control', 'no-cache') // 瀏覽器會快取所有內容，但每次都會發送請求向伺服器詢問是否有新內容要提供（永遠檢查快取）。
                  .set('Pragma', 'no-cache')
                  .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
                  .set('If-Modified-Since', '0')
                  .set('Authorization', `Bearer ${newJwtToken}`),
              });

              // 因為過期會重取一次，所以把 tokenError 設為 false，不然 http error interceptor 會跳出錯誤訊息
              this.authService.tokenError = false;
              // 重取回來後新的 accessToken 後，原本的 API 再重新呼叫一次
              return next.handle(request);
            })
          );
        } else if (
          this.authService.tokenError &&
          request.url.endsWith('/refreshToken')
        ) {
          this.storageService.removeAllLocalStorageItem();
          this.storageService.removeAllSessionStorageItem();
          // 如果是 refreshToken 還是 401，就登出
          // this.msalService.logoutRedirect();
        }

        return throwError(() => error);
      })
    );
  }
}
