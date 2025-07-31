import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomePageComponent, // standalone component
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        BrowserAnimationsModule ,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required controls', () => {
    expect(component.formControlAmount).toBeTruthy();
    expect(component.formControlFinancialYear).toBeTruthy();
    expect(component.formGroup.valid).toBeFalse();
  });

  it('should disable Calculate button when form is invalid', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should calculate tax and show result when form is valid', () => {
    const mockAmount = 150000;
    const mockFinancialYear = '2024-2025';

    spyOn<any>(component, 'onCalculate').and.callThrough();

    component.formControlAmount.setValue(mockAmount);
    component.formControlFinancialYear.setValue(mockFinancialYear);
    fixture.detectChanges();

    expect(component.formGroup.valid).toBeTrue();

    component.onCalculate();

    expect(component.onCalculate).toHaveBeenCalled();
    expect(component.showResult).toBeTrue();
    expect(component.tax).toBe(36838);
  });
});
