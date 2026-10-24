import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { UsersEffects } from './users/stores/users.effects';
import { usersReducer } from './users/stores/users.reducer';
import { USERS_FEATURE_KEY } from './users/stores/users.selectors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ [USERS_FEATURE_KEY]: usersReducer }),
    provideEffects([UsersEffects])
  ]
};
