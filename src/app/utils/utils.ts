import { AbstractControl } from "@angular/forms";
import _ from "lodash";

// ====================================================
// ======= FormControl Validations / Validators
export const fieldErrorMessages = {
    required: 'This field is required',
    inputMask: 'Invalid format',
    minmax: (n: {min: number, max: number, actual: number}) => `Value needs to be between ${n.min} and ${n.max}`,
    min: (n: {min: number, actual: number})=>`Minimum of ${n.min} is required`,
    max: (n: {max: number, actual: number}) => `Maximum of ${n.max} is required`,
  };

// ====================================================
export const formControlErrorKeys = (formControl: AbstractControl, onlyFirstErrorKey = true): string[] => {
    const keys =  Object.keys(formControl?.errors ?? {});
    if (onlyFirstErrorKey) {
      return keys.length ? [keys[0]] : keys
    }
    return keys;
  }

export const formControlErrorMessage = (formControl: AbstractControl, errorKey: string): string => {
    const r = formControl?.errors?.[errorKey];
    if (r) {
        const f = (fieldErrorMessages as any)?.[errorKey];
        if (!!f) {
        if (typeof f == 'string') {
            return f;
        } else if (typeof f == 'function') {
            return f(r);
        }
        }
    }
    return '';
}

export const compareMatch = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) {
    return true;
  }
  return _.isEqual(obj1, obj2);
}