import { Component, inject } from '@angular/core';
import { PlaceService } from '../../../services/place.service';
import { PlaceStatus } from '../../../models/enums/place-status.enum';
import { PlaceSummary } from '../place-summary/place-summary';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-place-list',
  standalone: true,
  imports: [PlaceSummary, CommonModule, RouterLink],
  templateUrl: './place-list.html',
  styleUrl: './place-list.css'
})
export class PlaceList {

  private readonly placeService = inject(PlaceService);

  readonly places = this.placeService.places;

  readonly totalPlaces = this.placeService.totalPlaces;

  readonly pendingPlaces = this.placeService.pendingPlaces;

  cambiarEstado(id: string, status: PlaceStatus): void {
    this.placeService.cambiarEstado(id, status);
  }

  eliminar(id: string): void {
    this.placeService.eliminar(id);
  }
}
