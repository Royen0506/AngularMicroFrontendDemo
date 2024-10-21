import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, filter, map, tap, concatMap, of } from 'rxjs';

import { UserProfile } from '../models/user-profile.model';
import { StorageService } from '@@shared';
import { SystemLocalStorage } from '@@shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenError: boolean = false;

  constructor(
    private storageService: StorageService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  /**
   * Azure AD 登入後要去後端取 JWT Token，然後存到 localStorage jwtToken
   *
   * @param email AAD 登入後取得的 email
   * @param accessToken AAD accessToken
   * @param authCheck 有 AAD 和 Store 兩種，AAD 的話後端會再用 accessToken 去驗證一次帳號
   * @returns 是否有取到合法的 JWT Token
   */
  jwt(
    email: string,
    accessToken: string,
    authCheck: string
  ): Observable<boolean> {
    // TODO 目前沒有 JWT Token 的服務，直接回傳 true
    return of(true);

    // let endpoint: string = `${environment.accountApiEndpoint}/auth/loginSso`;
    // let body = { email: email, accessToken: accessToken, authCheck: authCheck };
    // let observable: Observable<Auth> = this.httpClient.post<Auth>(endpoint, body);

    // return observable.pipe(map((auth) => {
    //     console.log('do authorization get JWT Token');
    //     console.log(JSON.stringify(auth));
    //     // 後端會用 email 去檢查登入者的權限，然後回傳 JWT Token
    //     if (auth && auth.token) {
    //       localStorage.setItem(SystemLocalStorage.JWT_TOKEN, auth.token);
    //       localStorage.setItem(SystemLocalStorage.REFRESH_TOKEN, auth.refreshToken);
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   })
    // );
  }

  /**
   * 透過 refreshToken 重新取得 accessToken
   * @returns 是否有取到合法的 JWT Token
   */
  refresh(): Observable<boolean> {
    // TODO 目前沒有 JWT Token 的服務，直接回傳 true
    return of(true);

    // let endpoint: string = `${environment.accountApiEndpoint}/auth/refreshToken`;
    // let body = {
    //   refreshToken: this.getRefreshToken()
    // };

    // let observable: Observable<Auth> = this.httpClient.post<Auth>(endpoint, body);

    // return observable.pipe(map((auth) => {
    //     console.log('do authorization refresh Token');
    //     console.log(JSON.stringify(auth));
    //     if (auth && auth.token) {
    //       localStorage.setItem(SystemLocalStorage.JWT_TOKEN, auth.token);
    //       localStorage.setItem(SystemLocalStorage.REFRESH_TOKEN, auth.refreshToken);
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   })
    // );
  }

  /**
   * 取得 user 基本資訊，然後存到 localStorage userProfile，目前裡面只放 username = 工號
   *
   * @returns 是否有取得 user 基本資訊
   */
  profile(): Observable<boolean> {
    // TODO 目前沒有取 user 資料的服務，用假資料取代
    // let endpoint: string = `${environment.accountApiEndpoint}/auth/current`;
    let endpoint: string = `assets/mock/api/v1/auth/current.json`;
    let observable: Observable<UserProfile> =
      this.httpClient.get<UserProfile>(endpoint);

    return observable.pipe(
      map((userProfile) => {
        console.log('do profile userProfile = ' + JSON.stringify(userProfile));
        if (userProfile && userProfile.username) {
          console.log('do profile username');
          sessionStorage.setItem(
            SystemLocalStorage.USER_PROFILE,
            JSON.stringify(userProfile)
          );
          return true;
        } else {
          return false;
        }
      })
    );
  }

  /**
   * 不透過 AAD，用 Login 頁面輸入帳號密碼登入。
   * 登入驗證後會回傳 JWT Token，然後存到 localStorage jwtToken。
   *
   * @param username
   * @param password 密碼
   * @returns 是否有取到合法的 JWT Token
   */
  // login(username: string, password: string): Observable<boolean> {
  //   // TODO 目前沒有 JWT Token 的服務，直接回傳 true
  //   return of(true);

  //   let endpoint: string = `${environment.accountApiEndpoint}/auth/login`;
  //   let body = { tenant: tenant, username: username, password: password };
  //   let observable: Observable<Auth> = this.httpClient.post<Auth>(endpoint, body);

  //   return observable.pipe(map((auth) => {
  //       console.log('do login get JWT Token');
  //       // 後端會用 email 去檢查登入者的權限，然後回傳 JWT Token
  //       if (auth && auth.token) {
  //         localStorage.setItem(SystemLocalStorage.JWT_TOKEN, auth.token);
  //         localStorage.setItem(SystemLocalStorage.REFRESH_TOKEN, auth.refreshToken);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     })
  //   );
  // }

  // TODO 俟後端提供 API 及 JWT Token 後再調整
  login(username: string, password: string): Observable<boolean> {
    console.log('login');
    // 登入者 mock data
    let endpoint = `assets/mock/api/v1/auth/login.json`;
    return this.httpClient
      .get<{ username: string; password: string }>(endpoint)
      .pipe(
        map((mockUser) => {
          return true;
        })
      );
  }

  /**
   * 完整的手動登入流程，先取得 JWT 後再去取得 user profile
   *
   * @param username
   * @param password 密碼
   * @returns 是否有取到合法的 JWT Token 和 user 基本資訊
   */
  manualLogin(username: string, password: string): Observable<boolean> {
    return this.login(username, password).pipe(
      tap((authResult) => console.log('RxJS jwt result = ' + authResult)),
      filter((authResult) => authResult),
      concatMap((authResult) =>
        this.profile().pipe(
          tap((profileResult) =>
            console.log('RxJS userProfile result = ' + profileResult)
          ),
          map((profileResult) => {
            if (authResult && profileResult) {
              return true;
            } else {
              return false;
            }
          })
        )
      )
    );
  }

  /**
   * 從 localStorage 取得 jwtToken
   * @returns jwtToken
   */
  getJwtToken(): string {
    // TODO 目前沒有 JWT Token 的服務，回傳一個假的
    return 'jwtToken';
    // return this.storageService.getLocalStorageItem(SystemLocalStorage.JWT_TOKEN);
  }

  /**
   * 從 localStorage 取得 refreshToken
   * @returns jwtToken
   */
  getRefreshToken(): string {
    // TODO 目前沒有 JWT Token 的服務，回傳一個假的
    return 'refreshToken';
    // return this.storageService.getLocalStorageItem(SystemLocalStorage.REFRESH_TOKEN);
  }

  /**
   * 從 SessionStorage 取得登入使用者的基本資訊
   * @returns 登入使用者的基本資訊
   */
  getUser(): UserProfile {
    const userProfile: string = this.storageService.getSessionStorageItem(
      SystemLocalStorage.USER_PROFILE
    );
    return userProfile ? JSON.parse(userProfile) : '';
  }

  logout(): void {
    this.storageService.removeAllSessionStorageItem();
    this.router.navigate(['/login']);
  }
}
