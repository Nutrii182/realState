import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

import {
  addUser,
  addUserFailure,
  checkAppInit,
  checkAppInitFailure,
  deleteUser,
  deleteUserFailure,
  loadUsers,
  loadUsersFailure,
  updateUser,
  updateUserFailure
} from './users.actions';

const serviceUnavailable = 'El servicio de usuarios aún no está conectado.';

@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);

  readonly checkAppInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAppInit),
      map(() => checkAppInitFailure({
        error: 'La verificación de sesión del administrador requiere un servicio de autenticación.'
      }))
    )
  );

  readonly loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      map(() => loadUsersFailure({ error: serviceUnavailable }))
    )
  );

  readonly addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      map(() => addUserFailure({ error: serviceUnavailable }))
    )
  );

  readonly updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      map(() => updateUserFailure({ error: serviceUnavailable }))
    )
  );

  readonly deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      map(() => deleteUserFailure({ error: serviceUnavailable }))
    )
  );
}
