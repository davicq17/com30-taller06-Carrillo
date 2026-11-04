import { Routes } from '@angular/router';
import { PlaceForm } from './register-form/place-form/place-form';
import { PlaceList } from './pages/places/place-list/place-list';
import { ReservationList } from './pages/reservations/reservation-list/reservation-list';
import { ReservationForm } from './register-form/reservation-form/reservation-form';
import { Client } from './pages/client/client/client';
import { ClientReservations } from './pages/client/client-reservations/client-reservations';

export const routes: Routes = [
    {
        path: '', redirectTo: 'places', pathMatch:'full'
    },
    {
        path: 'places/new',
        component: PlaceForm
    },
    {
        path: 'places',
        component: PlaceList
    },
    {
        path: 'reservations',
        component: ReservationList
    },
    {
        path: 'reservation/new',
        component: ReservationForm
    },
    {
        path: 'client',
        component: Client
    },
    {
        path: 'my-reservations',
        component: ClientReservations
    },
    {
        path:'**', redirectTo: 'places'
    }
];
