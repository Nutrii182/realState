import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchBarComponent]
    });
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the selected operation when an option is chosen', () => {
    const option = fixture.nativeElement.querySelector('.dropdown-menu button') as HTMLButtonElement;

    option.click();
    fixture.detectChanges();

    expect(component.selectedOperation).toBe('Operación 1');
    expect(fixture.nativeElement.querySelector('[aria-label="Seleccionar operación"]').textContent.trim())
      .toBe('Operación 1');
  });
});
