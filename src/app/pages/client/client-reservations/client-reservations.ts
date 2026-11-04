import { Component, inject } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-client-reservations',
  styleUrl: './client-reservations.css',
  templateUrl: './client-reservations.html',
})
export class ClientReservations {
  private readonly reservationService = inject(ReservationService);

  readonly reservations = this.reservationService.reservations;
}
