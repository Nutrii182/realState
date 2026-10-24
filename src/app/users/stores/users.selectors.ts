import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UsersState } from './users.reducer';

export const USERS_FEATURE_KEY = 'users';

export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectCurrentUser = createSelector(
  selectUsersState,
  (state) => state.currentUser
);

export const selectIsLoadingUsers = createSelector(
  selectUsersState,
  (state) => state.loading
);

export const selectIsEditingUser = createSelector(
  selectUsersState,
  (state) => state.isEditing
);

export const selectIsAppInitialized = createSelector(
  selectUsersState,
  (state) => state.isInitialized
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state) => state.error
);

export const selectIsAuthenticated = createSelector(
  selectCurrentUser,
  (user) => user !== null
);

export const selectIsAdmin = createSelector(
  selectCurrentUser,
  (user) => user?.role === 'admin'
);
