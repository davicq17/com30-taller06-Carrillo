import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {path: '',redirectTo: 'places',pathMatch: 'full'},
    {path: '',
        loadChildren: () => import('./pages/admin.routes').then(m => m.adminRoutes)
    },
    {path: '',
        loadChildren: () => import('./pages/client.routes').then(m => m.clientRoutes)
    },
    {path: 'parcial2',
        loadChildren: () => import('./parcial2/parcial.routes').then(m => m.parcial2Routes)
    },
    {path: 'ayuda', component: NotFound, title:'Ayuda'},
    {path: '**', component: NotFound, title: 'No encontrada'}
];
