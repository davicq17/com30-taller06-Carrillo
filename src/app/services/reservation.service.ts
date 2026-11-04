import { ReservationStatus } from './../models/enums/reservation-status.enum';
import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Reservation } from '../models/reservation.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private readonly storage = inject(StorageService);
    private readonly _reservations = signal<Reservation[]>(
        this.storage.getItem<Reservation[]>('reservations',[])
    );

    readonly reservations = this._reservations.asReadonly();

    readonly totalReservation = computed(() => this._reservations().length);

    readonly totalPending = computed (() => 
        this._reservations().filter(
            reservation => reservation.status === 'PENDING'
        ).length
    );

    reservar(reservation: Omit<Reservation, 'id' | 'status'>): void {
        const newReservation: Reservation = {
            ...reservation,
            id: crypto.randomUUID(),
            status: 'PENDING'
        };

        this._reservations.update(reservations => [
            ...reservations,
            newReservation
        ]);

        this.guardarCambios();
    }

    cambiarEstado(id: string, status: ReservationStatus):void {
        this._reservations.update(reservations =>
            reservations.map(reservation =>
                reservation.id === id
                ? {...reservation, status}
                : reservation
            )
        );

        this.guardarCambios();
    }

    eliminar(id: string): void {
        this._reservations.update(reservations =>
            reservations.filter(reservation => reservation.id !== id)
        );

        this.guardarCambios();
    }
    
    

    private guardarCambios(): void {
        this.storage.setItem('reservations',this._reservations());
    }
}
