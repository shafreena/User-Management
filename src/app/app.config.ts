import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { userReducer } from './states/users/users.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideStore(), provideHttpClient(), provideState({ name: 'users', reducer: userReducer })]
};
