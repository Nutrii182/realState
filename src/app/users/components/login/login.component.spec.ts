import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([])]
    });
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create the validated login form and password visibility control', () => {
    expect(fixture.nativeElement.querySelector('#login-email')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('#login-password')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[aria-label="Mostrar contraseña"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('button[type="submit"]')).not.toBeNull();
  });

  it('should toggle password visibility accessibly', () => {
    const toggle = fixture.nativeElement.querySelector('.login-password-toggle') as HTMLButtonElement;
    const password = fixture.nativeElement.querySelector('#login-password') as HTMLInputElement;

    toggle.click();
    fixture.detectChanges();

    expect(password.type).toBe('text');
    expect(toggle.getAttribute('aria-label')).toBe('Ocultar contraseña');
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
  });

  it('should show validation errors and not navigate for invalid input', () => {
    const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

    form.controls['email'].setValue('not-an-email');
    form.controls['password'].setValue('short');
    fixture.componentInstance.onSubmit(form);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Ingresa un correo electrónico válido.');
    expect(fixture.nativeElement.textContent).toContain('al menos 8 caracteres');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to the user area after valid form input', () => {
    const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

    form.controls['email'].setValue('persona@example.com');
    form.controls['password'].setValue('secure-pass-123');
    fixture.componentInstance.onSubmit(form);

    expect(router.navigate).toHaveBeenCalledWith(['/users/home']);
  });
});
