import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AmountInputComponent, SelectFinancialYearComponent } from '../../components';
import { AmountInputValue, SelectFinancialYearValue } from '../../interfaces';
import { Subscription } from 'rxjs';
import { calculateTax } from '../../utils';
import { MatButtonModule } from '@angular/material/button';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AmountInputComponent,
    SelectFinancialYearComponent
  ]
})
export class HomePageComponent implements OnInit {

  formControlAmount!: FormControl<AmountInputValue>;
  formControlFinancialYear!: FormControl<SelectFinancialYearValue>;
  formGroup!: FormGroup<{
    amount: FormControl<AmountInputValue>,
    financialYear: FormControl<SelectFinancialYearValue>,
  }>;

  tax: number = 0;
  showResult: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formControlAmount = this.formBuilder.control(null, [Validators.required]);
    this.formControlFinancialYear = this.formBuilder.control(null, [Validators.required]);
    this.formGroup = this.formBuilder.group({
      amount: this.formControlAmount,
      financialYear: this.formControlFinancialYear,
    })
  }

  onCalculate() {
    if (this.formGroup.invalid) return;

    this.showResult = true;
    const amount = this.formControlAmount.value ?? 0;
    const financialYear = this.formControlFinancialYear.value;
    if (financialYear) {
      this.tax = calculateTax(financialYear, amount);
    } else {
      this.tax = 0;
    }
  }
}
