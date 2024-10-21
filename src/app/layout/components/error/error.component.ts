import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { BackDirective } from '../../../shared/directives/back.directive';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, ButtonModule, BackDirective],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
