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
    {path: 'ayuda', component: NotFound, title:'Ayuda'},
    {path: '**', component: NotFound, title: 'No encontrada'}
];
