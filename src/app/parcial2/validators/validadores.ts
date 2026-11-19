import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Valida que "hasta" sea mayor que "desde".
 * Se aplica al FormGroup porque necesita leer dos controles.
 */
export function RangeValidator(
    desdeControlName: string,
    hastaControlName: string
): ValidatorFn {

    return (group: AbstractControl): ValidationErrors | null => {

        const desde = group.get(desdeControlName)?.value;
        const hasta = group.get(hastaControlName)?.value;

        // Si falta alguno, el error lo reporta Validators.required en su campo.
        if (esVacio(desde) || esVacio(hasta)) {
            return null;
        }

        return Number(hasta) > Number(desde)
            ? null
            : { rangoAnios: true };
    };
}

/**
 * Valida que el valor sea múltiplo de m.
 */
export function MultiploDe(m: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;

        if (esVacio(valor)) {
            return null;
        }

        if (!Number.isFinite(m) || m <= 0) {
            return { multiploInvalido: true };
        }

        return Number(valor) % m === 0
            ? null
            : { noEsMultiplo: { multiplo: m } };
    };
}

function esVacio(valor: unknown): boolean {
    return valor === null || valor === undefined || valor === '';
}
