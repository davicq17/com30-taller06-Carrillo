import { Component, computed, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MULTIPLO, TOPE, productos } from '../productos';

@Component({
  imports: [RouterLink],
  selector: 'app-panel',
  styleUrl: './panel.css',
  templateUrl: './panel.html',
})
export class Panel {
  readonly codigo = input.required<string>();
  readonly volver = input<string>('/parcial2');

  readonly producto = computed(() =>
    productos().find((p) => p.codigo === this.codigo())
  );

  readonly bloque = computed(() => (this.producto()?.cantidad ?? 0) / MULTIPLO);
  readonly margen = computed(() => TOPE - (this.producto()?.cantidad ?? 0));
}
