import { Routes } from '@angular/router';
import { PlaceForm } from '../register-form/place-form/place-form';
import { PlaceList } from './places/place-list/place-list';
import { ReservationList } from './reservations/reservation-list/reservation-list';
import { ReservationForm } from '../register-form/reservation-form/reservation-form';

export const adminRoutes: Routes = [
    {path: 'places',component: PlaceList, title: 'Lugares'},
    {path: 'places/new',component: PlaceForm, title: 'Nuevo · lugar'},
    {path: 'reservations',component: ReservationList, title: 'Reservaciones'},
    {path: 'reservation/new',component: ReservationForm, title: 'Nueva · reservacion',
        data: {
            place: '',
            placeId: ''
        }
    }
];
