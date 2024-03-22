import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};
