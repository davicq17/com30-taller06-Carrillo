import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function RangeValidator(
    desdeControlName:string, 
    hastaControlName:string
): ValidatorFn {

    return (group: AbstractControl): ValidationErrors | null => {

        const desde = group.get(desdeControlName)?.value;
        const hasta = group.get(hastaControlName)?.value;

        if( desde === null || hasta === null ||
            desde === '' || hasta === ''){
                return null;
            }

            return hasta > desde ? null : {rangoAnios: true}
    };
 }

 export function MultiploDe(m: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;

        if (valor === null || valor === ''){
            return null;
        }

        if (m <= 0 || !Number.isFinite(m)){
            return {multiploInvalido: true};
        }

        return Number(valor) % m === 0 
            ? null : {noesMultiplo: {multiplo: m}}
    }
 }