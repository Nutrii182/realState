import { createReducer, on } from '@ngrx/store';

import { User } from '../models/user.model';
import * as UsersActions from './users.actions';

export interface UsersState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  isEditing: boolean;
  isInitialized: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  currentUser: null,
  loading: false,
  isEditing: false,
  isInitialized: false,
  error: null
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.checkAppInit, (state): UsersState => ({
    ...state,
    loading: true,
    isInitialized: false,
    error: null
  })),
  on(UsersActions.checkAppInitSuccess, (state, { currentUser }): UsersState => ({
    ...state,
    currentUser,
    loading: false,
    isInitialized: true,
    error: null
  })),
  on(UsersActions.checkAppInitFailure, (state, { error }): UsersState => ({
    ...state,
    loading: false,
    isInitialized: true,
    error
  })),
  on(UsersActions.loadUsers, (state): UsersState => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }): UsersState => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  on(UsersActions.loadUsersFailure, (state, { error }): UsersState => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.addUser, (state): UsersState => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.addUserSuccess, (state, { user }): UsersState => ({
    ...state,
    users: [...state.users, user],
    loading: false,
    isEditing: false,
    error: null
  })),
  on(UsersActions.addUserFailure, (state, { error }): UsersState => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.updateUser, (state): UsersState => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.updateUserSuccess, (state, { user }): UsersState => ({
    ...state,
    users: state.users.map((existingUser) => existingUser.id === user.id ? user : existingUser),
    currentUser: state.currentUser?.id === user.id ? user : state.currentUser,
    loading: false,
    isEditing: false,
    error: null
  })),
  on(UsersActions.updateUserFailure, (state, { error }): UsersState => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.deleteUser, (state): UsersState => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.deleteUserSuccess, (state, { id }): UsersState => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
    loading: false,
    error: null
  })),
  on(UsersActions.deleteUserFailure, (state, { error }): UsersState => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.setIsEditing, (state, { isEditing }): UsersState => ({
    ...state,
    isEditing
  })),
  on(UsersActions.logout, (state): UsersState => ({
    ...state,
    currentUser: null,
    error: null
  }))
);
