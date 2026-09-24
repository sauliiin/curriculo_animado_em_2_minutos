import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Transição animada entre páginas (View Transitions API)
    provideRouter(routes, withViewTransitions({ skipInitialTransition: true })),
  ],
};
