import { Component, inject} from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { PlaceService } from '../../../services/place.service';
import { ReservationStatus } from '../../../models/enums/reservation-status.enum';
import { CommonModule } from '@angular/common';
import { PlaceStatus } from '../../../models/enums/place-status.enum';

@Component({
  imports: [CommonModule],
  standalone:true,
  selector: 'app-reservation-list',
  styleUrl: './reservation-list.css',
  templateUrl: './reservation-list.html',
})
export class ReservationList {
  private readonly reservationService = inject(ReservationService);
  private readonly placeService = inject(PlaceService);

  readonly reservations = this.reservationService.reservations;
  readonly totalReservation = this.reservationService.totalReservation;
  readonly pendingPlaces = this.reservationService.totalPending;

  cambiarEStado(placeId: string , statusP: PlaceStatus, id: string, status: ReservationStatus,): void {
    console.log("aceptar")
    this.placeService.cambiarEstado(placeId, statusP);
    this.reservationService.cambiarEstado(id, status);
  }

  

  eliminar(id: string): void {
    this.reservationService.eliminar(id);
  }
}
