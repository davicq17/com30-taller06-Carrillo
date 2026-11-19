import { Component, inject, computed } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map, scan } from 'rxjs';
import { MultiploDe, RangeValidator } from '../validators/validadores';
import { Router, RouterOutlet } from '@angular/router';
import { MULTIPLO, Producto, TOPE, productos } from '../productos';

@Component({
  imports: [ReactiveFormsModule, RouterOutlet],
  selector: 'app-parcial-form',
  styleUrl: './parcial-form.css',
  templateUrl: './parcial-form.html',
})

export class ParcialForm {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  // Grupo nonNullable: ningún control puede quedar con valor nulo.
  readonly parcialForm = this.fb.nonNullable.group({
    codigo: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{3}$/)]],
    cantidad: [1, [
      Validators.required,
      Validators.min(1),
      Validators.max(TOPE),
      MultiploDe(MULTIPLO)
    ]],
    desde: [0, [Validators.required]],
    hasta: [1, [Validators.required]]
  },
  {
    // Regla de rango propia: hasta > desde
    validators: [RangeValidator('desde', 'hasta')]
  });

  onSubmit(): void {
    // Un envío inválido muestra todos los errores a la vez.
    if (this.parcialForm.invalid) {
      this.parcialForm.markAllAsTouched();
      return;
    }

    const nuevo: Producto = this.parcialForm.getRawValue();

    // update del arreglo de productos con el registro nuevo
    productos.update((lista) => [...lista, nuevo]);

    this.parcialForm.reset();

    // Abrir el panel de detalle del producto recién creado
    this.router.navigateByUrl(`/parcial2/(panel:producto/${nuevo.codigo})`);

    console.log('Formulario exitoso');
  }

  protected readonly buscar = new FormControl('', { nonNullable: true });
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

    return productos().filter(producto =>
      producto.codigo.toLowerCase().includes(texto) ||
      producto.cantidad.toString().includes(texto) ||
      producto.desde.toString().includes(texto) ||
      producto.hasta.toString().includes(texto)
    );
  });

}
