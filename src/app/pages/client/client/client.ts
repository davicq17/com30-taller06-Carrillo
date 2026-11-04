import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceService } from '../../../services/place.service';
import { RouterLink } from '@angular/router';
import { ReservationForm } from '../../../register-form/reservation-form/reservation-form';

@Component({
  imports: [CommonModule, ReservationForm],
  standalone: true,
  selector: 'app-client',
  styleUrl: './client.css',
  templateUrl: './client.html',
})
export class Client {

  visible = signal(false);
  private readonly placeService = inject(PlaceService);

  readonly _places = this.placeService.places;
  placeN = signal('');
  placeId = signal('');

  

  places = computed(() => {
    return this._places().filter((i) => i.status === 'AVAILABLE');
  }
  );

  reservar(placeN: string, placeId: string): void {
    this.placeN.set(placeN);
    this.placeId.set(placeId);
    this.visible.set(true);
    console.log("visible:"+ this.visible());
  }


}
