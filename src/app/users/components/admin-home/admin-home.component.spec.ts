import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { provideStore } from '@ngrx/store';

import { AdminHomeComponent } from './admin-home.component';
import { UsersEffects } from '../../stores/users.effects';
import { checkAppInit } from '../../stores/users.actions';
import { usersReducer } from '../../stores/users.reducer';
import { USERS_FEATURE_KEY } from '../../stores/users.selectors';

describe('AdminHomeComponent', () => {
  let fixture: ComponentFixture<AdminHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminHomeComponent],
      providers: [provideStore({ [USERS_FEATURE_KEY]: usersReducer })]
    });
  });

  it('should show the admin-specific loading state while initialization is pending', () => {
    TestBed.inject(Store).dispatch(checkAppInit());
    fixture = TestBed.createComponent(AdminHomeComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="status"]').textContent)
      .toContain('Cargando el panel de administración');
  });

  it('should show the initialization error once the check completes without a backend', async () => {
    TestBed.configureTestingModule({
      providers: [provideEffects([UsersEffects])]
    });
    fixture = TestBed.createComponent(AdminHomeComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent)
      .toContain('requiere un servicio de autenticación');
  });
});
