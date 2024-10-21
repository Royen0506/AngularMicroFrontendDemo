import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    PasswordModule,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;

  // 用來記錄表單是否填寫完成按下送出
  submitted: boolean = false;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 清除所有 localStorage 儲存資料
    localStorage.clear();
    sessionStorage.clear();

    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * formControl 共用 function，用來提供 html 取 FormControl
   * @param name formControlName
   * @returns FormControl
   */
  formControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  /**
   * formControl 共用 function，用來提供 html 判斷欄位是否有錯誤
   * @param name formControlName
   * @returns boolean 欄位是否有錯誤
   */
  formControlInvalid(name: string): boolean {
    const formControl = this.formGroup.get(name);
    if (formControl) {
      return formControl.invalid && (formControl.dirty || this.submitted);
    } else {
      return false;
    }
  }

  signIn() {
    this.submitted = true;
    console.log('signIn');
    if (this.formGroup.valid) {
      this.authService
        .manualLogin(
          this.formGroup.get('username')?.getRawValue(),
          this.formGroup.get('password')?.getRawValue()
        )
        .pipe(takeUntil(this._destroying$))
        .subscribe((result) => {
          console.log(result);
          if (!result) {
            console.log('login error');
          } else {
            this.router.navigateByUrl('/');
          }
        });
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
