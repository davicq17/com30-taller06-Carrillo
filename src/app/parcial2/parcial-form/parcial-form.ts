import { Component, inject } from '@angular/core';
import { FormBuilder,FormArray,FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiploDe, RangeValidator } from '../validators/validadores';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-parcial-form',
  styleUrl: './parcial-form.css',
  templateUrl: './parcial-form.html',
})
export class ParcialForm {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);


  readonly parcialForm = this.fb.nonNullable.group({
    codigo:['',[Validators.required, Validators.pattern(/^[A-Z]{2}\d{3}$/)]],
    cantidad:[1,[Validators.required, Validators.min(1), Validators.max(24), MultiploDe(4)]],
    desde:[0,[Validators.required]],
    hasta:[1,[Validators.required]]
  },
  {
    validators:[RangeValidator('desde','hasta')]
  }
  );

  onSubmit(): void {
    if(this.parcialForm.invalid){
      this.parcialForm.markAllAsTouched();
      return;
    }

    const formValue = this.parcialForm.getRawValue();
    const nuevo = 

    this.parcialForm.reset();
    console.log('Formulario exitoso')
  }
}
