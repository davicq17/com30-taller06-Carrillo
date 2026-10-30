import { Component, inject } from '@angular/core';
import { PlaceService } from '../../../services/place.service';

@Component({
  selector: 'app-place-summary',
  standalone: true,
  imports: [],
  templateUrl: './place-summary.html',
  styleUrl: './place-summary.css'
})
export class PlaceSummary {

  private readonly placeService = inject(PlaceService);

  readonly totalPlaces = this.placeService.totalPlaces;

  readonly pendingPlaces = this.placeService.pendingPlaces;
}
