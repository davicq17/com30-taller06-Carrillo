import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function atLeastOneItem(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const items = control as FormArray;

    return items.length > 0
      ? null
      : { minItems: true };
  };
}