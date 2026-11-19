import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productos } from '../parcial-form/parcial-form';

@Component({
  imports: [CommonModule],
  selector: 'app-panel',
  styleUrl: './panel.css',
  templateUrl: './panel.html',
})
export class Panel {
  readonly id = input.required<string>();
    readonly producto = computed(() => productos.find((p) => p.id === Number(this.id())));
}
