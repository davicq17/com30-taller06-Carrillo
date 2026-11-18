import { Component, computed, inject, input } from '@angular/core';
import { PlaceService } from '../../../services/place.service';
import { PlaceStatus } from '../../../models/enums/place-status.enum';
import { PlaceSummary } from '../place-summary/place-summary';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-place-list',
  standalone: true,
  imports: [PlaceSummary, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './place-list.html',
  styleUrl: './place-list.css'
})
export class PlaceList {

  private readonly placeService = inject(PlaceService);

  // Con withComponentInputBinding() el query param ?estado=... llega aquí
  // (undefined cuando no está presente en la URL)
  readonly estado = input<string | undefined>('');

  readonly places = this.placeService.places;

  readonly filtroActivo = computed(() =>
    (this.estado() ?? '').trim().toUpperCase()
  );

  readonly placesFiltrados = computed(() => {
    const filtro = this.filtroActivo();
    if (!filtro) {
      return this.places();
    }
    return this.places().filter(place => place.status === filtro);
  });

  readonly totalPlaces = this.placeService.totalPlaces;

  readonly pendingPlaces = this.placeService.pendingPlaces;

  cambiarEstado(id: string, status: PlaceStatus): void {
    this.placeService.cambiarEstado(id, status);
  }

  eliminar(id: string): void {
    this.placeService.eliminar(id);
  }
}
