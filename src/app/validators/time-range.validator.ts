import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function timeRangeValidator(
  startControlName: string,
  endControlName: string
): ValidatorFn {

  return (group: AbstractControl): ValidationErrors | null => {

    const startTime = group.get(startControlName)?.value;
    const endTime = group.get(endControlName)?.value;

    if (!startTime || !endTime) {
      return null;
    }

    if (endTime <= startTime) {
      return {
        invalidTimeRange: {
          startControl: startControlName,
          endControl: endControlName
        }
      };
    }

    return null;
  };
}
