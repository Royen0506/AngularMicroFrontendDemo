import { Routes } from '@angular/router';
import { DemoComponent } from './pages/demo/demo.component';

export const routes: Routes = [
  {
    path: 'demo',
    component: DemoComponent,
  },
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full',
  },
];
