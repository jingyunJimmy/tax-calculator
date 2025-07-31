import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatOptionModule } from '@angular/material/core';
import { AbstractControlValueAccessor } from '../abstract-control-value-accessor';
import { Subscription } from 'rxjs';
import { delay, distinctUntilChanged, tap } from 'rxjs/operators';
import { MARK, Mark } from '../../directives';
import { DisableControlDirective } from '../../directives/disable-control.directive';
import { IncomeYear, IncomeYearOptions, SelectFinancialYearValue } from '../../interfaces';
import { compareMatch, formControlErrorKeys, formControlErrorMessage } from '../../utils';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  selector: 'app-select-financial-year',
  templateUrl: './select-financial-year.component.html',
  styleUrls: ['./select-financial-year.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFinancialYearComponent),
      multi: true,
    },
    {
      provide: MARK,
      useExisting: forwardRef(() => SelectFinancialYearComponent),
    },
  ],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    DisableControlDirective,
  ],
})
export class SelectFinancialYearComponent
  extends AbstractControlValueAccessor<SelectFinancialYearValue>
  implements OnInit, Mark
{
  options = IncomeYearOptions;

  subscriptions: Subscription[] = [];

  formControl: FormControl<SelectFinancialYearValue>;
  errorKeys = formControlErrorKeys;
  errorMessage = formControlErrorMessage;

  @Input({ required: false }) hint: string = '';
  @Input({ required: false }) readonly = false;
  @Input({ required: false }) required = true;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.formControl = formBuilder.control(null, [Validators.required]);
  }

  ngOnInit(): void {
    const sub = this.formControl.valueChanges
      .pipe(
        delay(0),
        distinctUntilChanged(compareMatch),
        tap((r) => {
          if (this.formControl.valid) {
            this.propagateChange(r);
          } else {
            this.propagateChange(null);
          }
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  doWriteValue(v: SelectFinancialYearValue | undefined): void | SelectFinancialYearValue {
    if (v) {
      this.formControl.setValue(v);
    } else {
      this.formControl.setValue(null);
    }
    return undefined;
  }

  mark() {
    this.formControl.markAllAsTouched();
  }
}
