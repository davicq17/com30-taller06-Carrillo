import { ReservationStatus } from "./enums/reservation-status.enum";

export interface Reservation {
    id: string;
    responsible: string;
    placeName: string;
    placeId: string;
    date: string;
    startTime: string;
    endTime: string;
    attendees: number;
    status: ReservationStatus;
}