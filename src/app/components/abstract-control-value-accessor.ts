import {ControlValueAccessor} from '@angular/forms';

export abstract class AbstractControlValueAccessor<V> implements ControlValueAccessor {

  onTouchFn?: ()=>void;
  onChangeFn?: (v?: V | null)=>void;
  disabled = false;
  private isWritingValue = false;

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj?: V | null): void {
    if (this.isWritingValue) {
      return;
    }
    
    try {
      this.isWritingValue = true;
      this.doWriteValue(obj);
    } finally {
      this.isWritingValue = false;
    }
  }

  propagateChange(v?: V | null) {
    if (this.isWritingValue) {
      return;
    }

    if (this.onTouchFn) {
      this.onTouchFn();
    }
    
    if (this.onChangeFn) {
      this.onChangeFn(v);
    }
  }

  abstract doWriteValue(v?: V | null): void;

}
