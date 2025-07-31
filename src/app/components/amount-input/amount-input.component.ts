import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DisableControlDirective, MARK, Mark } from '../../directives';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxCurrencyInputMode, NgxCurrencyDirective } from 'ngx-currency';
import { NgClass } from '@angular/common';
import { AmountInputValue } from '../../interfaces';
import { AbstractControlValueAccessor } from '../abstract-control-value-accessor';
import { Subscription, delay, tap } from 'rxjs';
import numeral from 'numeral';
import { formControlErrorKeys, formControlErrorMessage } from '../../utils';
import _ from 'lodash';

@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountInputComponent),
      multi: true,
    },
    { provide: MARK, useExisting: forwardRef(() => AmountInputComponent) },
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxCurrencyDirective,
    DisableControlDirective,
    NgClass,
  ],
})
export class AmountInputComponent
  extends AbstractControlValueAccessor<AmountInputValue>
  implements OnInit, OnChanges, Mark
{
  errorKeys = formControlErrorKeys;
  errorMessage = formControlErrorMessage;
  options = {
    prefix: '',
    thousands: ',',
    decimal: '.',
    inputMode: NgxCurrencyInputMode.Natural,
    align: 'left',
    nullable: true,
  };

  @Input({ required: false }) title = 'Currency';
  @Input({ required: false }) hint: string = '';
  @Input({ required: false }) readonly = false;
  @Input({ required: false }) required = true;
  @Input({ required: false }) defaultValue: number | null = null;
  @Input({ required: false }) min: number | null = 0;
  @Input({ required: false }) max: number | null = null;
  @Input({ required: false }) maxExcluding: number | null = null;
  @Input({ required: false }) placeholder?: string;

  focused = false;

  subscriptions: Subscription[] = [];

  formGroup!: FormGroup<{
    value: FormControl<AmountInputValue>;
  }>;
  formControlValue!: FormControl<AmountInputValue>;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    const validators = this.createValidators();
    this.formControlValue = this.formBuilder.control(
      this.defaultValue,
      validators
    );
    this.formGroup = this.formBuilder.group({
      value: this.formControlValue,
    });
    if (this.disabled) {
      this.formControlValue.disable();
    }
    const sub = this.formControlValue.valueChanges
      .pipe(
        delay(0),
        tap((r) => {
          if (this.formControlValue.valid || this.formControlValue.disabled) {
            const v =
              r !== null && r !== undefined
                ? _.round(numeral(r).value()!, 2)
                : r;
            this.propagateChange(v);
          } else {
            this.propagateChange(null);
          }
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  createValidators(): ValidatorFn[] {
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }

    return validators;
  }

  doWriteValue(v: AmountInputValue | undefined): void | AmountInputValue {
    this.formControlValue.setValue(v ?? null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (
        (changes as any).min ||
        (changes as any).max ||
        (changes as any).required ||
        (changes as any).maxExcluding
      ) {
        if (this.formControlValue) {
          const validators = this.createValidators();
          this.formControlValue.setValidators(validators);
          this.formControlValue.updateValueAndValidity();
          if (this.formControlValue.invalid) {
            this.formControlValue.setValue(null);
          }
        }
      } else if ((changes as any).disabled) {
        if (this.formControlValue) {
          const isDisabled = (changes as any).disabled.currentValue;
          if (isDisabled) {
            this.formControlValue.disable();
          } else {
            this.formControlValue.enable();
          }
        }
      }
    }
  }

  mark() {
    this.formGroup.markAllAsTouched();
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
  }
}
