import { ReservationStatus } from "./enums/reservation-status.enum";

export interface Reservation {
    id: number;
    responsible: string;
    place: number;
    date: Date;
    startTime: string;
    endTime: string;
    attendees: number;
    status: ReservationStatus;
}