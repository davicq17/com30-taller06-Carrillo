
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noForbiddenWords(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const forbiddenWords = ['test', 'prueba', 'xxx'];

    const containsForbiddenWord = forbiddenWords.some(word =>
      value.toLowerCase().includes(word)
    );

    return containsForbiddenWord
      ? { forbiddenWord: true }
      : null;
  };
}
