import { Routes } from '@angular/router';
import {
  BoxtrainerComponent,
  ConnectComponent,
  KitharaComponent,
} from '@projects';
import { routerGuard } from 'core/guards/router.guard';

export const routes: Routes = [
  {
    path: 'boxtrainer',
    component: BoxtrainerComponent,
    title: 'uxy - BoxTrainer',
    canActivate: [routerGuard],
    data: { animation: 'BoxTrainer' },
  },
  {
    path: 'connect',
    component: ConnectComponent,
    title: 'uxy - Connect',
    canActivate: [routerGuard],
    data: { animation: 'Connect' },
  },
  {
    path: 'kithara',
    component: KitharaComponent,
    title: 'uxy - Kithara',
    canActivate: [routerGuard],
    data: { animation: 'Kithara' },
  },
];
