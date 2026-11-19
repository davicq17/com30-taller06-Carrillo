import { signal } from '@angular/core';

export interface Producto {
  codigo: string;
  cantidad: number;
  desde: number;
  hasta: number;
}

/** Regla del parcial: la cantidad debe ser múltiplo de 4 y estar entre 1 y 24. */
export const MULTIPLO = 4;
export const TOPE = 24;

/** Arreglo de productos compartido entre el formulario y el panel de detalle. */
export const productos = signal<Producto[]>([
  { codigo: 'AB123', cantidad: 8, desde: 1, hasta: 5 },
  { codigo: 'CD456', cantidad: 12, desde: 2, hasta: 8 },
  { codigo: 'EF789', cantidad: 16, desde: 3, hasta: 9 },
  { codigo: 'GH321', cantidad: 4, desde: 1, hasta: 4 },
  { codigo: 'JK654', cantidad: 20, desde: 5, hasta: 12 },
  { codigo: 'LM987', cantidad: 24, desde: 4, hasta: 15 }
]);
