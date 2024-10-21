import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = '/api';
  apiMock = true;

  constructor(private http: HttpClient) {}

  postApi(url: string, param: any, mockUrl: string): Observable<any> {
    let apiUrl = this.apiMock ? mockUrl : `${this.baseUrl}/${url}`;
    return this.http.post(apiUrl, this.clearEmptyParams(param));
  }

  clearEmptyParams(params: any): any {
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });
    return params;
  }
}
