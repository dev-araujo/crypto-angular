import { ApplicationConfig } from '@angular/core';
import { IconUrlPipe } from './shared/pipes/iconUrlPipe';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    IconUrlPipe,
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
  ],
};
