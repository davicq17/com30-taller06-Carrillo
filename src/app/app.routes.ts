import { Routes } from '@angular/router';
import { PlaceForm } from './register-form/place-form/place-form';
import { PlaceList } from './pages/places/place-list/place-list';

export const routes: Routes = [
    {
        path: 'places/new',
        component: PlaceForm
    },
    {
        path: 'places',
        component: PlaceList
    }
];
