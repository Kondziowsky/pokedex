import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {loadingInterceptor} from "@core/interceptors/loading.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";
import {authInterceptor} from "@core/interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: "top"})),
    provideHttpClient(
      withInterceptors([authInterceptor, loadingInterceptor])
    ),
    provideAnimations()
  ]
};
