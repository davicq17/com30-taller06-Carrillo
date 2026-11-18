import { Routes } from '@angular/router';
import { Client } from './client/client/client';
import { PanelPlace } from './panel/panel-place';

export const clientRoutes: Routes = [
    {
        path: 'client',
        component: Client,
        title: 'cliente',
        children: [
            {
                path: 'place/:id',
                component: PanelPlace,
                outlet: 'panel',
                title: 'Detalle · lugar',
                data: {volver: '/client'}
            }
        ]
    },
    {
        path: 'my-reservations',
        loadComponent: () =>
            import('./client/client-reservations/client-reservations')
                .then(m => m.ClientReservations),
        title: 'mis-reservas'
    }
];
