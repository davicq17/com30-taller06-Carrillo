import { Routes } from '@angular/router';
import { Client } from './client/client/client';
import { ClientReservations } from './client/client-reservations/client-reservations';
import { PanelPlace } from './panel/panel-place';

export const clientRoutes: Routes = [
    {
        path: 'client',
        component: Client,
        title: 'clinte',
        children: [
            {path: 'place/:id', component: PanelPlace, outlet: 'panel'}
        ]
    },
    {path: 'my-reservations',component: ClientReservations, title: 'mis-reservas'}
];
