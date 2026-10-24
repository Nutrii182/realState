import { User } from '../models/user.model';
import * as UsersActions from './users.actions';
import { initialState, usersReducer } from './users.reducer';

describe('usersReducer', () => {
  const firstUser: User = {
    id: 'user-1',
    name: 'Alice',
    email: 'alice@example.com',
    role: 'user'
  };

  it('should start with empty user data and uninitialized admin state', () => {
    expect(initialState.users).toEqual([]);
    expect(initialState.loading).toBeFalse();
    expect(initialState.isEditing).toBeFalse();
    expect(initialState.isInitialized).toBeFalse();
    expect(initialState.error).toBeNull();
  });

  it('should track admin initialization and surface initialization failures', () => {
    const adminUser: User = { ...firstUser, role: 'admin' };
    const authenticatedState = usersReducer(
      initialState,
      UsersActions.checkAppInitSuccess({ currentUser: adminUser })
    );
    const loadingState = usersReducer(authenticatedState, UsersActions.checkAppInit());
    const failedState = usersReducer(
      loadingState,
      UsersActions.checkAppInitFailure({ error: 'Authentication unavailable' })
    );

    expect(loadingState.loading).toBeTrue();
    expect(loadingState.isInitialized).toBeFalse();
    expect(failedState.loading).toBeFalse();
    expect(failedState.isInitialized).toBeTrue();
    expect(failedState.currentUser).toEqual(adminUser);
    expect(failedState.error).toBe('Authentication unavailable');
  });

  it('should add, update and delete users immutably', () => {
    const addedState = usersReducer(initialState, UsersActions.addUserSuccess({ user: firstUser }));
    const updatedUser = { ...firstUser, name: 'Alice Updated' };
    const updatedState = usersReducer(addedState, UsersActions.updateUserSuccess({ user: updatedUser }));
    const deletedState = usersReducer(updatedState, UsersActions.deleteUserSuccess({ id: firstUser.id }));

    expect(addedState.users).toEqual([firstUser]);
    expect(updatedState.users).toEqual([updatedUser]);
    expect(deletedState.users).toEqual([]);
  });

  it('should update loading, edit and error state for user operations', () => {
    const loadingState = usersReducer(initialState, UsersActions.loadUsers());
    const editState = usersReducer(loadingState, UsersActions.setIsEditing({ isEditing: true }));
    const failedState = usersReducer(
      editState,
      UsersActions.loadUsersFailure({ error: 'Users service unavailable' })
    );

    expect(loadingState.loading).toBeTrue();
    expect(editState.isEditing).toBeTrue();
    expect(failedState.loading).toBeFalse();
    expect(failedState.error).toBe('Users service unavailable');
  });
});
