import { Routes } from '@angular/router';
import { PlaceForm } from '../register-form/place-form/place-form';
import { PlaceList } from './places/place-list/place-list';
import { ReservationList } from './reservations/reservation-list/reservation-list';
import { ReservationForm } from '../register-form/reservation-form/reservation-form';
import { PanelPlace } from './panel/panel-place';

export const adminRoutes: Routes = [
    {
        path: 'places/new',
        component: PlaceForm,
        title: 'Nuevo · lugar'
    },
    {
        path: 'places',
        component: PlaceList,
        title: 'Lugares',
        children: [
            {
                path: 'place/:id',
                component: PanelPlace,
                outlet: 'panel',
                title: 'Detalle · lugar',
                data: {volver: '/places'}
            }
        ]
    },
    {path: 'reservations',component: ReservationList, title: 'Reservaciones'},
    {path: 'reservation/new',component: ReservationForm, title: 'Nueva · reservacion',
        data: {
            place: '',
            placeId: ''
        }
    }
];
