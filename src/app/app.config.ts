import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './shared/services/auth.service';
import { AppTitleStrategy } from './shared/strategies/title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    AuthService,
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ],
};
