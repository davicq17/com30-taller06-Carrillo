import { Component, inject, computed } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map, scan } from 'rxjs';
import { MultiploDe, RangeValidator } from '../validators/validadores';
import { Router, RouterLink } from '@angular/router';

export const productos = [
    {
    codigo: 'AB123',
    cantidad: 8,
    desde: 1,
    hasta: 5
  },
  {
    codigo: 'CD456',
    cantidad: 12,
    desde: 2,
    hasta: 8
  },
  {
    codigo: 'EF789',
    cantidad: 16,
    desde: 3,
    hasta: 9
  },
  {
    codigo: 'GH321',
    cantidad: 4,
    desde: 1,
    hasta: 4
  },
  {
    codigo: 'JK654',
    cantidad: 20,
    desde: 5,
    hasta: 12
  },
  {
    codigo: 'LM987',
    cantidad: 24,
    desde: 4,
    hasta: 15
  }
  ];

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

  
  protected readonly buscar = new FormControl('', {nonNullable: true});
  protected readonly estadoBusqueda = toSignal(
    this.buscar.valueChanges.pipe(
      map((texto) => texto.trim()),

      debounceTime(300),

      distinctUntilChanged(),

      scan(
        (estado, texto) => ({
          ultimoValor: texto,
          emisiones: estado.emisiones + 1
        }),
        {
          ultimoValor: '',
          emisiones: 0
        }
      )
    ),
    {
      initialValue: {
        ultimoValor: '',
        emisiones: 0
      }
    }
  );

  protected readonly productosFiltrados = computed(() => {
  const texto = this.estadoBusqueda().ultimoValor.toLowerCase();

  return productos.filter(producto =>
    producto.codigo.toLowerCase().includes(texto) ||
    producto.cantidad.toString().includes(texto) ||
    producto.desde.toString().includes(texto) ||
    producto.hasta.toString().includes(texto)
  );
});

}
