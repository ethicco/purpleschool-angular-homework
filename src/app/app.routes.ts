import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public/layout/layout.component';
import { LogInComponent } from './public/pages/log-in/log-in.component';
import { PrivateLayoutComponent } from './private/layout/layout.component';
import { HomeComponent } from './private/page/home/home.component';
import { FavoritesComponent } from './private/page/favorites/favorites.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'log-in',
        component: LogInComponent,
      },
      {
        path: '**',
        redirectTo: 'log-in',
      },
    ],
  },
  {
    path: 'private',
    component: PrivateLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'private',
  },
];
